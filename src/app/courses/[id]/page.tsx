

import apiClient from 'src/api/apiClient';

import { CourseDetailsView } from 'src/sections/courses/course-details-view';

export async function generateStaticParams() {
  const courses = await apiClient('/api/v1/courses', 'get')

  return courses.map((course) => ({
    id: course.course_id,
  }));
}


export default function Page() {
  return <CourseDetailsView />;
}
