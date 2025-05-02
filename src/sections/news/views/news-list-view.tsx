'use client';


import type { INews } from 'src/types/news';

import Container from '@mui/material/Container';

import { NewsList } from '../news-list';

// ----------------------------------------------------------------------

type Props = {
  news: INews[];
};

export function NewsDashboardView({ news }: Props) {
  return (
    <Container sx={{ mb: 15 }}>
      <NewsList news={news} />
    </Container>
  );
}
