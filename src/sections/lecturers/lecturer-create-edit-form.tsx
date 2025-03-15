'use client';

import type { AxiosResponse } from 'axios';
import type { LecturerDto } from 'src/types/lecturer';

import axios from 'axios';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { Avatar, Button } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export type NewCourseSchema = zod.infer<typeof CreateCourseSchema>;

export const CreateCourseSchema = zod.object({
  biography_en: zod.string().min(1, { message: '' }),
  biography_ka: zod.string().min(1, { message: '' }),
  first_name_en: zod.string().min(1, { message: '' }),
  first_name_ka: zod.string().min(1, { message: '' }),
  last_name_en: zod.string().min(1, { message: '' }),
  last_name_ka: zod.string().min(1, { message: '' }),
});

type LecturerProps = {
  id?: string;
};

export function LecturerCreateEditFrom({ id }: LecturerProps) {
  const router = useRouter();

  const [lecturer, setLecturer] = useState<LecturerDto | null>(null);
  const [lecturerImage, setLecturerImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    biography_en: '',
    biography_ka: '',
    first_name_en: '',
    first_name_ka: '',
    last_name_en: '',
    last_name_ka: '',
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
      const response = await apiClient('/api/v1/admin/lecturer/{id}', 'get', {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
        },
        pathParams: {
          id,
        },
      });
      setValue('biography_en', response.biography_en);
      setValue('biography_ka', response.biography_ka);
      setValue('last_name_en', response.last_name_en);
      setValue('last_name_ka', response.last_name_ka);
      setValue('biography_ka', response.biography_ka);
      setValue('first_name_en', response.first_name_en);
      setValue('first_name_ka', response.first_name_ka ? response.first_name_ka : '');

      setLecturer(response);
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

      let uploadedLecturerImage = lecturerImage;

      if (newImage) {
        const formData = new FormData();

        formData.append('files', newImage);

        const response: AxiosResponse<{ original_name: string }[]> = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/admin/files/upload/media`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${accessToken}`,
            },
          }
        );

        uploadedLecturerImage = response.data[0].original_name;
      }

      if (lecturer) {
        const bodyToUpload: any = {
          ...data,
        };

        if (uploadedLecturerImage) {
          bodyToUpload['picture'] = uploadedLecturerImage;
        }

        await apiClient(`/api/v1/admin/lecturer/{id}`, 'patch', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          pathParams: {
            id: lecturer.id,
          },
          body: bodyToUpload,
        });

        toast.success('Update success!');
        router.push(paths.dashboard.lecturer.root);
        return;
      }

      const bodyToUpload: any = {
        ...data,
      };

      if (uploadedLecturerImage) {
        bodyToUpload['picture'] = uploadedLecturerImage;
      }

      const newLecturer = await apiClient('/api/v1/admin/lecturer', 'post', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: bodyToUpload,
      });

      toast.success('Create success!');
      // router.push(paths.dashboard.product.root);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  useEffect(() => {
    if (lecturer) {
      if (lecturer.picture) {
        setLecturerImage(lecturer.picture);
      }
    }
  }, [lecturer]);

  const renderUrl = () => {
    if (newImage) {
      return URL.createObjectURL(newImage);
    }

    if (lecturerImage) {
      return `https://lead-for-test.s3.eu-north-1.amazonaws.com/media/${lecturerImage}`;
    }

    return '';
  };

  const handleRemoveImage = () => {
    if (newImage) {
      return setNewImage(null);
    }

    if (lecturerImage) {
      return setLecturerImage(null);
    }

    return '';
  };

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Avatar src={renderUrl()} sx={{ width: 120, height: 120, boxShadow: 3, mb: 2 }} />
        {newImage || lecturerImage ? (
          <Button
            onClick={handleRemoveImage}
            variant="outlined"
            color="error"
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Remove image
          </Button>
        ) : null}
        <Box component="label" htmlFor="upload-input" sx={{ cursor: 'pointer' }}>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) setNewImage(e.target.files[0]);
            }}
          />
          <Button
            component="span"
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Upload Image
          </Button>
        </Box>
      </Box>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="first_name_ka"
          label={renderLanguage('ლექტორის სახელი ქართულად', 'Lecturer name ka')}
        />
        <Field.Text
          name="first_name_en"
          label={renderLanguage('ლექტორის სახელი ინგლისურად', 'Lecturer name eng')}
        />
        <Field.Text
          name="last_name_ka"
          label={renderLanguage('ლექტორის გვარი ქართულად', 'Lastname name ka')}
        />
        <Field.Text
          name="last_name_en"
          label={renderLanguage('ლექტორის გვარი ინგლისურად', 'Lastname name eng')}
        />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">
            {renderLanguage('ბიოგრაფია ქართულად', 'Biography ka')}
          </Typography>
          <Field.Editor name="biography_ka" sx={{ maxHeight: 480 }} />
          <Typography variant="subtitle2">
            {renderLanguage('ბიოგრაფია ინგლისურად', 'Biography en')}
          </Typography>
          <Field.Editor name="biography_en" sx={{ maxHeight: 480 }} />
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
