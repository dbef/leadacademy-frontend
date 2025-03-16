import type { CardProps } from '@mui/material/Card';
import type { components } from 'interfaces/interface';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Stack, Tooltip, Typography } from '@mui/material';

import { Language, useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { labelClasses } from 'src/components/label';

import { renderDate } from './helpers';

type CarouselItemProps = CardProps & {
  item: components['schemas']['CourseDto'];
};

export function CourseItemMain({ item, sx, ...other }: CarouselItemProps) {
  const router = useRouter();

  const { renderLanguage, language } = useLanguage();

  const renderImage = () => (
    <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
      <Image
        alt={item.media_course_assn[0].media?.media_name}
        src={item.media_course_assn[0].media?.media_url}
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
        variant="outlined"
        color="info"
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
        size="large"
        color="success"
        onClick={() => {
          router.push(
            language === Language.KA
              ? `/courses/register/${item.course_id}`
              : `/en/courses/register/${item.course_id}`
          );
        }}
      >
        {renderLanguage('რეგისტრაცია', 'Register')}
      </Button>
    </Stack>
  );

  return (
    <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
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
            }}
          >
            {renderLanguage(item.title_ka, item.title_en)}
          </Typography>
        </Tooltip>
        <Typography
          component="div"
          sx={{
            height: '75px',
            marginTop: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {renderLanguage(item.short_des_ka || '', item.short_des_en || '')}
        </Typography>
        {renderLabels()}
        {renderFooter()}
      </Stack>
    </Card>
  );
}
