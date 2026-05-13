import type { CourseDto } from 'src/types/course-type';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid2';
import { Box, Tab, Stack, Button, Typography } from '@mui/material';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { Language, useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';
import { CustomTabs } from 'src/components/custom-tabs';

import { Dates } from 'src/types/dates';

import { CourseItemMain } from '../courses/course-item-card';

type HomeProps = {
  products: CourseDto[];
};

export default function CoursesSection({ products }: HomeProps) {
  const [allCourses, setAllCourses] = useState(products);
  const [filteredCourses, setFilteredCourses] = useState(products);

  const router = useRouter();

  const { renderLanguage, language } = useLanguage();

  const [selectedTab, setSelectedTab] = useState('all');
  const [tabs, setTabs] = useState([
    {
      title_ka: 'ყველა',
      title_en: 'All',
      value: 'all',
    },
  ]);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const renderList = () =>
    filteredCourses.slice(0, 3).map((course) => (
      <Grid size={{ xs: 12, md: 4 }} key={course.course_id}>
        <CourseItemMain key={course.course_id} item={course} />
      </Grid>
    ));

  const renderMonths = () => {
    if (language === Language.KA) {
      return Object.values(Dates).map((date, _idx) => (
        <Tab key={_idx} value={_idx + 1} label={date} />
      ));
    }

    return Object.keys(Dates).map((date, _idx) => (
      <Tab sx={{ textTransform: 'capitalize' }} key={_idx} value={_idx + 1} label={date} />
    ));
  };

  useEffect(() => {
    let filtered = allCourses;

    if (selectedTab !== 'all') {
      filtered = filtered.filter((course) => course.campuse.campus_name_en === selectedTab);
    }

    if (selectedMonth !== 0) {
      filtered = filtered.filter(
        (course) => new Date(course.start_date).getMonth() + 1 === selectedMonth
      );
    }

    setFilteredCourses(filtered);
  }, [selectedTab, selectedMonth, allCourses]);

  const fetchCampuses = useCallback(async () => {
    const response = await apiClient('/api/v1/campus', 'get');

    const mappedCampuses = response.map((campus) => ({
      title_ka: campus.campus_name_ka,
      title_en: campus.campus_name_en,
      value: campus.campus_name_en,
    }));

    setTabs((prev) => [
      {
        title_ka: 'ყველა',
        title_en: 'All',
        value: 'all',
      },
      ...mappedCampuses,
    ]);
  }, []);

  useEffect(() => {
    if (tabs.length === 3) return;
    fetchCampuses();
  }, []);

  return (
    <Box
      component={m.div}
      variants={varFade('inUp', { distance: 100 })}
      sx={{
        position: 'relative',
        padding: '160px 256px',
        '@media (max-width: 1400px)': {
          padding: '120px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '120px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '100px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px !important',
        },
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: '#FAF6FD',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(127,154,22,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
        sx={{ mb: 5, position: 'relative' }}
      >
        <Stack spacing={1.5} sx={{ maxWidth: 640 }}>
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
              {renderLanguage('ჩვენი პროგრამები', 'Our Programs')}
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
            {renderLanguage(
              'აღმოაჩინე საუკეთესო გამოცდილება',
              'Discover our latest programs'
            )}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 520 }}
          >
            {renderLanguage(
              'შეუერთდით ჩვენს არაფორმალური განათლების ჰაბს და აღმოაჩინეთ ახალი შესაძლებლობები',
              'Join our informal education hub and discover new opportunities'
            )}
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
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={() => {
            router.push(language === Language.KA ? '/courses' : '/en/courses');
          }}
        >
          {renderLanguage('იხილე ყველა', 'View all')}
        </Button>
      </Stack>
      {/* <Box
        sx={{
          display: 'flex',
          gap: 3,
          '@media (max-width: 900px)': {
            flexDirection: 'column',
          },
        }}
      >
        {renderList()}
      </Box> */}
      <Grid container spacing={3}>
        {renderList()}
      </Grid>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CustomTabs
          value={selectedMonth}
          onChange={(e, value) => {
            setSelectedMonth(value);
          }}
          variant="scrollable"
          sx={{ maxWidth: '100%', borderRadius: 1 }}
        >
          {renderMonths()}
        </CustomTabs>
      </Box>

      {/* Wave divider transitioning to campuses (yellow) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          lineHeight: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 100 }}
        >
          <path
            d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 L1440,120 L0,120 Z"
            fill="#F4F9CE"
          />
        </svg>
      </Box>
    </Box>
  );
}
