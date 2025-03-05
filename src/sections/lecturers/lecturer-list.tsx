import type { BoxProps } from '@mui/material/Box';
import type { LecturerDto } from 'src/types/lecturer';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { LecturerCard } from './lecturer-card';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  products: LecturerDto[];
};

export function LecturerList({ products, loading, sx, ...other }: Props) {
  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () =>
    products.map((lecturer) => <LecturerCard key={lecturer.id} item={lecturer} />);

  return (
    <>
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
