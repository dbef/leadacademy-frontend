'use client';

import Container from '@mui/material/Container';

import { CourseList } from '../course-list';

// ----------------------------------------------------------------------

export function CoursesDashboardView() {
  return (
    <Container sx={{ mb: 15 }}>
      <CourseList />
    </Container>
  );
}
