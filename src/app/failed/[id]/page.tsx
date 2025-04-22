import apiClient from 'src/api/apiClient';

import { FailedPage } from 'src/sections/failed/failed';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const course = await apiClient('/api/v1/payment/{application_id}', 'post', {
    pathParams: {
      application_id: id,
    },
  });

  return <FailedPage course={course} id={id} />;
}
