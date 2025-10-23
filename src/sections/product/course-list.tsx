import type { BoxProps } from '@mui/material/Box';
import type { components } from 'interfaces/interface';
import type { CourseDto } from 'src/types/course-type';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import apiClient from 'src/api/apiClient';

import { CustomTabs } from 'src/components/custom-tabs';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt';

import { CourseItem } from './course-card';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
};

export function CourseList({loading, sx, ...other }: Props) {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [published, setPublished] = useState('all')

  const LIMIT = 8;
  const router = useRouter();

  const handleFetchCourses = useCallback(async () => {
    try {
      setFetching(true);

      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      const response = await apiClient('/api/v1/admin/courses', 'get', {
        queryParams: {
          page,
          limit: LIMIT,
          ...(published && published !== 'all' ? { is_published: published } : {}),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data, count: total } = response || {};
      setCourses(data ?? []);
      setCount(total ?? 0);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setFetching(false);
    }
  }, [page, published]);

  useEffect(() => {
    handleFetchCourses();
  }, [page, published]);

  const renderLoading = () =>
    Array.from({ length: LIMIT }).map((_, i) => <ProductItemSkeleton key={i} />);

  const renderList = () =>
    courses.map((course) => <CourseItem key={course.course_id} item={course} />);

  const totalPages = Math.ceil(count / LIMIT);

  console.log('TOTAL PAGES', count, totalPages)

  return (
    <>
      {/* --- Tabs --- */}
      <CustomTabs
        value={published}
        onChange={(e, value) => {
          setPublished(value)
          setPage(1);
        }}
        variant="fullWidth"
        slotProps={{ tab: { px: 0 } }}
      >
        {[
          { value: 'all', label: 'All' },
          { value: 'true', label: 'Published' },
          { value: 'false', label: 'Draft' },
        ].map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </CustomTabs>

      {/* --- Course Grid --- */}
      <Box
        sx={[
          {
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {fetching || loading ? renderLoading() : renderList()}
      </Box>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(e, value) => setPage(value)}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
