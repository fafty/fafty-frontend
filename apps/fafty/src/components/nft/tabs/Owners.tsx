import { getNftOwners } from 'apps/fafty/src/api/callbacks/nft';
import { useAsync } from 'apps/fafty/src/api/useAsync';
import { useRouter } from 'next/router';
import { OwnersResponse } from '../../../api/callbacks/nft/types';

export const Owners = () => {
  const param = useRouter();
  const { slug } = param.query;

  const { data } = useAsync<OwnersResponse, string>({
    callback: () => getNftOwners(slug as string),
    withMount: true,
  });

  return (
    <div className="flex flex-col space-y-4 items-start justify-start w-full">
      {/*<div className="flex flex-col space-y-4 items-start justify-start w-full pb-4 border-b-2 border-gray-100 dark:border-neutral-700">*/}
      {/*  <div className="inline-flex space-x-4 items-center justify-start ">*/}
      {/*    <div className="relative" style={{ width: 48, height: 48 }}>*/}
      {/*      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">*/}
      {/*        <img*/}
      {/*          className="w-12 h-full"*/}
      {/*          src="https://via.placeholder.com/49.339351654052734x74"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="inline-flex items-center justify-center w-6 h-6 p-1.5 absolute right-0 bottom-0">*/}
      {/*        <div className="flex-1 h-full rounded-full">*/}
      {/*          <img*/}
      {/*            className="flex-1 h-full rounded-full"*/}
      {/*            src="https://via.placeholder.com/12x12"*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="inline-flex flex-col space-y-0.5 items-start justify-start">*/}
      {/*      <p className="text-sm leading-normal text-gray-500">Owner</p>*/}
      {/*      <div className="inline-flex space-x-1 items-start justify-start">*/}
      {/*        <p className="text-sm font-medium leading-normal text-gray-800">*/}
      {/*          Raquel*/}
      {/*        </p>*/}
      {/*        <p className="text-sm font-medium leading-normal text-gray-800">*/}
      {/*          Will*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {data?.record?.owners?.map((item, key) => (
        <div
          key={key}
          className="flex flex-col space-y-4 items-start justify-start w-full pb-4 border-b-2 border-gray-100 dark:border-neutral-700"
        >
          <div className="inline-flex space-x-4 items-center justify-start">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
              <img
                className="flex-1 h-full"
                src="https://via.placeholder.com/48x71.9912109375"
              />
            </div>
            <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
              <p className="text-sm leading-normal text-gray-500">Creator</p>
              <div className="inline-flex space-x-1 items-start justify-start">
                <p className="text-sm font-medium leading-normal text-gray-800">
                  Selina
                </p>
                <p className="text-sm font-medium leading-normal text-gray-800">
                  Mayert
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
