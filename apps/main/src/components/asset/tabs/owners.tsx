import { useAsync, getAssetOwners } from '@fafty/shared/api'
import { useRouter } from 'next/router'
import { AssetOwnersResponseType } from '@fafty/shared/types'

export const Owners = () => {
  const param = useRouter()
  const { slug } = param.query

  const { data } = useAsync<AssetOwnersResponseType, string>({
    callback: () => getAssetOwners(slug as string),
    withMount: true
  })

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-4">
      {data?.record?.owners?.map((item, key) => (
        <div
          key={key}
          className="flex w-full flex-col items-start justify-start space-y-4 border-b-2 border-gray-100 pb-4 dark:border-neutral-700"
        >
          <div className="inline-flex items-center justify-start space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              {/* <img
                className="flex-1 h-full"
                src="https://via.placeholder.com/48x71.9912109375"
              /> */}
            </div>
            <div className="inline-flex flex-col items-start justify-start space-y-0.5">
              <p className="text-sm leading-normal text-gray-500">Creator</p>
              <div className="inline-flex items-start justify-start space-x-1">
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
  )
}
