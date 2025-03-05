'use client';

import type { FolderDto } from 'src/types/folder';
import type { FileDto, IFile, IFileFilters } from 'src/types/file';

import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import apiClient from 'src/api/apiClient';
import { DashboardContent } from 'src/layouts/dashboard';
import { _allFiles, FILE_TYPE_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { fileFormat } from 'src/components/file-thumbnail';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useTable, rowInPage, getComparator } from 'src/components/table';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { FileManagerFilters } from '../file-manager-filters';
import { FileManagerGridView } from '../file-manager-grid-view';
import { FileManagerFiltersResult } from '../file-manager-filters-result';
import { FileManagerNewFolderDialog } from '../file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

type FileManagerProps = {
  folder_name?: string;
};

export function FileManagerView({ folder_name }: FileManagerProps) {
  const table = useTable({ defaultRowsPerPage: 10 });

  const { rowsPerPage, page } = table;

  const dateRange = useBoolean();
  const confirmDialog = useBoolean();
  const newFilesDialog = useBoolean();

  const [displayMode, setDisplayMode] = useState('list');

  const [tableData, setTableData] = useState<IFile[]>(_allFiles);
  const [folders, setFolders] = useState<FolderDto[]>([]);
  const [files, setFiles] = useState<FileDto[]>([]);
  const [count, setCount] = useState(0);

  const handleFetchFolders = useCallback(async () => {
    const response = await apiClient('/api/v1/admin/files/folders', 'get', {
      headers: { authorization: `Bearer ${sessionStorage.getItem(JWT_STORAGE_KEY)}` },
    });

    setFolders(response);
  }, []);

  useEffect(() => {
    handleFetchFolders();
  }, []);

  const handleCreateFolder = async (folderName: string): Promise<boolean> => {
    const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
    const newFolder = await apiClient('/api/v1/admin/files/create-folder', 'post', {
      body: {
        folder_name: folderName,
      },
      headers: { authorization: `Bearer ${accessToken}` },
    });

    if (newFolder) {
      setFolders([...folders, newFolder]);
      return true;
    }

    return false;
  };

  const filters = useSetState<IFileFilters>({
    name: '',
    type: [],
    startDate: null,
    endDate: null,
  });
  const { state: currentFilters } = filters;

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
    dateError,
  });

  const handleFetchFiles = useCallback(async () => {
    const response = await apiClient('/api/v1/admin/files', 'get', {
      headers: { authorization: `Bearer ${sessionStorage.getItem(JWT_STORAGE_KEY)}` },
      queryParams: {
        direction: 'desc',
        rowsPerPage: rowsPerPage || 10,
        page,
        sortBy: 'createdAt',
        folder_name: folder_name ? folder_name : '',
        searchText: filters.state.name,
      },
    });

    setFiles(response.data);
    setCount(response.count);
  }, [page, rowsPerPage, filters.state.name, folder_name]);

  useEffect(() => {
    handleFetchFiles();
  }, [page, rowsPerPage, filters.state.name, folder_name]);

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name ||
    currentFilters.type.length > 0 ||
    (!!currentFilters.startDate && !!currentFilters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback(
    (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
      if (newView !== null) {
        setDisplayMode(newView);
      }
    },
    []
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteItems = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const renderFilters = () => (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-end', md: 'center' },
      }}
    >
      <FileManagerFilters
        filters={filters}
        dateError={dateError}
        onResetPage={table.onResetPage}
        openDateRange={dateRange.value}
        onOpenDateRange={dateRange.onTrue}
        onCloseDateRange={dateRange.onFalse}
        options={{ types: FILE_TYPE_OPTIONS }}
      />

      <ToggleButtonGroup size="small" value={displayMode} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );

  const renderResults = () => (
    <FileManagerFiltersResult
      filters={filters}
      totalResults={dataFiltered.length}
      onResetPage={table.onResetPage}
    />
  );

  const renderNewFilesDialog = () => (
    <FileManagerNewFolderDialog open={newFilesDialog.value} onClose={newFilesDialog.onFalse} />
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {table.selected.length} </strong> items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteItems();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  const renderList = () => (
    <FileManagerGridView
      table={table}
      count={count}
      folders={folders}
      dataFiltered={dataFiltered}
      onDeleteItem={handleDeleteItem}
      onOpenConfirm={confirmDialog.onTrue}
      handleCreateFolder={handleCreateFolder}
      folder_name={folder_name}
      files={files}
      setFiles={setFiles}
    />
  );

  return (
    <>
      <DashboardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">File manager {`${folder_name ? folder_name : ''}`}</Typography>
          {folder_name ? (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={newFilesDialog.onTrue}
            >
              Upload
            </Button>
          ) : null}
        </Box>

        <Stack spacing={2.5} sx={{ my: { xs: 3, md: 5 } }}>
          {renderFilters()}
          {canReset && renderResults()}
        </Stack>

        {notFound ? <EmptyContent filled sx={{ py: 10 }} /> : renderList()}
      </DashboardContent>

      {renderNewFilesDialog()}
      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  dateError: boolean;
  inputData: IFile[];
  filters: IFileFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters, dateError }: ApplyFilterProps) {
  const { name, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((file) => file.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (type.length) {
    inputData = inputData.filter((file) => type.includes(fileFormat(file.type)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((file) => fIsBetween(file.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
