import type { BoxProps } from '@mui/material/Box';
import type { components } from 'interfaces/interface';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { CustomTabs } from 'src/components/custom-tabs';

import { CourseItem } from './course-card';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  products: components['schemas']['CourseDto'][];
  isPublished?: string;
};

export function CourseList({ products, isPublished, loading, sx, ...other }: Props) {
  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () =>
    products.map((course) => <CourseItem key={course.course_id} item={course} />);

  const router = useRouter();

  return (
    <>
      <CustomTabs
        value={isPublished ? isPublished : 'all'}
        onChange={(e, value) => {
          router.push('/dashboard/product?isPublished=' + value);
          router.refresh();
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
      <Box
        sx={[
          () => ({
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
