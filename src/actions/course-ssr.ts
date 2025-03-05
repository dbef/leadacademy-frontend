import type { components } from 'interfaces/interface';

import apiClient from 'src/api/apiClient';

export async function getCourses(): Promise<components['schemas']['CourseDto'][]> {
  const res = await apiClient('/api/v1/courses', 'get');

  return res;
}

export async function getCourse(id: string): Promise<components['schemas']['CourseDto']> {
  const res = await apiClient(`/api/v1/courses/{id}`, 'get', {
    pathParams: {
      id,
    },
  });

  return res;
}
