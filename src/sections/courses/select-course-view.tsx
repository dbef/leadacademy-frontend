'use client';

import type { CourseDto } from 'src/types/course-type';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid2';
import { Box, Stack, Button } from '@mui/material';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

import { SelectCourseItem } from './select-course-item';

export type SelectedCourseViewProps = {
  selectedCourse: CourseDto | null;
  setSelectedCourse: (course: CourseDto) => void;
  setActiveStep: (step: number) => void;
};

export function SelectCourse({
  selectedCourse,
  setSelectedCourse,
  setActiveStep,
}: SelectedCourseViewProps) {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  const { renderLanguage } = useLanguage();

  const fetchCourses = useCallback(async () => {
    const response = await apiClient('/api/v1/courses', 'get');

    setCourses(response);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid key={course.course_id} size={{ xs: 12, sm: 6, md: 4 }}>
            <SelectCourseItem
              item={course}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setActiveStep={setActiveStep}
            />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" sx={{ p: 3, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedCourse}
          endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
          onClick={() => {
            if (!selectedCourse) {
              toast.error('Please select a course');
              return;
            }
            setActiveStep(1);
          }}
        >
          {renderLanguage('მშობლის ინფორმაცია', 'Parent Info')}
        </Button>
      </Stack>
    </Stack>
  );
}
