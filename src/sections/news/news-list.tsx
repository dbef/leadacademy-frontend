import type { INews } from 'src/types/news';
import type { BoxProps } from '@mui/material/Box';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { NewsItem } from './news-item';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  news: INews[];
};

export function NewsList({ news, loading, sx, ...other }: Props) {
  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () => news.map((item) => <NewsItem key={item.news_id} item={item} />);

  const router = useRouter();

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

      {news.length > 8 && (
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
