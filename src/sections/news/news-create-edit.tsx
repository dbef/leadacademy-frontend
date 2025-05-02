'use client';

import type { INews } from 'src/types/news';
import type { FileDto } from 'src/types/file';

import { z as zod } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Chip, Button, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { FileManagerViewModal } from '../file-manager/file-list-modal';

// ----------------------------------------------------------------------

export type NewNewsSchema = zod.infer<typeof CreateNewsSchema>;

export const CreateNewsSchema = zod.object({
  description_en: zod.string().min(1, { message: '' }),
  description_ka: zod.string().min(1, { message: '' }),
  title_en: zod.string().min(1, { message: '' }),
  title_ka: zod.string().min(1, { message: '' }),
  keywords_ka: zod.array(zod.string()).optional(),
  keywords_en: zod.array(zod.string()).optional(),
  short_des_en: zod.string().optional(),
  short_des_ka: zod.string().optional(),
});

type CourseProps = {
  news?: INews;
};

export function NewsCreateEditForm({ news }: CourseProps) {
  const router = useRouter();

  const keyWordsKa = ['განათლება', 'ბანაკი', 'სასწავლო კურსები'];
  const keyWordsEn = ['education', 'camp', 'courses'];

  const confirmDialog = useBoolean();

  const isDeleting = useBoolean();

  const [selectedFiles, setSelectedFiles] = useState<FileDto[]>([]);
  const [open, setOpen] = useState(false);

  const handleDeleteNews = async () => {
    try {
      isDeleting.onTrue();
      if (news) {
        await apiClient(`/api/v1/admin/news/{news_id}`, 'delete', {
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
          },
          pathParams: {
            news_id: news.news_id,
          },
        });
      }
      isDeleting.onFalse();
      router.push('/dashboard/news');
    } catch (error) {
      isDeleting.onFalse();
      toast.error('Failed to delete course! Please try again later!');
    }
  };

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    description_en: news ? news.description_en : '',
    description_ka: news ? news.description_ka : '',
    title_en: news ? news.title_en : '',
    title_ka: news ? news.title_ka : '',
    keywords_ka: news && news.keywords_ka ? news.keywords_ka?.split(',') : [],
    keywords_en: news && news.keywords_en ? news.keywords_en?.split(',') : [],
    short_des_en: news ? news.short_des_en : '',
    short_des_ka: news ? news.short_des_ka : '',
  };

  const methods = useForm<NewNewsSchema>({
    resolver: zodResolver(CreateNewsSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

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

      if (news) {
        await apiClient(`/api/v1/admin/news/{news_id}`, 'patch', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          pathParams: {
            news_id: news.news_id,
          },
          body: {
            ...data,
            news_media: selectedFiles,
            keywords_en: values.keywords_en ? values.keywords_en.join(',') : undefined,
            keywords_ka: values.keywords_ka ? values.keywords_ka.join(',') : undefined,
          },
        });

        toast.success('Update success!');
        router.push(paths.dashboard.product.root);
        return;
      }

      await apiClient('/api/v1/admin/news', 'post', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          ...data,
          keywords_en: values.keywords_en ? values.keywords_en.join(',') : undefined,
          keywords_ka: values.keywords_ka ? values.keywords_ka.join(',') : undefined,
          news_media: selectedFiles,
        },
      });

      toast.success('Create success!');
      router.push(paths.dashboard.news.root);
      return;
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  useEffect(() => {
    if (news) {
      if (news.news_media_assn) {
        const newsMedia: FileDto[] = news.news_media_assn
          .map((item) => item.media)
          .filter((media): media is FileDto => media !== undefined);

        setSelectedFiles(newsMedia);
      }
    }
  }, [news]);

  const handleRemoveImage = (image: FileDto) => {
    setSelectedFiles((prev) => prev.filter((item) => item.media_id !== image.media_id));
  };

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="title_ka"
          label={renderLanguage('სათაური ქართულად', 'name ka')}
        />
        <Field.Text
          name="title_en"
          label={renderLanguage('სათაური ინგლისურად', ' name eng')}
        />
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
      <LoadingButton onClick={onSubmit} variant="contained" size="large" loading={isSubmitting}>
        {renderLanguage('შენახვა', 'Save')}
      </LoadingButton>
      {news ? (
        <LoadingButton
          onClick={confirmDialog.onTrue}
          variant="contained"
          size="large"
          color="error"
        >
          {renderLanguage('წაშლა', 'Remove')}
        </LoadingButton>
      ) : null}
    </Box>
  );

  const renderMetaTags = () => (
    <Card>
      <CardHeader title={renderLanguage('მეტა', 'Meta')} sx={{ mb: 3 }} />

      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="keywords_ka"
          label={renderLanguage('ქივორდები ქართულად', 'keywords ka')}
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={keyWordsKa.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />
        <Field.Autocomplete
          name="keywords_en"
          label={renderLanguage('ქივორდები ინგლისურად', 'keywords en')}
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={keyWordsEn.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />
        <Field.Text
          name="short_des_ka"
          label={renderLanguage('მეტა აღწერა ქართულად', 'Meta description ka')}
          fullWidth
          multiline
          rows={3}
        />
        <Field.Text
          name="short_des_en"
          label={renderLanguage('მეტა აღწერა ინგლისურად', 'Meta description en')}
          fullWidth
          multiline
          rows={3}
        />
      </Stack>
    </Card>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderMetaTags()}
        {renderActions()}
      </Stack>
      <ConfirmDialog
        title="სიახლის წაშლა"
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        content={renderLanguage('ნამდვილად გსურთ წაშლა?', 'Are you sure you want to delete?')}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            onClick={async () => {
              await handleDeleteNews();
              confirmDialog.onFalse();
            }}
            loading={isDeleting.value}
          >
            {renderLanguage('დადასტურება', 'Approve')}
          </LoadingButton>
        }
      />
    </Form>
  );
}
