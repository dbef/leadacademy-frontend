import type { FileDto } from 'src/types/file';
import type { FolderDto } from 'src/types/folder';

import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Paper,
  Dialog,
  Button,
  useTheme,
  InputBase,
  IconButton,
  Pagination,
  ListItemText,
  InputAdornment,
  inputBaseClasses,
} from '@mui/material';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import { Label } from 'src/components/label';
import { useTable } from 'src/components/table';
import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

interface FileManagerViewModalProps {
  open: boolean;
  onClose: () => void;
  selectedFiles: FileDto[];
  setSelectedFiles: (files: FileDto[]) => void;
  file_type?: string;
}

const renderIcon = () => (
  <Box sx={{ width: 36, height: 36 }}>
    <Box
      component="img"
      src={`${CONFIG.assetsDir}/assets/icons/files/ic-folder.svg`}
      sx={{ width: 1, height: 1 }}
    />
  </Box>
);

export const FileManagerViewModal = ({
  open,
  onClose,
  selectedFiles,
  file_type = 'image',
  setSelectedFiles,
}: FileManagerViewModalProps) => {
  const theme = useTheme();

  const { rowsPerPage } = useTable({ defaultRowsPerPage: 10 });

  const { renderLanguage } = useLanguage();

  const [page, setPage] = useState(1);

  const [folders, setFolders] = useState<FolderDto[]>([]);
  const [files, setFiles] = useState<FileDto[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<FolderDto | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => {
      clearTimeout(handler); // Clear the timeout if the query changes within 3 seconds
    };
  }, [query]);

  const renderText = (folder: FolderDto) => (
    <ListItemText
      primary={folder.folder_name}
      slotProps={{
        primary: { noWrap: true, sx: { typography: 'subtitle1' } },
        secondary: {
          sx: {
            mt: 0.5,
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          },
        },
      }}
    />
  );

  const handleFetchFiles = useCallback(async () => {
    const response = await apiClient('/api/v1/admin/files', 'get', {
      headers: { authorization: `Bearer ${sessionStorage.getItem(JWT_STORAGE_KEY)}` },
      queryParams: {
        direction: 'desc',
        sortBy: 'createdAt',
        page: page - 1,
        rowsPerPage,
        folder_name: selectedFolder ? selectedFolder.folder_name : '',
        searchText: debouncedQuery,
        file_type,
      },
    });

    setFiles(response.data);
    setCount(response.count);
  }, [selectedFolder, debouncedQuery, page]);

  const handleFetchFolders = useCallback(async () => {
    const response = await apiClient('/api/v1/admin/files/folders', 'get', {
      headers: { authorization: `Bearer ${sessionStorage.getItem(JWT_STORAGE_KEY)}` },
    });

    setFolders(response);
  }, []);

  useEffect(() => {
    if (open) handleFetchFiles();
  }, [open, handleFetchFiles, debouncedQuery]);

  useEffect(() => {
    if (open) handleFetchFolders();
  }, []);

  const toggleSelect = (media: FileDto) => {
    const exsists = selectedFiles.find((item) => item.media_id === media.media_id);

    if (exsists) {
      const filtered = selectedFiles.filter((item) => item.media_id !== media.media_id);
      setSelectedFiles(filtered);
    } else {
      setSelectedFiles([...selectedFiles, media]);
    }
  };

  const handleSubmit = () => {
    onClose();
  };

  console.log('Page:', page);

  return (
    <Dialog
      fullWidth
      closeAfterTransition
      maxWidth="lg"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: theme.transitions.duration.shortest, exit: 100 }}
    >
      <InputBase
        fullWidth
        placeholder={renderLanguage('ძებნა', 'Search')}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
        inputProps={{ id: 'search-input' }}
        sx={{
          p: 3,
          borderBottom: `solid 1px ${theme.vars.palette.divider}`,
          [`& .${inputBaseClasses.input}`]: { typography: 'h6' },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        {folders.map((folder) => (
          <Paper
            variant="outlined"
            onClick={() => {
              if (selectedFolder?.folder_id === folder.folder_id) {
                setSelectedFolder(null);

                return;
              }
              setSelectedFolder(folder);
            }}
            sx={{
              gap: 1,
              p: 2.5,
              display: 'flex',
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
              bgcolor: 'transparent',
              flexDirection: 'column',
              backgroundColor:
                selectedFolder && selectedFolder.folder_id === folder.folder_id ? 'gray' : 'white',
            }}
          >
            {renderIcon()}
            {renderText(folder)}
          </Paper>
        ))}
      </Box>
      <Box
        sx={{
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {files.map((item) => {
          const isSelected = selectedFiles
            .map((selectedMedia) => selectedMedia.media_id)
            .includes(item.media_id);
          return (
            <Box
              key={item.media_id}
              sx={{
                position: 'relative',
                margin: '10px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => toggleSelect(item)}
            >
              {' '}
              {item.type.includes('image') ? (
                <img
                  src={item.media_url}
                  height="200px"
                  width="200px"
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              ) : (
                <FileThumbnail file={item.type} sx={{ width: '80px', height: '80px' }} />
              )}
              {isSelected && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#4caf50',
                  }}
                >
                  <Iconify icon="eva:checkmark-circle-2-fill" width={24} />
                </IconButton>
              )}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  padding: '5px',
                  textAlign: 'center',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.media_name}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Pagination
        page={page}
        onChange={(e, value) => setPage(value)}
        count={Math.ceil(count / rowsPerPage)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          {renderLanguage('გაუქმება', 'Cancel')}
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={selectedFiles.length === 0}>
          {renderLanguage('არჩევა', 'Select')}({selectedFiles.length})
        </Button>
      </Box>
    </Dialog>
  );
};

// Let me know if you want me to tweak anything or add more features! 🚀
