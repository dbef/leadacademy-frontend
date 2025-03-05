import { FileManagerView } from 'src/sections/file-manager/view';

type Props = {
  params: { folder_name: string };
};

export default async function Page({ params }: Props) {
  const { folder_name } = params;

  return <FileManagerView folder_name={folder_name} />;
}
