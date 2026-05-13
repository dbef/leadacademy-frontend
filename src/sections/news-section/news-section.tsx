import type { INews } from 'src/types/news';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Stack, Button, Typography } from '@mui/material';

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
        padding: '120px 256px 160px',
        '@media (max-width: 1400px)': {
          padding: '100px 128px 120px',
        },
        '@media (max-width: 1200px)': {
          padding: '100px 64px 120px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 24px 100px',
        },
        '@media (max-width: 760px)': {
          padding: '60px 24px 80px !important',
        },
        backgroundColor: '#FFF8E7',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#7F9A16',
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: '#7F9A16',
                fontWeight: 700,
                letterSpacing: 1.5,
                fontFeatureSettings: "'case' on",
              }}
            >
              {renderLanguage('სიახლეები', 'News')}
            </Typography>
          </Stack>
          <Typography
            variant="h2"
            sx={{
              color: '#285C45',
              fontFeatureSettings: "'case' on",
              fontSize: { xs: 28, sm: 36, md: 44 },
              lineHeight: 1.15,
            }}
          >
            {renderLanguage('საბადოს სიახლეები', 'Sabado News')}
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          sx={{
            color: '#7F9A16',
            borderColor: '#7F9A16',
            borderRadius: 999,
            px: 2.5,
            flexShrink: 0,
            '&:hover': {
              borderColor: '#6B8312',
              backgroundColor: 'rgba(127,154,22,0.06)',
            },
          }}
          endIcon={<Iconify width={16} icon="eva:arrow-ios-forward-fill" />}
          onClick={() => {
            router.push(language === Language.KA ? '/news' : '/en/news');
          }}
        >
          {renderLanguage('ყველა სიახლე', 'View all')}
        </Button>
      </Stack>
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
