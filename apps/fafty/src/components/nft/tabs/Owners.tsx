import { useAsync, NftOwnersResponseProps, getNftOwners } from '@fafty-frontend/shared/api';
import { useRouter } from 'next/router';

export const Owners = () => {
  const param = useRouter();
  const { slug } = param.query;

  const { data } = useAsync<NftOwnersResponseProps, string>({
    callback: () => getNftOwners(slug as string),
    withMount: true,
  });

  return (
    <div className="flex flex-col space-y-4 items-start justify-start w-full">
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
