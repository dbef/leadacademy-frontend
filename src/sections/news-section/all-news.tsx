'use client';

import type { INews } from 'src/types/news';

import { Box, Grid2, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { NewsCard } from './news-card';

interface AllNewsProps {
  news: INews[];
}

export function AllNews({ news }: AllNewsProps) {
  const { renderLanguage } = useLanguage();
  return (
    <Box
      sx={{
        padding: '28px 256px',
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
      <Typography variant="h4" sx={{ mb: 3, fontFeatureSettings: "'case' on" }}>
        {renderLanguage('სიახლეები', 'News')}
      </Typography>
      <Grid2 container spacing={3}>
        {news.map((newsItem) => (
          <Grid2 key={newsItem.news_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NewsCard news={newsItem} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
