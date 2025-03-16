import type { CourseDto } from 'src/types/course-type';

import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid2';
import { Box, Tab, Button } from '@mui/material';

import apiClient from 'src/api/apiClient';
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
    console.log('Tabs:', tabs);
    if (tabs.length === 3) return;
    fetchCampuses();
  }, []);

  return (
    <Box
      component={m.div}
      variants={varFade('inUp', { distance: 100 })}
      sx={{
        padding: '128px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '64px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '64px 24px',
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          '@media (max-width: 550px)': {
            flexDirection: 'column',
            gap: '10px',
          },
        }}
      >
        <CustomTabs
          value={selectedTab}
          onChange={(e, value) => setSelectedTab(value)}
          sx={{ borderRadius: 1 }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={renderLanguage(tab.title_ka, tab.title_en)}
            />
          ))}
        </CustomTabs>

        <Button color="secondary" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          {renderLanguage('იხილე ყველა პროგრამა', 'View all programs')}
        </Button>
      </Box>
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
    </Box>
  );
}
