'use client';

import type { CourseDto } from 'src/types/course-type';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { CourseItemMain } from './course-item-card';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

export function CourseListMain() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<CourseDto[]>([]);

  const handleFetchCourses = useCallback(async () => {
    const courses = await apiClient('/api/v1/courses', 'get');

    setProducts(courses);
  }, []);

  useEffect(() => {
    handleFetchCourses();

    setLoading(false);
  }, []);

  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () =>
    products.map((course) => (
      <Grid size={{ xs: 12, md: 4 }} key={course.course_id}>
        <CourseItemMain key={course.course_id} item={course} />
      </Grid>
    ));

  const { renderLanguage } = useLanguage();

  return (
    <>
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
        <Typography variant="h3" sx={{ fontFeatureSettings: "'case' on", marginBottom: '50px' }}>
          {renderLanguage('პროგრამები', 'Programs')}
        </Typography>
        <Grid container spacing={3}>
          {loading ? renderLoading() : renderList()}
        </Grid>
      </Box>

      {products.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
