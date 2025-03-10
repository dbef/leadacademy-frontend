'use client';

import type { components } from 'interfaces/interface';

import { z as zod } from 'zod';
import parser from 'html-react-parser';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

import { renderDate } from './helpers';
import { CarouselThumbsY } from '../_examples/extra/carousel-view/carousel-thumbs-y';
// ----------------------------------------------------------------------

export type NewCourseSchema = zod.infer<typeof CreateCourseSchema>;

export const CreateCourseSchema = zod.object({
  course_id: zod.string().uuid(),
  parent_name: zod.string().min(1),
  parent_lastname: zod.string().min(1),
  parent_pn: zod.string().min(1),
  parent_email: zod.string().email(),
  parent_phone: zod.string().min(1),
  relation: zod.string().default('parent'),
  child_name: zod.string().min(1),
  child_lastname: zod.string().min(1),
  child_email: zod.string().email().optional().nullable(),
  child_dob: zod.string().min(1),
});

type CourseEditViewProps = {
  course: components['schemas']['CourseDto'];
};

export function CourseDetailsView(props: CourseEditViewProps) {
  const { course } = props;

  const router = useRouter();

  const { renderLanguage, language } = useLanguage();

  const renderDetails = () => (
    <Card sx={{ p: 3, borderRadius: '20px', boxShadow: 3 }}>
      <CardHeader
        title={renderLanguage(course.title_ka, course.title_en)}
        sx={{ mb: 3, textAlign: 'center', typography: 'h6' }}
      />

      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Iconify
              width="24px"
              height="24px"
              icon="mingcute:location-fill"
              sx={{ color: 'error.main' }}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              {renderLanguage(
                course?.campuse?.campus_name_ka || '',
                course?.campuse?.campus_name_en || ''
              )}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Iconify
              width="24px"
              height="24px"
              icon="eva:people-fill"
              sx={{ color: 'success.main' }}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              {renderLanguage(
                `დარჩენილია ${course.max_students - Number(course?._count?.application || 0)} ადგილი`,
                `${course.max_students - Number(course?._count?.application || 0)} Places left`
              )}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Iconify
              width="24px"
              height="24px"
              icon="mingcute:time-fill"
              sx={{ color: 'info.main' }}
            />
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              {`${renderDate(new Date(course.start_date), language)} - ${renderDate(new Date(course.end_date), language)}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
              ₾{renderLanguage(`${course.price} ლარი`, `${course.price} GEL`)}
            </Typography>
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push(`courses/register/${course.course_id}`)}
        >
          {renderLanguage('დარეგისტრირდი ახლავე', 'Register now')}
        </Button>
      </Stack>
    </Card>
  );

  const courseImages = course.media_course_assn.map((media) => ({
    id: media.media?.media_id || '',
    title: course.title_en || '',
    coverUrl: media.media?.media_url || '',
    description: '',
  }));

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <CarouselThumbsY data={courseImages} />
    </Box>
  );

  const renderPricing = () => (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography component="div">
          {parser(renderLanguage(course.description_ka, course.description_en))}
        </Typography>
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
      <Button
        fullWidth
        variant="contained"
        onClick={() => router.push(`courses/register/${course.course_id}`)}
      >
        {renderLanguage('დარეგისტრირდი ახლავე', 'Register now')}
      </Button>
    </Box>
  );

  return (
    <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
      {renderImage()}
      {renderDetails()}
      {renderPricing()}
      {renderActions()}
    </Stack>
  );
}
