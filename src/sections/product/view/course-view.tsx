'use client';

import type { components } from 'interfaces/interface';

import Container from '@mui/material/Container';

import { CourseList } from '../course-list';

// ----------------------------------------------------------------------

type Props = {
  courses: components['schemas']['CourseDto'][];
};

export function CoursesDashboardView({ courses }: Props) {
  return (
    <Container sx={{ mb: 15 }}>
      <CourseList products={courses} />
    </Container>
  );
}
