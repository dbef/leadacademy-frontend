import type { INews } from 'src/types/news';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Button } from '@mui/material';

import apiClient from 'src/api/apiClient';
import { Language, useLanguage } from 'src/contexts/language-context';

import { varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel } from 'src/components/carousel';

import { NewsCard } from './news-card';

export function NewsSection() {
  const [news, setNews] = useState<INews[]>([]);
  const { renderLanguage, language } = useLanguage();

  const handleFetchNews = async () => {
    const response = await apiClient('/api/v1/news', 'get', {
      queryParams: {
        page: 0,
        rowsPerPage: 8,
        sortBy: 'created_at',
        direction: 'desc',
      },
    });

    setNews(response.data);
  };

  useEffect(() => {
    handleFetchNews();
  }, []);

  const router = useRouter();

  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
  });

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
      <Button
        endIcon={<Iconify width={16} icon="eva:arrow-ios-forward-fill" />}
        onClick={() => {
          router.push(language === Language.KA ? '/news' : '/en/news');
        }}
      >
        {renderLanguage('საბადოს სიახლეები', 'Sabado News')}
      </Button>
      <Carousel carousel={carousel} sx={{ px: 0.5 }}>
        {news.map((item) => (
          <Box
            key={item.news_id}
            sx={{ py: { xs: 8, md: 10 } }}
            component={m.div}
            variants={varFade('in')}
          >
            <NewsCard news={item} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
