import apiClient from 'src/api/apiClient';

import { SuccessPage } from 'src/sections/success/success';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const course = await apiClient('/api/v1/payment/{application_id}', 'post', {
    pathParams: {
      id,
    },
  });

  return <SuccessPage open course={course} />;
}
