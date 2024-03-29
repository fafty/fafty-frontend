import { Modal } from '@fafty/shared/modals'
import FormCollection from '../../forms/collection/main'
import FormCollectionContextProvider from '../../forms/collection/provider'
import { useEffect, useState } from 'react'
import { api, useAsync, putCollection, getCollection } from '@fafty/shared/api'
import {
  GetCollectionResponseType,
  PutCollectionResponseType,
  PutCollectionParamsType,
  GetCollectionParamsType
} from '@fafty/shared/types'
import { useNotifications } from '@fafty/notifications'
import { CollectionFormDataType } from '@fafty/shared/types'

type Props = {
  title: string
  slug?: string
  onClose: () => void
  isOpened: boolean
}

/**
 * @name FormCollectionModal
 * @description Modal for creating and editing collections.
 * @param {Props} props
 * @param {string} props.title
 * @param {string} props.slug
 * @param {() => void} props.onClose
 * @param {boolean} props.isOpened
 * @returns {JSX.Element}
 * @category Components / Modals
 * @example
 * <FormCollectionModal title="Create collection" onClose={onClose} isOpened={isOpened} />
 */
const FormCollectionModal = ({
  title,
  isOpened,
  onClose,
  slug
}: Props): JSX.Element => {
  const {
    data: preloadedCollection,
    call: callPreloadCollection,
    isSuccess
  } = useAsync<GetCollectionResponseType, GetCollectionParamsType>({
    callback: getCollection
  })

  const { call: putCollectionData } = useAsync<
    PutCollectionResponseType,
    PutCollectionParamsType
  >({
    callback: (params?: PutCollectionParamsType) => putCollection(params)
  })

  const [submitting, setSubmitting] = useState(false)
  const [dismissibleData, setDismissibleData] = useState({
    title: 'Close',
    disabled: false
  })
  const [finished, setFinished] = useState(false)
  const [drafted, setDrafted] = useState(false)
  const { enqueueNotification } = useNotifications()

  const onSubmit = async (data: CollectionFormDataType) => {
    if (submitting) {
      return
    }

    if (drafted && !data.cover?.id) {
      setDrafted(false)
      onClose()
      return
    }

    setSubmitting(true)

    try {
      if (slug) {
        await putCollectionData({ slug: slug, collection: data })
      } else {
        await api.post('/collection', { collection: data })
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
          title: `Collection "${data.name}" saved as draft.`,
          position: 'bottom-center',
          message: 'You can continue to edit it at any time.',
          options: { dismissible: true }
        })
      }
    }
  }

  const onChangeDismiss = (data: {
    title: string
    disabled: boolean
  }): void => {
    setDismissibleData(data)
  }

  const dismiss = (): void => {
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
      callPreloadCollection({ slug })
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
          <FormCollectionContextProvider
            defaultData={preloadedCollection?.record}
            onChangeDismiss={onChangeDismiss}
            rawDataCallback={drafted}
            onRawDataCallback={(data) => onSubmit(data)}
            onFinished={() => setFinished(true)}
          >
            <FormCollection
              defaultCover={preloadedCollection?.record?.cover}
              onSubmit={onSubmit}
              submitting={submitting}
            />
          </FormCollectionContextProvider>
        )}
      </div>
    </Modal>
  )
}

export default FormCollectionModal
