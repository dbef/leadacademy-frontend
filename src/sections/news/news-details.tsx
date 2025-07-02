'use client';

import type { INews } from 'src/types/news';

import parser from 'html-react-parser';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { CarouselThumbsX } from '../_examples/extra/carousel-view/carousel-thumbs-x';

type NewsDetailsProps = {
  news: INews;
};

export function NewsDetailsView(props: NewsDetailsProps) {
  const { news } = props;

  const { renderLanguage } = useLanguage();

  const newsImages = news.news_media_assn.map((media) => ({
    id: media.media?.media_id || '',
    title: news.title_en || '',
    coverUrl: media.media?.media_url || '',
    description: '',
  }));

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <CarouselThumbsX data={newsImages} />
    </Box>
  );

  const renderCourseInfo = () => (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Typography variant="h3" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage(news?.title_ka || '', news?.title_en || '')}
      </Typography>
      <Typography component="div">
        {parser(renderLanguage(news.description_ka, news.description_en))}
      </Typography>
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
      {renderCourseInfo()}
    </Stack>
  );
}
