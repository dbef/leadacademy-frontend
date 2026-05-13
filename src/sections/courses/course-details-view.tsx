'use client';

import type { components } from 'interfaces/interface';

import Link from 'next/link';
import { z as zod } from 'zod';
import parser from 'html-react-parser';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import {
  Chip,
  Avatar,
  Button,
  Divider,
  Typography,
  Breadcrumbs,
} from '@mui/material';

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

  const { renderLanguage, language } = useLanguage();

  const heroImage = course.media_course_assn[0]?.media?.media_url || '';

  const isUpcoming = new Date(course.start_date) > new Date();
  const canRegister = !course.partners_only && isUpcoming;

  const renderCoursePrice = () => {
    if (course?.course_options?.length === 0) {
      return course.price.toString() || '0';
    }
    const minPrice = course?.course_options?.reduce(
      (min, curr) => (curr.option_price < min.option_price ? curr : min),
      course.course_options[0]
    );

    return renderLanguage(`${minPrice?.option_price}-დან`, `from ${minPrice?.option_price}`);
  };

  const url =
    language === Language.KA
      ? `/courses/register/${course.course_id}`
      : `/en/courses/register/${course.course_id}`;

  const renderRegistration = () => course?.registration_url || url;

  const renderLanguageChip = () => {
    if (course.language === 'geo_eng') {
      return (
        <Chip
          label={renderLanguage('ქართული / ინგლისური', 'Georgian / English')}
          icon={
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', pl: 0.5 }}>
              <FlagIcon code="GE" />
              <FlagIcon code="GB" />
            </Box>
          }
          sx={{
            backgroundColor: '#E8F5E9',
            color: '#285C45',
            fontWeight: 500,
            '& .MuiChip-icon': { ml: 0.5 },
          }}
        />
      );
    }

    return (
      <Chip
        label={
          course.language === 'ka'
            ? renderLanguage('ქართული', 'Georgian')
            : renderLanguage('ინგლისური', 'English')
        }
        icon={course.language === 'ka' ? <FlagIcon code="GE" /> : <FlagIcon code="GB" />}
        sx={{ backgroundColor: '#E8F5E9', color: '#285C45', fontWeight: 500 }}
      />
    );
  };

  const renderStatusChip = () => {
    if (!isUpcoming) {
      return (
        <Chip
          label={renderLanguage('დასრულებული', 'Completed')}
          sx={{ backgroundColor: '#EEEEEE', color: '#555', fontWeight: 600 }}
        />
      );
    }
    return (
      <Chip
        label={renderLanguage('მიმდინარე', 'Upcoming')}
        sx={{ backgroundColor: '#E8F5E9', color: '#285C45', fontWeight: 600 }}
      />
    );
  };

  // Hero section — full image visible, no overlay (images contain their own text)
  const renderHero = () => (
    <Stack spacing={3}>
      {heroImage && (
        <Box
          sx={{
            width: '100%',
            borderRadius: { xs: 0, md: 3 },
            overflow: 'hidden',
            backgroundColor: '#F0F0F0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            alt={renderLanguage(course?.title_ka || '', course?.title_en || '')}
            src={heroImage}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'fill',
              display: 'block',
            }}
          />
        </Box>
      )}

      <Stack spacing={2} sx={{ px: { xs: 3, md: 1 } }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {renderStatusChip()}
          {renderLanguageChip()}
        </Stack>
        <Typography
          variant="h2"
          sx={{
            color: '#285C45',
            fontFeatureSettings: "'case' on",
            fontSize: { xs: 26, sm: 34, md: 42 },
            lineHeight: 1.2,
          }}
        >
          {renderLanguage(course?.title_ka || '', course?.title_en || '')}
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          useFlexGap
          sx={{ color: 'text.secondary' }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="mingcute:location-fill" width={18} sx={{ color: '#E53935' }} />
            <Typography variant="body2">
              {renderLanguage(
                course?.campuse?.campus_name_ka || '',
                course?.campuse?.campus_name_en || ''
              )}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="mingcute:calendar-fill" width={18} sx={{ color: '#1976D2' }} />
            <Typography variant="body2">
              {`${renderDate(new Date(course.start_date), language)} – ${renderDate(new Date(course.end_date), language)}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );

  // Sidebar (Sticky)
  const renderSidebar = () => (
    <Card
      sx={{
        width: { xs: '100%', md: 360 },
        flexShrink: 0,
        height: 'fit-content',
        position: { md: 'sticky' },
        top: 128,
        borderRadius: 3,
        border: '1px solid #E8E0EE',
        boxShadow: '0 4px 16px rgba(40, 92, 69, 0.06)',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2.5} sx={{ p: 3 }}>
        {canRegister ? (
          <Button
            fullWidth
            size="large"
            variant="contained"
            component={RouterLink}
            href={renderRegistration()}
            target="_blank"
            endIcon={<Iconify icon="eva:arrow-forward-fill" />}
            sx={{
              backgroundColor: '#7F9A16',
              py: 1.5,
              fontSize: 16,
              '&:hover': { backgroundColor: '#6B8312' },
            }}
          >
            {renderLanguage('რეგისტრაცია', 'Register Now')}
          </Button>
        ) : (
          <Button
            fullWidth
            size="large"
            disabled
            variant="outlined"
            sx={{ py: 1.5 }}
          >
            {course.partners_only
              ? renderLanguage('რეგისტრაცია დახურულია', 'Registration closed')
              : renderLanguage('კურსი დასრულდა', 'Course ended')}
          </Button>
        )}

        <Divider />

        <Stack spacing={1.75}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="mingcute:location-fill" width={18} sx={{ color: '#E53935' }} />
            <Typography variant="body2">
              {renderLanguage(
                course?.campuse?.campus_name_ka || '',
                course?.campuse?.campus_name_en || ''
              )}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="mingcute:calendar-fill" width={18} sx={{ color: '#1976D2' }} />
            <Typography variant="body2">
              {`${renderDate(new Date(course.start_date), language)} – ${renderDate(new Date(course.end_date), language)}`}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ display: 'flex', width: 18, justifyContent: 'center' }}>
              {course.language === 'geo_eng' ? (
                <Box sx={{ display: 'flex', gap: 0.25 }}>
                  <FlagIcon code="GE" />
                </Box>
              ) : course.language === 'ka' ? (
                <FlagIcon code="GE" />
              ) : (
                <FlagIcon code="GB" />
              )}
            </Box>
            <Typography variant="body2">
              {course.language === 'geo_eng'
                ? renderLanguage('ქართული / ინგლისური', 'Georgian / English')
                : renderLanguage(
                    course.language === 'ka' ? 'ქართული' : 'ინგლისური',
                    course.language === 'ka' ? 'Georgian' : 'English'
                  )}
            </Typography>
          </Stack>

          {course.lecturer_course_assn.length > 0 && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="mingcute:user-2-fill" width={18} sx={{ color: '#7F9A16' }} />
              <Typography variant="body2">
                {course.lecturer_course_assn.length}{' '}
                {course.lecturer_course_assn.length === 1
                  ? renderLanguage('ლექტორი', 'lecturer')
                  : renderLanguage('ლექტორი', 'lecturers')}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="mingcute:wallet-fill" width={18} sx={{ color: '#7F9A16' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {renderLanguage('ღირებულება:', 'Price:')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#285C45' }}>
              ₾{renderCoursePrice()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );

  // Main content (description, lecturers, schedule)
  const renderCourseInfo = () => (
    <Stack spacing={4} sx={{ width: '100%', minWidth: 0 }}>
      {/* Description */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontFeatureSettings: "'case' on",
            color: '#285C45',
            mb: 2,
          }}
        >
          {renderLanguage('კურსის შესახებ', 'About the course')}
        </Typography>
        <Typography
          component="div"
          sx={{
            color: 'text.primary',
            lineHeight: 1.7,
            '& p': { mb: 1.5 },
          }}
        >
          {parser(renderLanguage(course.description_ka, course.description_en))}
        </Typography>
      </Box>

      {/* Lecturers */}
      {course.lecturer_course_assn.length > 0 && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFeatureSettings: "'case' on",
              color: '#285C45',
              mb: 2,
            }}
          >
            {renderLanguage('ლექტორები', 'Lecturers')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
              },
              gap: 2,
            }}
          >
            {course.lecturer_course_assn.map((lecturer) => (
              <Card
                key={lecturer.lecturer.id}
                sx={{
                  p: 2,
                  border: '1px solid #E8E0EE',
                  borderRadius: 2,
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#7F9A16',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Avatar
                  src={lecturer.lecturer.picture || ''}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="subtitle1" sx={{ fontFeatureSettings: "'case' on" }}>
                  {renderLanguage(
                    `${lecturer.lecturer.first_name_ka} ${lecturer.lecturer.last_name_ka}`,
                    `${lecturer.lecturer.first_name_en} ${lecturer.lecturer.last_name_en}`
                  )}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Schedule */}
      {course.files_course_assn.length > 0 && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFeatureSettings: "'case' on",
              color: '#285C45',
              mb: 2,
            }}
          >
            {renderLanguage('განრიგი', 'Schedule')}
          </Typography>
          <Stack spacing={1.5}>
            {course.files_course_assn
              .filter((item) => {
                if (
                  item.media?.media_name.split('_')[1] === 'Schedule.pdf' &&
                  language === Language.ENG
                ) {
                  return true;
                }
                if (
                  item.media?.media_name.split('_')[1] === 'განრიგი.pdf' &&
                  language === Language.KA
                ) {
                  return true;
                }
                return false;
              })
              .map((file) => (
                <Card
                  key={file.media_id}
                  component={Link}
                  href={file.media?.media_url || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    p: 2,
                    border: '1px solid #E8E0EE',
                    borderRadius: 2,
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#7F9A16',
                      backgroundColor: '#F5F8E8',
                    },
                  }}
                >
                  <FileThumbnail file="pdf" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontFeatureSettings: "'case' on", color: '#285C45' }}
                    >
                      {renderLanguage('განრიგი', 'Schedule')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      PDF
                    </Typography>
                  </Box>
                  <Iconify icon="eva:download-fill" width={20} sx={{ color: '#7F9A16' }} />
                </Card>
              ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        pb: { xs: 12, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 0, md: 3 },
          pt: { xs: 0, md: 3 },
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          sx={{
            px: { xs: 3, md: 1 },
            py: { xs: 2, md: 1 },
            '& a': {
              color: '#7F9A16',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Link href={language === Language.KA ? '/courses' : '/en/courses'}>
            {renderLanguage('პროგრამები', 'Programs')}
          </Link>
          <Typography
            sx={{ color: '#285C45', fontFeatureSettings: "'case' on" }}
            noWrap
            maxWidth={{ xs: 200, md: 400 }}
          >
            {renderLanguage(course?.title_ka || '', course?.title_en || '')}
          </Typography>
        </Breadcrumbs>

        {renderHero()}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            mt: { xs: 3, md: 4 },
            px: { xs: 3, md: 1 },
          }}
        >
          {renderCourseInfo()}
          {renderSidebar()}
        </Box>
      </Box>

      {/* Mobile sticky bottom register bar */}
      {canRegister && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            backgroundColor: 'white',
            borderTop: '1px solid #E8E0EE',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.06)',
            px: 2,
            py: 1.5,
            alignItems: 'center',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            href={renderRegistration()}
            target="_blank"
            endIcon={<Iconify icon="eva:arrow-forward-fill" />}
            sx={{
              backgroundColor: '#7F9A16',
              py: 1.25,
              '&:hover': { backgroundColor: '#6B8312' },
            }}
          >
            {renderLanguage('რეგისტრაცია', 'Register')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
