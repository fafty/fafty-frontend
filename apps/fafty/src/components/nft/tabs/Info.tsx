import { useRouter } from 'next/router';
import { useAsync, getNftInfo, NftInfoResponseProps } from '@fafty-frontend/shared/api';

export const Info = () => {
  const param = useRouter();
  const { slug } = param.query;

  console.log('hello', slug);

  const { isLoading, data } = useAsync<NftInfoResponseProps, string>({
    callback: () => getNftInfo(slug as string),
    withMount: true,
  });

  console.log('info');

  console.log(data);
  if (isLoading) {
    return <span>loading...</span>;
  }

  return (
    <div className="flex flex-col">
      {data &&
        Object.entries(data.record).map(([key, value]) => (
          <div className="flex w-full justify-between items-center" key={key}>
            <span className="text-gray-500">{key}</span>
            <span className="text-gray-200 font-bold">{value}</span>
          </div>
        ))}
    </div>
  );
};
