import type { CardProps } from '@mui/material/Card';
import type { components } from 'interfaces/interface';
import type { CourseDto } from 'src/types/course-type';

import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Stack, Avatar, Tooltip, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Language, useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { labelClasses } from 'src/components/label';
import { Carousel, useCarousel } from 'src/components/carousel';

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

  const carousel = useCarousel({ slidesToShow: 'auto', slideSpacing: '20px', loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  const renderImage = () => (
    <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
      <Image
        alt={item.media_course_assn[0]?.media?.media_name}
        src={item.media_course_assn[0]?.media?.media_url}
        ratio="16/9"
        sx={{ borderRadius: 1.5 }}
      />
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
    <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
      <Button
        sx={{ color: '#7F9A16' }}
        fullWidth
        onClick={() => {
          router.push(
            language === Language.KA
              ? `/courses/${item.course_id}`
              : `/en/courses/${item.course_id}`
          );
        }}
      >
        {renderLanguage('ინფორმაცია', 'Information')}
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#7F9A16' }}
        onClick={() => {
          if (selectedCourse && selectedCourse.course_id === item.course_id) {
            return;
          }
          router.push(
            language === Language.KA
              ? `/courses/register/${item.course_id}`
              : `/en/courses/register/${item.course_id}`
          );
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
    </Stack>
  );

  return (
    <Card
      sx={[
        { width: 1, backgroundColor: '#FAF6FD', border: '1px solid #DDBDEA' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderImage()}
      <Stack spacing={2} sx={{ px: 2, py: 2.5 }}>
        <Tooltip title={renderLanguage(item.title_ka, item.title_en)}>
          <Typography
            variant="subtitle1"
            component="div"
            color="inherit"
            sx={{
              height: '25px',
              marginTop: '2px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              fontFeatureSettings: "'case' on",
              color: '#285C45',
            }}
          >
            {renderLanguage(item.title_ka, item.title_en)}
          </Typography>
        </Tooltip>
        <Stack
          spacing={2}
          maxWidth="100%"
          width="100%"
          direction="row"
          height="60px"
          sx={{ overflowX: 'auto' }}
        >
          <Carousel carousel={carousel}>
            {item.lecturer_course_assn.map((lecturer) => (
              <Stack key={lecturer.lecturer.id} direction="row" alignItems="center" spacing={1}>
                <Avatar src={lecturer.lecturer.picture} />
                <Typography
                  component="div"
                  sx={{
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {`${renderLanguage(
                    lecturer.lecturer.first_name_ka || '',
                    lecturer.lecturer.first_name_ka || ''
                  )} ${renderLanguage(lecturer.lecturer.last_name_ka, lecturer.lecturer.last_name_en)}`}
                </Typography>
              </Stack>
            ))}
          </Carousel>
        </Stack>
        {renderLabels()}
        {renderFooter()}
      </Stack>
    </Card>
  );
}
