import { useState, ReactNode, useCallback, useEffect } from 'react'
import {
  CommentsOrderType,
  CommentsModerationType,
  CollectionProps,
} from '@fafty/shared/api'
import Context from './context'
import { FormProps, SetStepDataProps, StepsProps } from './types'

const defaultStepsData: StepsProps = {
  cover: {
    id: '',
    storage: '',
    src: undefined,
    metadata: {
      size: 0,
      filename: '',
      mime_type: '',
    },
  },
  step1: {
    state: {
      name: '',
      description: null,
    },
    solved: false,
    error: false,
  },
  step2: {
    state: {
      assets: [],
    },
    solved: false,
    error: false,
  },
  step3: {
    state: {
      allow_ratings: true,
      comments_moderation: '' as CommentsModerationType,
      comments_order: 'newest' as CommentsOrderType,
      tags: [],
    },
    solved: false,
    error: false,
  },
  step4: {
    state: {
      is_checked: false,
    },
    solved: false,
    error: false,
  },
}

const FormCollectionContextProvider = ({
  onChangeDismiss,
  rawDataCallback,
  onRawDataCallback,
  onFinished,
  defaultData,
  children,
}: {
  onChangeDismiss: (data: { title: string; disabled: boolean }) => void;
  rawDataCallback: boolean;
  defaultData?: CollectionProps;
  onRawDataCallback: (data: FormProps) => void;
  onFinished: () => void;
  children: ReactNode;
}) => {
  const [step1Answered, setStep1Answered] = useState(false)
  const [step2Answered, setStep2Answered] = useState(false)
  const [step3Answered, setStep3Answered] = useState(false)
  const [step4Answered, setStep4Answered] = useState(false)
  const [finished, setFinished] = useState<boolean>(false)

  const [stepData, setStepData] = useState<StepsProps>({
    cover: {
      id: defaultData?.cover?.file_id || '',
      storage: defaultData?.cover?.storage || '',
      src: defaultData?.cover?.src || '',
      metadata: {
        size: defaultData?.cover?.size || 0,
        filename: defaultData?.cover?.filename || '',
        mime_type: defaultData?.cover?.mime_type || '',
      },
    },
    step1: {
      state: {
        name: defaultData?.name || '',
        description:
          defaultData?.description &&
          Object.keys(defaultData?.description).length
            ? defaultData?.description
            : '',
      },
      solved: !!defaultData?.description,
      error: false,
    },
    step2: {
      state: {
        assets: defaultData?.preview_assets || [],
      },
      solved: !!defaultData?.preview_assets,
      error: false,
    },
    step3: {
      state: {
        allow_ratings: false,
        comments_moderation: '' as CommentsModerationType,
        comments_order: 'newest' as CommentsOrderType,
        tags: [],
      },
      solved: false,
      error: false,
    },
    step4: {
      state: {
        is_checked: !!defaultData,
      },
      solved: !!defaultData,
      error: false,
    },
  })

  useEffect(() => {
    if (rawDataCallback) {
      onRawDataCallback({
        cover: stepData.cover,
        ...stepData.step1.state,
        ...stepData.step2.state,
        ...stepData.step3.state,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawDataCallback])

  useEffect(() => {
    finished && onFinished()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => {
    if (step1Answered && stepData.cover.id) {
      onChangeDismiss({
        title: 'Close and save as draft',
        disabled: false,
      })
    }
    if (!step1Answered && stepData.cover.id) {
      onChangeDismiss({
        title:
          'The button is not active because there are errors in some fields',
        disabled: true,
      })
    }
    if ((!step1Answered && !stepData.cover.id) || finished) {
      onChangeDismiss({
        title: 'Close',
        disabled: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, step1Answered, stepData.cover])

  const onSetStepData = useCallback(
    (data: SetStepDataProps) => {
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
    clearState,
  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}

export default FormCollectionContextProvider