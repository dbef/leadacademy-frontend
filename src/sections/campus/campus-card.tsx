import type { CampusDto } from 'src/types/campus';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';

import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';

type CarouselItemProps = CardProps & {
  item: CampusDto;
};

export function CampusCard({ item, sx, ...other }: CarouselItemProps) {
  const { renderLanguage } = useLanguage();

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.campus_media_assn[0]?.media?.media_name}
        src={item.campus_media_assn[0]?.media?.media_url}
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
          href={`/dashboard/campus/${item?.campus_id}/edit`}
        >
          {renderLanguage(item?.campus_name_ka, item?.campus_name_en)}
        </Link>
      </Box>
    </Card>
  );
}
