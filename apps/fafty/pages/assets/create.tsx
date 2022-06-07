import dynamic from 'next/dynamic';
import MainLayout from '../../layouts/main';
import {
  CSSProperties,
} from 'react';

import {
  UploaderPlaceholder,
} from '@fafty-frontend/shared/ui';
import NftForm from "../../components/forms/nft";

interface ExistingFileProps {
  id: string;
  file_id: string;
  type: string;
  storage: string;
  position: number;
  size: number;
  filename: string;
  mime_type: string;
  src: string;
}
interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  previewHeight?: number;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: string) => void;
}


const Uploader = dynamic<UploaderProps>(
  () => import('@fafty-frontend/uploader').then((mod) => mod.Uploader),
  {
    ssr: false,
    loading: () => <UploaderPlaceholder />,
  }
);
const onUploaderChange = () => {
  console.log('create page onUploaderChange');
};

export default function Create() {
  return (
    <MainLayout title={'Create Nft'} description={'Create Nft description'}>
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4">
        <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-1 ">
          <div className="rounded-lg border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow ">
            <div className="sticky top-[80px] p-3 mx-auto h-[500px]">
              <Uploader onChange={onUploaderChange} />
            </div>
          </div>
        </div>
        <div className="py-10 lg:pl-4 lg:pt-6 lg:pb-16 lg:col-start-2 lg:col-span-2 lg:border-l lg:border-gray-200 dark:lg:border-neutral-700 lg:pr-8">
          <NftForm />
        </div>
      </div>
    </MainLayout>
  );
}
