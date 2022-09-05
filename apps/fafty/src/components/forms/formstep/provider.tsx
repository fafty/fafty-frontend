import { useState, ReactNode, useEffect, useCallback } from 'react';
import Context, {
  CommentsModerationType,
  CommentsOrderType,
  SetStepDataProps,
} from './context';

export const StepperContextProvider = ({
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
    },
    step1: {
      state: {
        name: '',
        description: null,
        unlockable_content: null,
        adult_content: false,
      },
      solved: false,
    },
    step2: {
      state: {
        blockchain: 'dfinity',
        supply_units: 1,
        collection_token: 'none',
      },
      solved: false,
    },
    step3: {
      state: {
        allow_ratings: true,
        comments_moderation: 'allow_all' as CommentsModerationType,
        comments_order: 'new' as CommentsOrderType,
        tags: [],
      },
      solved: false,
    },
  });

  useEffect(() => {
    console.log('stepData in provider', stepData);
  }, [stepData]);

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
