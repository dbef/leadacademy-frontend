import type { INews } from 'src/types/news';

import React from 'react';

import { Box, Card, Typography } from '@mui/material';

import { Language, useLanguage } from 'src/contexts/language-context';


interface NewsCardProps {
  news: INews;
}

export function NewsCard({ news }: NewsCardProps) {
  const { language, renderLanguage } = useLanguage();

  return (
    <Card
      sx={{
        position: 'relative',
        height: 480,
        borderRadius: 0,
        '&:hover': {
          transform: 'scale(1.05)', // or 1.1
          zIndex: 2,
        },
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        overflow: 'hidden',
        backgroundImage: `url(${encodeURI(news.news_media_assn[0]?.media?.media_url || '')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href =
            language === Language.KA ? `/news/${news.news_id}` : `/en/news/${news.news_id}`;
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: 'white',
          px: 2,
          pb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {renderLanguage(news.title_ka, news.title_en)}
        </Typography>
      </Box>
    </Card>
  );
}
