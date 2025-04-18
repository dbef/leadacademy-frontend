import apiClient from 'src/api/apiClient';

import { SuccessPage } from 'src/sections/success/success';

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

  return <SuccessPage course={course} />;
}
