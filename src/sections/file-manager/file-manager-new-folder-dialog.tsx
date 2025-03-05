import type { AxiosResponse } from 'axios';
import type { FileDto } from 'src/types/file';
import type { DialogProps } from '@mui/material/Dialog';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  open: boolean;
  title?: string;
  folderName?: string;
  onClose: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFilesUploaded?: (files: FileDto[]) => void;
  uploadedFiles?: FileDto[];
  isFileUpload?: boolean;
};

export function FileManagerNewFolderDialog({
  open,
  onClose,
  onCreate,
  onUpdate,
  folderName,
  setFilesUploaded,
  uploadedFiles,
  isFileUpload = false,
  onChangeFolderName,
  title = 'Upload files',
  ...other
}: Props) {
  const [files, setFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleUpload = async () => {
    const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((image) => {
        formData.append('files', image);
      });
      const response: AxiosResponse<FileDto[]> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/admin/files/upload/by-folder/${folderName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Uploaded files:', response.data);

      if (!response.data) {
        return;
      }
      if (setFilesUploaded && uploadedFiles) {
        setFilesUploaded([...response.data, ...uploadedFiles]);
      }
    }
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  console.log('Files:', files);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={[(theme) => ({ p: theme.spacing(3, 3, 2, 3) })]}>{title}</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        {isFileUpload ? (
          <Upload multiple value={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
        ) : null}
      </DialogContent>

      <DialogActions>
        {isFileUpload ? (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={handleUpload}
          >
            Upload
          </Button>
        ) : null}

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
}
