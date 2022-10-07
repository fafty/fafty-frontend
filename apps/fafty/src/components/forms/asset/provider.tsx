import { useState, ReactNode, useCallback } from 'react';
import Context, { SetStepDataProps } from './context';
import { CommentsModerationType, CommentsOrderType } from './types';

export const FormAssetContextProvider = ({
  children,
}: {
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
