import apiClient from 'src/api/apiClient';

import { RegisterOnCourseView } from 'src/sections/courses/course-register-view';

export async function generateStaticParams() {
  const courses = await apiClient('/api/v1/courses', 'get')

  return courses.map((course) => ({
    id: course.course_id,
  }));
}


export default function Page() {

  return <RegisterOnCourseView />;
}