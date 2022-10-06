import { createContext } from 'react';
import { Tag } from '../../../api/callbacks/tags/types';
import { CommentsModerationType, CommentsOrderType, FileProps } from './types';

export interface Step1Props {
  name: string;
  description: null | object;
  unlockable_content: null | object;
  sensitive_content: boolean;
}

export interface Step2Props {
  blockchain: string;
  supply_units: number;
  collection_token: string;
}

export interface Step3Props {
  allow_ratings: boolean;
  comments_moderation: CommentsModerationType;
  comments_order: CommentsOrderType;
  tags: Tag[];
}

export interface StepData<T> {
  state: T;
  solved: boolean;
  error: boolean;
}

export interface StepsProps {
  asset: FileProps;
  step1: StepData<Step1Props>;
  step2: StepData<Step2Props>;
  step3: StepData<Step3Props>;
}

export type SetStepDataProps = Record<
  string,
  | StepData<Step1Props>
  | StepData<Step2Props>
  | StepData<Step3Props>
  | FileProps
>;

export interface ContextProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  skipped: Set<number>;
  setSkipped: (skipped: Set<number>) => void;
  allowSkip: boolean;
  components: { [key: string]: JSX.Element };
  setComponent: (components: { [key: string]: any }) => void;
  view: null | JSX.Element;
  stepData: StepsProps;
  setStepData: (stepData: SetStepDataProps) => void;
  setView: (view: JSX.Element) => void;
  solutionProvided: boolean;
  setSolutionProvided: (solutionProvided: boolean) => void;
  setStep1Answered: (step1Answered: boolean) => void;
  setStep2Answered: (step2Answered: boolean) => void;
  setStep3Answered: (step3Answered: boolean) => void;
  step1Answered: boolean;
  step2Answered: boolean;
  step3Answered: boolean;
  finished: boolean;
  setFinished: (finished: boolean) => void;
}
const Context = createContext<Partial<ContextProps>>({});

export default Context;
