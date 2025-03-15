import type { S3 } from 'aws-sdk';
import type { FileDto } from 'src/types/file';
import type { components } from 'interfaces/interface';
import type { DialogProps } from '@mui/material/Dialog';

import AWS from 'aws-sdk';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import apiClient from 'src/api/apiClient';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME_AWS;
const S3_ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY_AWS;
const S3_SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_AWS;
const S3_REGION = process.env.NEXT_PUBLIC_REGION_AWS;

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
  const [files, setFiles] = useState<File[]>([]);

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

  const uploadFileToS3 = (
    image: File,
    s3: S3
  ): Promise<components['schemas']['NewUploadedFiles']> =>
    new Promise((resolve, reject) => {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      const imageName = `${randomNumber}_${image.name}`.trim();

      const params = {
        Bucket: S3_BUCKET || '',
        Key: `media/${imageName}`,
        Body: image,
        ContentType: image.type,
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            name: imageName,
            type: image.type,
          });
        }
      });
    });

  const handleUpload = async () => {
    AWS.config.update({
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: S3_REGION,
    });
    const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

    const allFiles: components['schemas']['NewUploadedFiles'][] = [];

    const uploadPromises = files.map((file) => uploadFileToS3(file, s3));
    const uploadedFilesPromises: components['schemas']['NewUploadedFiles'][] =
      await Promise.all(uploadPromises);
    allFiles.push(...uploadedFilesPromises);

    if (allFiles.length > 0 && setFilesUploaded && uploadedFiles) {
      const response = await apiClient(
        '/api/v1/admin/files/upload/by-folder/{folder_name}',
        'post',
        {
          pathParams: {
            folder_name: folderName || '',
          },
          body: allFiles,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFilesUploaded([...response, ...uploadedFiles]);
      onClose();
    }
    onClose();
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

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
