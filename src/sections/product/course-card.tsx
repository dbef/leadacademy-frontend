import type { CardProps } from '@mui/material/Card';
import type { components } from 'interfaces/interface';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { fShortenNumber } from 'src/utils/format-number';

import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Label, labelClasses } from 'src/components/label';

type CarouselItemProps = CardProps & {
  item: components['schemas']['CourseDto'];
};

export function CourseItem({ item, sx, ...other }: CarouselItemProps) {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.media_course_assn[0]?.media?.media_name}
        src={item.media_course_assn[0]?.media?.media_url}
        ratio="5/4"
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
        [`& .${labelClasses.root}`]: { typography: 'caption', color: 'text.secondary' },
      }}
    >
      <Label startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}>1h 40m</Label>

      <Label startIcon={<Iconify width={12} icon="solar:users-group-rounded-bold" />}>
        {fShortenNumber(item._count?.application)}
      </Label>
      <Label startIcon={<Iconify width={12} icon="solar:users-group-rounded-bold" />}>
        {item.is_published ? '' : 'Draft'}
      </Label>
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
      <Box component="span" sx={{ typography: 'h6' }}>
        ₾{item.price}
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          router.push(`courses/register/${item.course_id}`);
        }}
      >
        {renderLanguage('რეგისტრაცია', 'Join')}
      </Button>
    </Box>
  );

  return (
    <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      {renderImage()}

      <Box sx={{ px: 2, py: 2.5 }}>
        {renderLabels()}

        <Link
          variant="subtitle2"
          color="inherit"
          underline="none"
          sx={(theme) => ({
            ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          })}
          href={`/dashboard/product/${item.course_id}/edit`}
        >
          {renderLanguage(item.title_ka, item.title_en)}
        </Link>

        {renderFooter()}
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{
            marginTop: '20px',
          }}
          onClick={() => router.push(`/dashboard/applicants/${item.course_id}`)}
        >
          {renderLanguage('აპლიკანტების ნახვა', 'View applicants')}
        </Button>
      </Box>
    </Card>
  );
}
