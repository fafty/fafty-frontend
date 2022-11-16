import { useRouter } from 'next/router'
import {
  useAsync,
  getAssetInfo,
  AssetInfoResponseProps
} from '@fafty/shared/api'

export const Info = () => {
  const param = useRouter()
  const { slug } = param.query

  const { isLoading, data } = useAsync<AssetInfoResponseProps, string>({
    callback: () => getAssetInfo(slug as string),
    withMount: true
  })

  console.log('info')

  console.log(data)
  if (isLoading) {
    return <span>loading...</span>
  }

  return (
    <div className="flex flex-col">
      {data &&
        Object.entries(data.record).map(([key, value]) => (
          <div className="flex w-full items-center justify-between" key={key}>
            <span className="text-gray-500">{key}</span>
            <span className="font-bold text-gray-200">{value}</span>
          </div>
        ))}
    </div>
  )
}
