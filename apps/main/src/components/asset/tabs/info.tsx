import { useRouter } from 'next/router'
import { useAsync, getAssetInfo } from '@fafty/shared/api'
import { AssetInfoResponseType } from '@fafty/shared/types'

export const Info = () => {
  const param = useRouter()
  const { slug } = param.query

  const { isLoading, data } = useAsync<AssetInfoResponseType, string>({
    callback: () => getAssetInfo(slug as string),
    withMount: true
  })

  if (isLoading) {
    return <span>loading...</span>
  }

  return (
    <div className="flex flex-col">
      {data &&
        Object.entries(data.record).map(([key, value]) => (
          <div className="flex w-full items-center justify-between" key={key}>
            <span className="text-gray-500">{key}</span>
            <span className="font-bold text-gray-200">{value as string}</span>
          </div>
        ))}
    </div>
  )
}
