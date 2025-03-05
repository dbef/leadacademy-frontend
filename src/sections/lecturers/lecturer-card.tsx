import type { CardProps } from '@mui/material/Card';
import type { LecturerDto } from 'src/types/lecturer';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';

import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';

type CarouselItemProps = CardProps & {
  item: LecturerDto;
};

export function LecturerCard({ item, sx, ...other }: CarouselItemProps) {
  const { renderLanguage } = useLanguage();

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={`${item.first_name_en} ${item.first_name_en}`}
        src={item.picture ? `https://lead-for-test.s3.eu-north-1.amazonaws.com/media/${item.picture}` : ''}
        ratio="5/4"
        sx={{ borderRadius: 1.5 }}
      />
    </Box>
  );

  return (
    <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      {renderImage()}

      <Box sx={{ px: 2, py: 2.5 }}>
        <Link
          variant="subtitle2"
          color="inherit"
          underline="none"
          sx={(theme) => ({
            ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          })}
          href={`/dashboard/lecturer/${item.id}/edit`}
        >
          {renderLanguage(item.last_name_ka, item.first_name_en)}
        </Link>
      </Box>
    </Card>
  );
}
