import type { Metadata } from 'next';

import apiClient from 'src/api/apiClient';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'საბადო: საუკეთესო პროგრამები',
  keywords: 'საბადო, პროგრამები, სწავლა, განათლება',
  description: 'საბადო - საუკეთესო პროგრამები, რომლებიც დაგეხმარებათ თქვენი მიზნების მიღწევაში.',
};

export default async function Page() {
  const courses = await apiClient('/api/v1/courses', 'get');

  return <HomeView products={courses} />;
}
