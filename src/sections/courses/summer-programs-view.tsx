'use client';

import type { components } from 'interfaces/interface';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { CourseItemMain } from './course-item-card';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

export function SummerProgramsView() {
  const [courses, setCourses] = useState<components['schemas']['CourseDto'][]>([]);
  const [loading, setLoading] = useState(false);
  const { renderLanguage } = useLanguage();

  const handleFetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/summer`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch summer courses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchCourses();
  }, [handleFetchCourses]);

  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () =>
    courses.map((course) => (
      <Grid size={{ xs: 12, md: 4 }} key={course.course_id}>
        <CourseItemMain key={course.course_id} item={course} />
      </Grid>
    ));

  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      {/* Content */}
      <Box
        sx={{
          padding: '48px 256px',
          '@media (max-width: 1400px)': {
            padding: '64px 128px',
          },
          '@media (max-width: 1200px)': {
            padding: '48px 64px',
          },
          '@media (max-width: 1000px)': {
            padding: '48px 24px',
          },
          '@media (max-width: 760px)': {
            padding: '24px !important',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 40, md: 56 },
              lineHeight: 1,
            }}
          >
            &#9728;
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFeatureSettings: "'case' on",
              color: '#285C45',
            }}
          >
            {renderLanguage('საზაფხულო პროგრამები', 'Summer Programs')}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          sx={{
            mb: 5,
            color: '#285C45',
            maxWidth: 600,
            fontFeatureSettings: "'case' on",
          }}
        >
          {renderLanguage(
            'აღმოაჩინე საზაფხულო პროგრამები ივნისში, ივლისსა და აგვისტოში',
            'Discover our summer programs in June, July, and August'
          )}
        </Typography>

        <Grid container spacing={3}>
          {loading ? (
            renderLoading()
          ) : courses.length > 0 ? (
            renderList()
          ) : (
            <Grid
              size={{ xs: 12 }}
              sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
            >
              <Typography
                variant="h5"
                sx={{ fontFeatureSettings: "'case' on", color: '#285C45' }}
              >
                {renderLanguage(
                  'საზაფხულო პროგრამები ჯერ არ არის დამატებული',
                  'No summer programs available yet'
                )}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
