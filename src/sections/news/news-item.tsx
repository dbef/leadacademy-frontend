import type { INews } from 'src/types/news';
import type { CardProps } from '@mui/material/Card';

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
  item: INews;
};

export function NewsItem({ item, sx, ...other }: CarouselItemProps) {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.news_media_assn[0]?.media?.media_name}
        src={item.news_media_assn[0]?.media?.media_url}
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
          href={`/dashboard/news/${item.news_id}/edit`}
        >
          {renderLanguage(item.title_ka, item.title_en)}
        </Link>
      </Box>
    </Card>
  );
}
