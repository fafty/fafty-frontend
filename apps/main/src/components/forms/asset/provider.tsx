import { useState, ReactNode, useCallback, useEffect } from 'react'
import {
  AssetType,
  CommentsOrderType,
  AssetFormDataType,
  AssetFormStepDataType,
  CommentsModerationType,
  AssetFormSetStepDataType
} from '@fafty/shared/types'
import Context from './context'

const defaultStepsData: AssetFormStepDataType = {
  media: {
    id: '',
    storage: '',
    src: undefined,
    metadata: {
      size: 0,
      filename: '',
      mime_type: ''
    }
  },
  step1: {
    state: {
      name: '',
      description: null,
      unlockable_content: null,
      sensitive_content: false
    },
    solved: false,
    error: false
  },
  step2: {
    state: {
      blockchain: 'dfinity',
      supply_units: 1,
      collection_token: ''
    },
    solved: false,
    error: false
  },
  step3: {
    state: {
      allow_ratings: true,
      comments_moderation: '' as CommentsModerationType,
      comments_order: 'newest' as CommentsOrderType,
      tags: []
    },
    solved: false,
    error: false
  },
  step4: {
    state: {
      is_checked: false
    },
    solved: false,
    error: false
  }
}

interface Props {
  children: ReactNode
  onChangeDismiss: (data: { title: string; disabled: boolean }) => void
  rawDataCallback: boolean
  defaultData?: AssetType
  onRawDataCallback: (data: AssetFormDataType) => void
  onFinished: () => void
}

/**
 * @name FormAssetContextProvider
 * @description Context provider for the asset form.
 * @param {Props} props
 * @param {ReactNode} props.children
 * @param {boolean} props.rawDataCallback
 * @param {AssetProps} props.defaultData
 * @param {Function} props.onRawDataCallback
 * @param {Function} props.onFinished
 * @returns {JSX.Element}
 * @example
 * <FormAssetContextProvider
 *  onChangeDismiss={onChangeDismiss}
 *  rawDataCallback={rawDataCallback}
 *  onRawDataCallback={onRawDataCallback}
 *  onFinished={onFinished}
 *  defaultData={defaultData}
 * />
 *
 */
const FormAssetContextProvider = ({
  onChangeDismiss,
  rawDataCallback,
  onRawDataCallback,
  onFinished,
  defaultData,
  children
}: Props): JSX.Element => {
  const [step1Answered, setStep1Answered] = useState(false)
  const [step2Answered, setStep2Answered] = useState(false)
  const [step3Answered, setStep3Answered] = useState(false)
  const [step4Answered, setStep4Answered] = useState(false)
  const [finished, setFinished] = useState<boolean>(false)

  const [stepData, setStepData] = useState<AssetFormStepDataType>({
    media: {
      id: defaultData?.media?.file_id || '',
      storage: defaultData?.media?.storage || '',
      src: defaultData?.media?.src || '',
      metadata: {
        size: defaultData?.media?.size || 0,
        filename: defaultData?.media?.filename || '',
        mime_type: defaultData?.media?.mime_type || ''
      }
    },
    step1: {
      state: {
        name: defaultData?.name || '',
        description:
          defaultData?.description &&
          Object.keys(defaultData?.description).length
            ? defaultData?.description
            : '',
        unlockable_content: null,
        sensitive_content: !!defaultData?.sensitive_content
      },
      solved: !!defaultData?.description,
      error: false
    },
    step2: {
      state: {
        blockchain: defaultData?.blockchain || 'dfinity',
        supply_units: defaultData?.available_supply_units || 1,
        collection_token: defaultData?.collection_token || ''
      },
      solved:
        !!defaultData?.available_supply_units &&
        !!defaultData?.collection_token &&
        !!defaultData?.blockchain,
      error: false
    },
    step3: {
      state: {
        allow_ratings: !!defaultData?.allow_ratings,
        comments_moderation:
          defaultData?.comments_moderation || ('' as CommentsModerationType),
        comments_order:
          defaultData?.comments_order || ('newest' as CommentsOrderType),
        tags: defaultData?.tags || []
      },
      solved:
        !!defaultData?.tags?.length &&
        !!defaultData?.comments_moderation &&
        !!defaultData?.comments_order,
      error: false
    },
    step4: {
      state: {
        is_checked: !!defaultData
      },
      solved: !!defaultData,
      error: false
    }
  })

  useEffect(() => {
    if (rawDataCallback) {
      onRawDataCallback({
        media: stepData.media,
        ...stepData.step1.state,
        ...stepData.step2.state,
        ...stepData.step3.state
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawDataCallback])

  useEffect(() => {
    finished && onFinished()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => {
    if (step1Answered && stepData.media.id) {
      onChangeDismiss({
        title: 'Close and save as draft',
        disabled: false
      })
    }

    if (!step1Answered && stepData.media.id) {
      onChangeDismiss({
        title:
          'The button is not active because there are errors in some fields',
        disabled: true
      })
    }

    if ((!step1Answered && !stepData.media.id) || finished) {
      onChangeDismiss({
        title: 'Close',
        disabled: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, step1Answered, stepData.media])

  const onSetStepData = useCallback(
    (data: AssetFormSetStepDataType) => {
      setStepData((prev) => ({ ...prev, ...data }))
    },
    [setStepData]
  )

  const clearState = () => {
    setStepData(defaultStepsData)
    setStep1Answered(false)
    setStep2Answered(false)
    setStep3Answered(false)
    setStep4Answered(false)
  }

  const contextValues = {
    step1Answered,
    setStep1Answered,
    step2Answered,
    setStep2Answered,
    step3Answered,
    setStep3Answered,
    step4Answered,
    setStep4Answered,
    finished,
    setFinished,
    stepData,
    setStepData: onSetStepData,
    clearState
  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}

export default FormAssetContextProvider
