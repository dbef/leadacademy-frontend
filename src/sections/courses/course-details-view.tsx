'use client';

import type { components } from 'interfaces/interface';

import Link from 'next/link';
import { z as zod } from 'zod';
import parser from 'html-react-parser';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Avatar, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Language, useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { FlagIcon } from 'src/components/flag-icon';
import { FileThumbnail } from 'src/components/file-thumbnail';

import { renderDate } from './helpers';
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

  const renderCoursePrice = () => {
    if (course?.course_options?.length === 0) {
      return course.price.toString() || '0';
    }
    const minPrice = course?.course_options?.reduce(
      (min, curr) => (curr.option_price < min.option_price ? curr : min),
      course.course_options[0]
    );

    return renderLanguage(`${minPrice?.option_price} დან`, `from ${minPrice?.option_price}`);
  };

  const renderDetails = () => (
    <Card
      sx={{
        width: '500px',
        height: 'fit-content',
        '@media (max-width: 1400px)': {
          width: '100%',
        },
        '@media (max-width: 900px)': {
          position: 'inherit',
        },
        position: 'sticky',
        top: '128px',
      }}
    >
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Iconify
            width="24px"
            height="24px"
            icon="mingcute:location-fill"
            sx={{ color: 'error.main' }}
          />
          <Typography>
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
            icon="mingcute:time-fill"
            sx={{ color: 'info.main' }}
          />
          <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
            {`${renderDate(new Date(course.start_date), language)} - ${renderDate(new Date(course.end_date), language)}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {props.course.language === 'ka' ? <FlagIcon code="GE" /> : <FlagIcon code="GB" />}
          <Typography sx={{ fontSize: '15px' }}>
            {renderLanguage(
              `${props.course.language === 'ka' ? 'ქართული' : 'ინგლისური'}`,
              `${props.course.language === 'ka' ? 'Georgian' : 'English'}`
            )}
          </Typography>
        </Box>
        {new Date(course.start_date).getMonth() !== 6 && new Date(course.start_date).getMonth() !== 7 && new Date(course.start_date) > new Date() && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#7F9A16',
            }}
            component={RouterLink}
            href={
              language === Language.KA
                ? `/courses/register/${course.course_id}`
                : `/en/courses/register/${course.course_id}`
            }
            target="_blank"
            size="large"
          >
            {renderLanguage('რეგისტრაცია', 'Register')}
          </Button>
        )}
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
      <Box
        component="img"
        alt={course.title_en}
        src={courseImages[0]?.coverUrl}
        sx={{ objectFit: 'cover', aspectRatio: { xs: '16/9', sm: '16/9' }, borderRadius: '8px' }}
      />
    </Box>
  );

  const renderCourseInfo = () => (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Typography variant="h3" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage(course?.title_ka || '', course?.title_en || '')}
      </Typography>
      <Typography component="div">
        {parser(renderLanguage(course.description_ka, course.description_en))}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage('სპიკერი', 'Speaker')}
      </Typography>
      {course.lecturer_course_assn.length > 0 ? (
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          {course.lecturer_course_assn.map((lecturer) => (
            <Stack spacing={2} direction="row" key={lecturer.lecturer.id} alignItems="center">
              <Avatar src={lecturer.lecturer.picture || ''} />
              <Typography variant="h6" sx={{ fontFeatureSettings: "'case' on" }}>
                {renderLanguage(
                  `${lecturer.lecturer.first_name_ka} ${lecturer.lecturer.last_name_ka}`,
                  `${lecturer.lecturer.first_name_en} ${lecturer.lecturer.last_name_en}`
                )}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : null}
      <Typography variant="subtitle1" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage('განრიგი', 'Schedule')}
      </Typography>
      {course.files_course_assn.length > 0 ? (
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          {course.files_course_assn
            .filter((item) => {
              if (
                item.media?.media_name.split('_')[1] === 'Schedule.pdf' &&
                language === Language.ENG
              ) {
                return item;
              }

              if (
                item.media?.media_name.split('_')[1] === 'განრიგი.pdf' &&
                language === Language.KA
              ) {
                return item;
              }

              return false;
            })
            .map((file) => (
              <Stack spacing={2} direction="row" key={file.media_id} alignItems="center">
                <FileThumbnail file="pdf" />{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={file.media?.media_url || ''}
                  style={{ fontFeatureSettings: "'case' on" }}
                >
                  {renderLanguage('განრიგი', 'Schedule')}
                </Link>
              </Stack>
            ))}
        </Stack>
      ) : null}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2">
          {renderLanguage('კურსის ღირებულება:', 'Course Price:')} ₾{renderCoursePrice()}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Stack
      spacing={{ xs: 3, md: 5 }}
      sx={{
        mx: 'auto',
        padding: '64px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '28px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '28px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      {renderImage()}
      <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'row' }}>
        {/* {renderDetails()} */}
        {renderCourseInfo()}
        {renderDetails()}
      </Stack>
    </Stack>
  );
}
