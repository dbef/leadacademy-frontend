'use client';

import type { FileDto } from 'src/types/file';
import type { CampusDto } from 'src/types/campus';
import type { LecturerDto } from 'src/types/lecturer';
import type { CourseDto } from 'src/types/course-type';
import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Chip,
  Button,
  Avatar,
  TextField,
  IconButton,
  Autocomplete,
  Select,
  MenuItem,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { FileThumbnail } from 'src/components/file-thumbnail';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { FileManagerViewModal } from '../file-manager/file-list-modal';

// ----------------------------------------------------------------------

export type NewCourseSchema = zod.infer<typeof CreateCourseSchema>;

export const CreateCourseSchema = zod.object({
  description_en: zod.string().min(1, { message: '' }),
  description_ka: zod.string().min(1, { message: '' }),
  campus_id: zod.string().min(1, { message: '' }),
  title_en: zod.string().min(1, { message: '' }),
  title_ka: zod.string().min(1, { message: '' }),
  end_date: zod.string().min(1, { message: 'End date is required!' }),
  start_date: zod.string().min(1, { message: 'Start date is required!' }),
  max_students: zod
    .number({ coerce: true })
    .min(1, { message: 'Max students must be at least 1!' }),
  price: zod.number({ coerce: true }).min(0, { message: 'Price must be at least 0!' }),
  keywords_ka: zod.array(zod.string()).optional(),
  keywords_en: zod.array(zod.string()).optional(),
  short_des_en: zod.string().optional(),
  short_des_ka: zod.string().optional(),
  is_published: zod.boolean(),
  language: zod.string(),
});

type CourseProps = {
  course?: CourseDto;
};

export function ProductNewEditForm({ course }: CourseProps) {
  const router = useRouter();

  const keyWordsKa = ['განათლება', 'ბანაკი', 'სასწავლო კურსები'];
  const keyWordsEn = ['education', 'camp', 'courses'];

  const confirmDialog = useBoolean();

  const isDeleting = useBoolean();

  const [startDate, setStartDate] = useState<IDatePickerControl>(
    dayjs(course ? new Date(course.start_date) : new Date())
  );
  const [endDate, setEndDate] = useState<IDatePickerControl>(
    dayjs(course ? new Date(course.end_date) : new Date())
  );
  const [selectedFiles, setSelectedFiles] = useState<FileDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<FileDto[]>([]);
  const [openDocs, setOpenDocs] = useState(false);
  const [campuses, setCampuses] = useState<CampusDto[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<CampusDto | null>(
    course && course.campuse ? course.campuse : null
  );
  const [lecturers, setLecturers] = useState<LecturerDto[]>([]);
  const [selectedLecturers, setSelectedLecturers] = useState<LecturerDto[]>(
    course && course.lecturer_course_assn
      ? course.lecturer_course_assn.map((item) => item.lecturer)
      : []
  );

  const handleDeleteCourse = async () => {
    try {
      isDeleting.onTrue();
      if (course) {
        await apiClient(`/api/v1/admin/courses/{id}`, 'delete', {
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
          },
          pathParams: {
            id: course.course_id,
          },
        });
      }
      isDeleting.onFalse();
      router.push('/dashboard/products');
    } catch (error) {
      isDeleting.onFalse();
      toast.error('Failed to delete course! Please try again later!');
    }
  };

  const handleFetchCampuses = useCallback(async () => {
    try {
      const [campusesRes, lecturersRes] = await Promise.all([
        apiClient('/api/v1/admin/campus', 'get', {
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
          },
        }),
        apiClient('/api/v1/admin/lecturer', 'get', {
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem(JWT_STORAGE_KEY)}`,
          },
        }),
      ]);

      if (campusesRes) {
        setCampuses(campusesRes);
      }

      if (lecturersRes) {
        setLecturers(lecturersRes);
      }
    } catch (error) {
      console.error('Failed to fetch campuses or lecturers:', error);
    }
  }, []);

  useEffect(() => {
    handleFetchCampuses();
  }, [handleFetchCampuses]);

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    description_en: course ? course.description_en : '',
    description_ka: course ? course.description_ka : '',
    title_en: course ? course.title_en : '',
    end_date: course ? course.end_date : '',
    start_date: course ? course.start_date : '',
    max_students: course ? course.max_students : 0,
    price: course ? course.price : 0,
    title_ka: course ? course.title_ka : '',
    campus_id: course && course.campuse ? course.campuse.campus_id : '',
    keywords_ka: course && course.keywords_ka ? course.keywords_ka?.split(',') : [],
    keywords_en: course && course.keywords_en ? course.keywords_en?.split(',') : [],
    short_des_en: course ? course.short_des_en : '',
    short_des_ka: course ? course.short_des_ka : '',
    is_published: course ? course.is_published : false,
    language: course ? course.language : 'ka',
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

      if (course) {
        await apiClient(`/api/v1/admin/courses/{id}`, 'patch', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          pathParams: {
            id: course.course_id,
          },
          body: {
            ...data,
            start_date: values.start_date,
            end_date: values.end_date,
            course_media: selectedFiles,
            keywords_en: values.keywords_en ? values.keywords_en.join(',') : undefined,
            keywords_ka: values.keywords_ka ? values.keywords_ka.join(',') : undefined,
            course_files: selectedDocs,
            lecturers: selectedLecturers.map((item) => item.id),
            campus_id: selectedCampus?.campus_id,
          },
        });

        toast.success('Update success!');
        router.push(paths.dashboard.product.root);
        return;
      }

      const newCourse = await apiClient('/api/v1/admin/courses', 'post', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          ...data,
          start_date: values.start_date,
          end_date: values.end_date,
          keywords_en: values.keywords_en ? values.keywords_en.join(',') : undefined,
          keywords_ka: values.keywords_ka ? values.keywords_ka.join(',') : undefined,
          course_media: selectedFiles,
          course_files: selectedDocs,
          language: 'en',
          lecturers: selectedLecturers.map((item) => item.id),
          campus_id: selectedCampus?.campus_id,
        },
      });

      toast.success('Create success!');
      router.push(paths.dashboard.product.root);
      return;
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  useEffect(() => {
    if (course) {
      if (course.media_course_assn) {
        const courseMedia: FileDto[] = course.media_course_assn
          .map((item) => item.media)
          .filter((media): media is FileDto => media !== undefined);

        setSelectedFiles(courseMedia);
      }

      if (course.files_course_assn) {
        const courseFiles: FileDto[] = course.files_course_assn
          .map((item) => item.media)
          .filter((media): media is FileDto => media !== undefined);

        setSelectedDocs(courseFiles);
      }
    }
  }, [course]);

  const handleRemoveImage = (image: FileDto) => {
    setSelectedFiles((prev) => prev.filter((item) => item.media_id !== image.media_id));
  };

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Autocomplete
          fullWidth
          limitTags={3}
          options={campuses}
          value={selectedCampus}
          onChange={(event, value, reason) => {
            if (value) {
              setValue('campus_id', value.campus_id);
              setSelectedCampus(value);
            }
          }}
          getOptionLabel={(option) => renderLanguage(option.campus_name_ka, option.campus_name_en)}
          renderInput={(params) => (
            <TextField
              error={errors.campus_id ? true : false}
              {...params}
              label={renderLanguage('კამპუსის არჩევა', 'Campus Select')}
              placeholder={renderLanguage('კამპუსის არჩევა', 'Campus Select')}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.campus_id}>
              {`${renderLanguage(option.campus_name_ka, option.campus_name_en)}`}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.campus_id}
                label={`${renderLanguage(option.campus_name_en, option.campus_name_ka)}`}
                size="small"
                variant="soft"
              />
            ))
          }
        />

        <Field.Text
          name="title_ka"
          label={renderLanguage('კურსის სახელი ქართულად', 'Course name ka')}
        />
        <Field.Text
          name="title_en"
          label={renderLanguage('კურსის სახელი ინგლისურად', 'Course name eng')}
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
          <Autocomplete
            fullWidth
            multiple
            limitTags={3}
            options={lecturers}
            value={selectedLecturers}
            defaultValue={selectedLecturers}
            onChange={(event, value) => {
              // Remove duplicates and filter out undefined values
              const uniqueLecturers = Array.from(new Set(value.map((item) => item.id)))
                .map((id) => value.find((item) => item.id === id))
                .filter(
                  (lecturer): lecturer is NonNullable<typeof lecturer> => lecturer !== undefined
                );

              setSelectedLecturers(uniqueLecturers);
            }}
            getOptionLabel={(option) => renderLanguage(option.first_name_ka, option.first_name_en)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={renderLanguage('ლექტორების არჩევა', 'Lecturers Select')}
                placeholder={renderLanguage('ლექტორების არჩევა', 'Lecturers Select')}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Avatar
                  key={option.id}
                  alt={`${option.first_name_en} ${option.first_name_en}`}
                  src={
                    option.picture
                      ? `https://lead-for-test.s3.eu-north-1.amazonaws.com/media/${option.picture}`
                      : ''
                  }
                  sx={{ marginRight: '20px' }}
                />
                {`${renderLanguage(option.first_name_ka, option.first_name_en)} ${renderLanguage(option.last_name_ka, option.last_name_en)}`}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  label={`${renderLanguage(option.first_name_ka, option.first_name_en)} ${renderLanguage(option.last_name_ka, option.last_name_en)}`}
                  size="small"
                  variant="soft"
                />
              ))
            }
          />
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

  const renderPricing = () => (
    <Card>
      <CardHeader title="Pricing" subheader="Price related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="price"
          label={renderLanguage('ფასი', 'Price')}
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ₾
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <Field.Text
          name="max_students"
          label={renderLanguage('მაქსიმალური სტუდენტები', 'Max students')}
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label={renderLanguage('დაწყების თარიღი', 'Start date')}
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            setValue('start_date', dayjs(newValue).format('YYYY-MM-DD hh:mm'));
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label={renderLanguage('დამთავრების თარიღი', 'End date')}
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            if (newValue !== null) {
              setValue('end_date', dayjs(newValue).format('YYYY-MM-DD hh:mm'));
            }
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.language}
          label="ენა"
          onChange={(e) => {
            setValue('language', e.target.value);
          }}
        >
          <MenuItem value="ka">ქართული</MenuItem>
          <MenuItem value="eng">ინგლისური</MenuItem>
        </Select>
      </Stack>
    </Card>
  );

  console.log('Values:', values.is_published, course);

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
        control={
          <Switch
            inputProps={{ id: 'publish-switch' }}
            checked={values.is_published}
            onChange={(e) => setValue('is_published', e.target.checked)}
          />
        }
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton onClick={onSubmit} variant="contained" size="large" loading={isSubmitting}>
        {renderLanguage('შენახვა', 'Save')}
      </LoadingButton>
      {course ? (
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
        {renderPricing()}
        {renderMetaTags()}
        {renderActions()}
      </Stack>
      <ConfirmDialog
        title="კურსის წაშლა"
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        content={renderLanguage('ნამდვილად გსურთ წაშლა?', 'Are you sure you want to delete?')}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            onClick={async () => {
              await handleDeleteCourse();
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
