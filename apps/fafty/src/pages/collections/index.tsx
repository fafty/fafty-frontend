import { useAsync } from '../../api/useAsync';
import { getCollections } from '../../api/callbacks/collections';
import { GetCollectionResponse } from '../../api/callbacks/collections/types';
import { Masonry } from 'masonic';
import MainLayout from '../../layouts/main';
import Link from 'next/link';

const Collections = () => {
  const { data } = useAsync<GetCollectionResponse, undefined>({
    callback: getCollections,
    withMount: true,
  });

  return (
    <MainLayout title="collections" description="collections">
      <div className="py-10">
        {!!data?.records.length && (
          <Masonry
            columnGutter={20}
            columnWidth={420}
            items={data.records}
            render={({ data }) => (
              <Link href="#">
                <div className="flex cursor-pointer flex-col h-[340px] w-full rounded overflow-hidden items-center shadow shadow-white">
                  <div
                    className="flex w-full h-3/4 bg-neutral-800"
                    style={{
                      backgroundImage: `url(${data.banner})`,
                    }}
                  />
                  <div className="pl-4 pb-4 pr-4 flex flex-grow w-full items-center">
                    <div className="relative -top-4 border-[4px] border-white rounded w-[70px] h-[70px]">
                      <div
                        className="flex w-full bg-gray-400 h-full"
                        style={{ backgroundImage: `url(${data.cover})` }}
                      />
                    </div>
                    <span className="ml-4 mb-1 text-slate-50">{data.name}</span>
                  </div>
                </div>
              </Link>
            )}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Collections;
