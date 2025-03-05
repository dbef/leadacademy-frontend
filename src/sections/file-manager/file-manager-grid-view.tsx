import type { FolderDto } from 'src/types/folder';
import type { IFile, FileDto } from 'src/types/file';
import type { UseTableReturn } from 'src/components/table';

import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import apiClient from 'src/api/apiClient';

import { Iconify } from 'src/components/iconify';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { FileManagerPanel } from './file-manager-panel';
import { FileManagerFileItem } from './file-manager-file-item';
import { FileManagerFolderItem } from './file-manager-folder-item';
import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerActionSelected } from './file-manager-action-selected';
import { FileManagerNewFolderDialog } from './file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  table: UseTableReturn;
  dataFiltered: IFile[];
  onOpenConfirm: () => void;
  onDeleteItem: (id: string) => void;
  folders: FolderDto[];
  handleCreateFolder: (folderName: string) => void;
  folder_name?: string;
  files: FileDto[];
  count: number;
  setFiles: (files: FileDto[]) => void;
};

export function FileManagerGridView({
  table,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
  folders,
  handleCreateFolder,
  folder_name,
  files,
  setFiles,
  count,
}: Props) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const shareDialog = useBoolean();
  const filesCollapse = useBoolean();
  const foldersCollapse = useBoolean();

  const newFilesDialog = useBoolean();
  const newFolderDialog = useBoolean();

  const [folderName, setFolderName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleDeleteImage = async (name: string) => {
    await apiClient('/api/v1/admin/files/{file_name}', 'delete', {
      pathParams: {
        file_name: name,
      },
      headers: { authorization: `Bearer ${sessionStorage.getItem(JWT_STORAGE_KEY)}` },
    });

    const filteredFiles = files.filter((item) => item.media_name !== name);

    setFiles(filteredFiles);
  };

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  }, []);

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail('');
      }}
    />
  );

  const renderNewFilesDialog = () => (
    <FileManagerNewFolderDialog
      open={newFilesDialog.value}
      onClose={newFilesDialog.onFalse}
      isFileUpload
      setFilesUploaded={setFiles}
      uploadedFiles={files}
      folderName={folder_name}
    />
  );

  const renderNewFolderDialog = () => (
    <FileManagerNewFolderDialog
      open={newFolderDialog.value}
      onClose={newFolderDialog.onFalse}
      title="New Folder"
      onCreate={async () => {
        newFolderDialog.onFalse();
        await handleCreateFolder(folderName);
      }}
      folderName={folderName}
      onChangeFolderName={handleChangeFolderName}
    />
  );

  const renderFolders = () => (
    <>
      {folder_name ? null : (
        <>
          <FileManagerPanel
            title="Folders"
            subtitle={`${dataFiltered.filter((item) => item.type === 'folder').length} folders`}
            onOpen={newFolderDialog.onTrue}
            collapse={foldersCollapse.value}
            onCollapse={foldersCollapse.onToggle}
          />
          <Collapse in={!foldersCollapse.value} unmountOnExit>
            <Box
              sx={{
                gap: 3,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
              }}
            >
              {folders.map((folder) => (
                <FileManagerFolderItem
                  key={folder.folder_id}
                  folder={folder}
                  selected={selected.includes(folder.folder_id)}
                  onSelect={() => onSelectItem(folder.folder_id)}
                  onDelete={() => onDeleteItem(folder.folder_id)}
                />
              ))}
            </Box>
          </Collapse>
        </>
      )}
    </>
  );

  const renderFiles = () => (
    <>
      <FileManagerPanel
        title="Files"
        subtitle={`${count} files`}
        onOpen={newFilesDialog.onTrue}
        collapse={filesCollapse.value}
        onCollapse={filesCollapse.onToggle}
        folderName={folder_name}
      />

      <Collapse in={!filesCollapse.value} unmountOnExit>
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {files.map((file) => (
            <FileManagerFileItem
              key={file.media_id}
              file={file}
              selected={selected.includes(file.media_id)}
              onSelect={() => onSelectItem(file.media_id)}
              onDelete={() => handleDeleteImage(file.media_name)}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );

  const renderSelectedActions = () =>
    !!selected?.length && (
      <FileManagerActionSelected
        numSelected={selected.length}
        rowCount={dataFiltered.length}
        selected={selected}
        onSelectAllItems={(checked) =>
          onSelectAllItems(
            checked,
            dataFiltered.map((row) => row.id)
          )
        }
        action={
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirm}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>

            <Button
              color="primary"
              size="small"
              variant="contained"
              startIcon={<Iconify icon="solar:share-bold" />}
              onClick={shareDialog.onTrue}
            >
              Share
            </Button>
          </>
        }
      />
    );

  return (
    <>
      <Box ref={containerRef}>
        {folder_name ? null : renderFolders()}
        <Divider sx={{ my: 5, borderStyle: 'dashed' }} />
        {renderFiles()}
        {renderSelectedActions()}
      </Box>

      {renderShareDialog()}
      {renderNewFilesDialog()}
      {renderNewFolderDialog()}
    </>
  );
}
