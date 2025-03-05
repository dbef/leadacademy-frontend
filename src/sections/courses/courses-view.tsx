'use client';

import type { BoxProps } from '@mui/material/Box';
import type { components } from 'interfaces/interface';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { CourseItemMain } from './course-item-card';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  products: components['schemas']['CourseDto'][];
};

export function CourseListMain({ products, loading, sx, ...other }: Props) {
  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () =>
    products.map((course) => <CourseItemMain key={course.course_id} item={course} />);

  return (
    <>
      <Box
        sx={[
          () => ({
            padding: '256px',
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {loading ? renderLoading() : renderList()}
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
