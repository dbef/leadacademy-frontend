'use client';

import type { CourseDto } from 'src/types/course-type';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

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
    <Stack
      spacing={3}
      sx={{
        padding: '28px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '28px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '28px 24px',
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="space-between">
        {courses.map((course) => (
          <Box
            key={course.course_id}
            sx={{
              flex: '1 1 calc(25% - 24px)', // 4 items per row, with gap adjustment
              '@media (max-width: 900px)': {
                flex: '1 1 calc(50% - 24px)', // 2 items per row on medium screens
              },
              '@media (max-width: 600px)': {
                flex: '1 1 calc(100% - 24px)', // 1 item per row on small screens
              },
            }}
          >
            <SelectCourseItem
              item={course}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setActiveStep={setActiveStep}
            />
          </Box>
        ))}
      </Box>
      <Stack direction="row" sx={{ p: 3, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
          onClick={() => {
            if (!selectedCourse) {
              toast.error('Please select a course');
              return;
            }
            setActiveStep(1);
          }}
        >
          {renderLanguage('მშობელი', 'Parent')}
        </Button>
      </Stack>
    </Stack>
  );
}
