'use client';

import type { FileDto } from 'src/types/file';
import type { CampusDto } from 'src/types/campus';
import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { FileThumbnail } from 'src/components/file-thumbnail';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { FileManagerViewModal } from '../file-manager/file-list-modal';

// ----------------------------------------------------------------------

export type NewCourseSchema = zod.infer<typeof CreateCourseSchema>;

export const CreateCourseSchema = zod.object({
  description_en: zod.string().min(1, { message: 'Description (EN) is required!' }),
  description_ka: zod.string().min(1, { message: 'Description (KA) is required!' }),
  campus_name_en: zod.string().min(1, { message: 'Title (EN) is required!' }),
  campus_name_ka: zod.string().min(1, { message: 'Title (KA) is required!' }),
  maps_url: zod.string().min(1, { message: 'Title (KA) is required!' }),
});

type CampusProps = {
  id?: string;
};

export function CampusNewEditForm({ id }: CampusProps) {
  const router = useRouter();

  const [startDate, setStartDate] = useState<IDatePickerControl>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<IDatePickerControl>(dayjs(new Date()));
  const [campus, setCampus] = useState<CampusDto | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<FileDto[]>([]);
  const [openDocs, setOpenDocs] = useState(false);

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    description_en: campus ? campus.description_en : '',
    description_ka: campus ? campus.description_ka : '',
    campus_name_en: campus ? campus.campus_name_en : '',
    maps_url: campus ? campus.maps_url : '',
    campus_name_ka: campus ? campus.campus_name_en : '',
  };

  const methods = useForm<NewCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleFetchCampus = useCallback(async () => {
    if (id) {
      const response = await apiClient('/api/v1/admin/campus/{campus_name}', 'get', {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
        },
        pathParams: {
          campus_name: id,
        },
      });
      setValue('description_en', response.description_en);
      setValue('description_ka', response.description_ka);
      setValue('campus_name_en', response.campus_name_en);
      setValue('maps_url', response.maps_url ? response.maps_url : '');
      setValue('campus_name_ka', response.campus_name_ka);

      setCampus(response);
    }
  }, [id]);

  useEffect(() => {
    handleFetchCampus();
  }, [id, handleFetchCampus]);

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (!accessToken) {
        toast.error('Unauthorized access!');
        return;
      }

      if (!selectedFiles) {
        toast.error('Course Media required!');
        return;
      }

      if (campus) {
        await apiClient(`/api/v1/admin/campus/{id}`, 'patch', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          pathParams: {
            id: campus.campus_id,
          },
          body: {
            ...data,
            campus_media: selectedFiles,
            campus_files: selectedDocs,
          },
        });

        toast.success('Update success!');
        router.push(paths.dashboard.product.root);
        return;
      }

      const newCampus = await apiClient('/api/v1/admin/campus', 'post', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          ...data,
          campus_media: selectedFiles,
          campus_files: selectedDocs,
        },
      });

      toast.success('Create success!');
      router.push(paths.dashboard.product.root);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  useEffect(() => {
    if (campus) {
      if (campus.campus_media_assn) {
        const campusMedia: FileDto[] = campus.campus_media_assn
          .map((item) => item.media)
          .filter((media): media is FileDto => media !== undefined);

        setSelectedFiles(campusMedia);
      }

      if (campus.campus_file_assn) {
        const courseFiles: FileDto[] = campus.campus_file_assn
          .map((item) => item.media)
          .filter((media): media is FileDto => media !== undefined);

        setSelectedDocs(courseFiles);
      }
    }
  }, [campus]);

  const handleRemoveImage = (image: FileDto) => {
    setSelectedFiles((prev) => prev.filter((item) => item.media_id !== image.media_id));
  };

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="campus_name_ka"
          label={renderLanguage('კამპუსის სახელი ქართულად', 'Campus name ka')}
        />
        <Field.Text
          name="campus_name_en"
          label={renderLanguage('კამპუსის სახელი ინგლისურად', 'Campus name eng')}
        />
        <Field.Text name="maps_url" label={renderLanguage('მაპსის URL', 'Maps URL')} />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">
            {renderLanguage('აღწერა ქართულად', 'Description ka')}
          </Typography>
          <Field.Editor name="description_ka" sx={{ maxHeight: 480 }} />
          <Typography variant="subtitle2">
            {renderLanguage('აღწერა ინგლისურად', 'Description en')}
          </Typography>
          <Field.Editor name="description_en" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">{renderLanguage('მედია', 'Media')}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            {renderLanguage('მედიის არჩევა', 'Select media')}
          </Button>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {selectedFiles.map((image) => (
              <Box sx={{ position: 'relative' }} key={image.media_id}>
                <Image
                  src={image.media_url}
                  alt="Sabado"
                  height={100}
                  width={120}
                  style={{ objectFit: 'cover', borderRadius: 2 }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                  }}
                  onClick={() => handleRemoveImage(image)} // Implement handleRemove to remove image
                >
                  <Iconify width={16} icon="eva:close-fill" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <FileManagerViewModal
            open={open}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            onClose={() => {
              setOpen(false);
            }}
          />
          <Typography variant="subtitle2">{renderLanguage('ფაილები', 'Files')}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setOpenDocs(true);
            }}
          >
            {renderLanguage('ფაილის არჩევა', 'Select File')}
          </Button>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {selectedDocs.map((image) => (
              <Box sx={{ position: 'relative' }} key={image.media_id}>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <FileThumbnail file={image.type} sx={{ width: '80px', height: '80px' }} />
                  <a
                    href={image.media_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {image.media_name}
                  </a>
                </Box>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                  }}
                  onClick={() => handleRemoveImage(image)} // Implement handleRemove to remove image
                >
                  <Iconify width={16} icon="eva:close-fill" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <FileManagerViewModal
            open={openDocs}
            setSelectedFiles={setSelectedDocs}
            selectedFiles={selectedDocs}
            onClose={() => {
              setOpenDocs(false);
            }}
            file_type="file"
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <FormControlLabel
        label="Publish"
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton onClick={onSubmit} variant="contained" size="large" loading={isSubmitting}>
        {renderLanguage('შენახვა', 'Save')}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
