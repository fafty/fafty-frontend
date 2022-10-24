import { useState, ReactNode, useCallback, useEffect } from 'react';
import {
  AssetProps,
  CommentsOrderType,
  CommentsModerationType,
} from '@fafty-frontend/shared/api';
import Context from './context';
import { FormProps, SetStepDataProps } from './types';

export const FormAssetContextProvider = ({
  onChangeDismiss,
  rawDataCallback,
  onRawDataCallback,
  onFinished,
  defaultData,
  children,
}: {
  onChangeDismiss: (data: { title: string; disabled: boolean }) => void;
  rawDataCallback: boolean;
  defaultData?: AssetProps;
  onRawDataCallback: (data: FormProps) => void;
  onFinished: () => void;
  children: ReactNode;
}) => {
  const [step1Answered, setStep1Answered] = useState(false);
  const [step2Answered, setStep2Answered] = useState(false);
  const [step3Answered, setStep3Answered] = useState(false);
  const [finished, setFinished] = useState<boolean>(false);

  const [stepData, setStepData] = useState({
    media: {
      id: defaultData?.media?.file_id || '',
      storage: defaultData?.media?.storage || '',
      src: defaultData?.media?.src || '',
      metadata: {
        size: defaultData?.media?.size || 0,
        filename: defaultData?.media?.filename || '',
        mime_type: defaultData?.media?.mime_type || '',
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
        unlockable_content: null,
        sensitive_content: !!defaultData?.sensitive_content,
      },
      solved: !!defaultData,
      error: false,
    },
    step2: {
      state: {
        blockchain: 'dfinity',
        supply_units: defaultData?.available_supply_units || 1,
        collection_token: '',
      },
      solved:
        !!defaultData?.available_supply_units &&
        !!defaultData?.collection_token,
      error: false,
    },
    step3: {
      state: {
        allow_ratings: true,
        comments_moderation: '' as CommentsModerationType,
        comments_order: 'newest' as CommentsOrderType,
        tags: [],
      },
      solved: !!defaultData?.tags?.length && !!defaultData?.comments_moderation,
      error: false,
    },
  });

  useEffect(() => {
    if (rawDataCallback) {
      onRawDataCallback({
        media: stepData.media,
        ...stepData.step1.state,
        ...stepData.step2.state,
        ...stepData.step3.state,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawDataCallback]);

  useEffect(() => {
    finished && onFinished();
  }, [finished]);

  useEffect(() => {
    if (step1Answered && stepData.media) {
      onChangeDismiss({
        title: 'Close and save as draft',
        disabled: false,
      });
    }
    if (!step1Answered && stepData.media) {
      onChangeDismiss({
        title:
          'The button is not active because there are errors in some fields',
        disabled: true,
      });
    }
    if ((!step1Answered && !stepData.media) || finished) {
      onChangeDismiss({
        title: 'Close',
        disabled: false,
      });
    }
  }, [finished, step1Answered, stepData.media]);

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
