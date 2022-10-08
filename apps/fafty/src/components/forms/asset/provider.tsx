import { useState, ReactNode, useCallback, useEffect } from 'react';
import Context from './context';
import { CommentsModerationType, CommentsOrderType, FormProps, SetStepDataProps } from './types';

export const FormAssetContextProvider = ({
  onChangeDismiss,
  rawDataCallback,
  onRawDataCallback,
  onFinished,
  children
}: {
  onChangeDismiss: (data: { title: string, disabled: boolean }) => void;
  rawDataCallback: boolean;
  onRawDataCallback: (data: FormProps) => void;
  onFinished: () => void;
  children: ReactNode;
}) => {
  const [step1Answered, setStep1Answered] = useState(false);
  const [step2Answered, setStep2Answered] = useState(false);
  const [step3Answered, setStep3Answered] = useState(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [stepData, setStepData] = useState({
    asset: {
      id: '',
      storage: '',
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
        unlockable_content: null,
        sensitive_content: false,
      },
      solved: false,
      error: false,
    },
    step2: {
      state: {
        blockchain: 'dfinity',
        supply_units: 1,
        collection_token: '',
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
  });

  useEffect(() => {
    if (rawDataCallback) {
      onRawDataCallback(
        {
          asset: stepData.asset,
          ...stepData.step1.state,
          ...stepData.step2.state,
          ...stepData.step3.state,
        }
      );
    }
    finished && onFinished();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawDataCallback]);

  useEffect(() => {
    if (step1Answered && stepData.asset) {
      onChangeDismiss(
        {
          title: 'Close and save as draft',
          disabled: false,
        }
      );
    }
    if (!step1Answered && stepData.asset) {
      onChangeDismiss(
        {
          title: 'The button is not active because there are errors in some fields',
          disabled: true,
        }
      );
    }
    if (!step1Answered && !stepData.asset || finished) {
      onChangeDismiss(
        {
          title: 'Close',
          disabled: false,
        }
      );
    }
  }, [finished, step1Answered, stepData.asset]);

  const onSetStepData = useCallback(
    (data: SetStepDataProps) => {
      setStepData((prev) => ({ ...prev, ...data }));
    },
    [setStepData]
  );

  const contextValues = {
    step1Answered,
    setStep1Answered,
    step2Answered,
    setStep2Answered,
    step3Answered,
    setStep3Answered,
    finished,
    setFinished,
    stepData,
    setStepData: onSetStepData,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};
