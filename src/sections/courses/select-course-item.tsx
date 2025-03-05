import type { CardProps } from '@mui/material/Card';
import type { components } from 'interfaces/interface';
import type { CourseDto } from 'src/types/course-type';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { labelClasses } from 'src/components/label';

import { renderDate } from './helpers';

type CarouselItemProps = CardProps & {
  item: components['schemas']['CourseDto'];
  setSelectedCourse: (course: CourseDto) => void;
  selectedCourse: CourseDto | null;
  setActiveStep: (step: number) => void;
};

export function SelectCourseItem({
  item,
  selectedCourse,
  setSelectedCourse,
  setActiveStep,
  sx,
  ...other
}: CarouselItemProps) {
  const router = useRouter();

  const { renderLanguage, language } = useLanguage();

  const renderImage = () => (
    <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
      <Image
        alt={item.media_course_assn[0].media?.media_name}
        src={item.media_course_assn[0].media?.media_url}
        ratio="5/4"
        sx={{ borderRadius: 1.5 }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontWeight: 'bold',
        }}
      >
        ₾{item.price}
      </Box>
    </Box>
  );

  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        mb: 1.5,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        [`& .${labelClasses.root}`]: { typography: 'caption', color: 'text.secondary' },
        marginTop: '20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Iconify
          width="20px"
          height="25px"
          icon="mingcute:location-fill"
          sx={{ ml: 0.25, flexShrink: 0, color: 'error.main' }}
        />
        <Typography sx={{ fontSize: '15px' }}>
          {renderLanguage(item?.campuse?.campus_name_ka || '', item?.campuse?.campus_name_en || '')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Iconify
          width="20px"
          height="25px"
          icon="eva:people-fill"
          sx={{ ml: 0.25, flexShrink: 0, color: 'success.main' }}
        />
        <Typography sx={{ fontSize: '15px' }}>
          {renderLanguage(
            `დარჩენილია ${item.max_students - Number(item?._count?.application || 0)} ადგილი`,
            `${item.max_students - Number(item?._count?.application || 0)} Places left`
          )}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Iconify
          width="20px"
          height="25px"
          icon="mingcute:time-fill"
          sx={{ ml: 0.25, flexShrink: 0, color: 'info.main' }}
        />
        <Typography sx={{ fontSize: '15px' }}>
          {`${renderDate(new Date(item.start_date), language)} - ${renderDate(new Date(item.end_date), language)}`}
        </Typography>
      </Box>
    </Box>
  );

  const renderFooter = () => (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        size="small"
        fullWidth
        color={
          selectedCourse && selectedCourse.course_id === item.course_id ? 'warning' : 'primary'
        }
        onClick={() => {
          if (selectedCourse && selectedCourse.course_id === item.course_id) {
            return;
          }
          router.push(`/courses/register/${item.course_id}`);
        }}
      >
        {renderLanguage(
          selectedCourse && selectedCourse.course_id === item.course_id
            ? 'კურსი არჩეულია'
            : 'კურსის არჩევა',
          selectedCourse && selectedCourse.course_id === item.course_id
            ? 'Course already selected'
            : 'Select Course'
        )}
      </Button>
    </Box>
  );

  return (
    <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      {renderImage()}

      <Box sx={{ px: 2, py: 2.5 }}>
        <Link
          variant="subtitle1"
          color="inherit"
          underline="none"
          sx={(theme) => ({
            ...theme.mixins.maxLine({ line: 2.2, persistent: theme.typography.subtitle2 }),
          })}
          href={`courses/${item.course_id}`}
        >
          {renderLanguage(item.title_ka, item.title_en)}
        </Link>
        {renderLabels()}
        {renderFooter()}
      </Box>
    </Card>
  );
}
