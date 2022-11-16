import { Modal } from '@fafty/shared/modals'
import FormAsset from '../../forms/asset/main'
import FormAssetContextProvider from '../../forms/asset/provider'
import { useEffect, useState } from 'react'
import {
  api,
  useAsync,
  putAsset,
  getAsset,
  AssetResponseProps,
  AssetPutParamsProps
} from '@fafty/shared/api'
import { useNotifications } from '@fafty/notifications'

import { FormProps } from '../../forms/asset/types'

type Props = {
  title: string
  slug?: string
  onClose: () => void
  isOpened: boolean
  onPutSuccess?: (record: AssetResponseProps) => void
}

/**
 * @name FormAssetModal
 * @description Modal for creating and editing assets.
 * @param {Props} props
 * @param {string} props.title
 * @param {string} props.slug
 * @param {() => void} props.onClose
 * @param {boolean} props.isOpened
 * @returns {JSX.Element}
 * @category Components / Modals
 * @example
 * <FormAssetModal title="Create asset" onClose={onClose} isOpened={isOpened} />
 */
const FormAssetModal = ({
  title,
  slug,
  onClose,
  isOpened,
  onPutSuccess
}: Props): JSX.Element => {
  const {
    data: preloadedAsset,
    call: callPreloadAsset,
    isSuccess
  } = useAsync<AssetResponseProps, string>({
    callback: getAsset
  })

  const { call: putAssetData } = useAsync<
    AssetResponseProps,
    AssetPutParamsProps
  >({
    callback: (params?: AssetPutParamsProps) => putAsset(params)
  })

  const [submitting, setSubmitting] = useState(false)
  const [dismissibleData, setDismissibleData] = useState({
    title: 'Close',
    disabled: false
  })
  const [finished, setFinished] = useState(false)
  const [drafted, setDrafted] = useState(false)
  const { enqueueNotification } = useNotifications()

  const onSubmit = async (data: FormProps) => {
    if (submitting) {
      return
    }

    if (drafted && !data.media?.id) {
      setDrafted(false)
      onClose()
      return
    }

    setSubmitting(true)

    try {
      if (slug) {
        const putResult: AssetResponseProps | void = await putAssetData({
          slug: slug,
          asset: data
        })

        if (putResult) {
          onPutSuccess(putResult)
        }
      } else {
        await api.post('/asset', { asset: data })
      }
      // eslint-disable-next-line no-useless-catch
    } catch (err) {
      throw err
    } finally {
      setSubmitting(false)
      if (drafted && !slug) {
        onClose()
        setDrafted(false)
        enqueueNotification({
          title: `Asset "${data.name}" saved as draft.`,
          position: 'bottom-center',
          message: 'You can continue to edit it at any time.',
          options: { dismissible: true }
        })
      }
    }
  }

  const onChangeDismiss = (data: { title: string; disabled: boolean }) => {
    setDismissibleData(data)
  }

  const dismiss = () => {
    if (isOpened && !finished) {
      setDrafted(true)
    } else {
      onClose()
    }

    if (!finished && slug) {
      onClose()
    }
  }

  useEffect(() => {
    if (slug) {
      callPreloadAsset(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <Modal
      title={title}
      open={isOpened}
      onDismiss={dismiss}
      options={{
        dismissible: {
          active: true,
          title: dismissibleData.title,
          disabled: dismissibleData.disabled
        }
      }}
      className="w-[calc(95vw_-_5px)]"
    >
      <div className="flex h-full w-full flex-row p-2">
        {((isSuccess && !!slug) || !slug) && (
          <FormAssetContextProvider
            defaultData={preloadedAsset?.record}
            onChangeDismiss={onChangeDismiss}
            rawDataCallback={drafted}
            onRawDataCallback={(data) => onSubmit(data)}
            onFinished={() => setFinished(true)}
          >
            <FormAsset
              defaultAsset={preloadedAsset?.record?.media}
              onSubmit={onSubmit}
              submitting={submitting}
            />
          </FormAssetContextProvider>
        )}
      </div>
    </Modal>
  )
}

export default FormAssetModal
