import { TagProps } from '@fafty-frontend/shared/api';
import { CSSProperties } from 'react';
import { EditorState } from 'lexical';

interface ExistingFileProps {
  id: string;
  file_id: string;
  type: string;
  storage: string;
  position: number;
  size: number;
  filename: string;
  mime_type: string;
  src: string;
}

export interface FileProps {
  id: string;
  storage: string;
  metadata: {
    size: number;
    filename: string;
    mime_type: string;
  };
}

export interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: FileProps | FileProps[]) => void;
  OnGenetatedThumbnail: () => void;
}

export type CommentsModerationType =
  | 'allow_all'
  | 'automoderation'
  | 'hold_all'
  | 'disabled';

export type CommentsOrderType = 'interesting' | 'newest';

export interface FormProps {
  asset: FileProps | null;
  name: string | null;
  description: string | EditorState | null;
  unlockable_content: string | EditorState | null;
  sensitive_content: boolean;
  supply_units: number | null;
  blockchain: string;
  collection_token: string;
  allow_ratings: boolean;
  comments_moderation: CommentsModerationType;
  comments_order: CommentsOrderType;
  tags: TagProps[] | null;
}

export interface Props {
  baseData: FormProps;
  onSubmit: (data: FormProps) => Promise<void>;
  submiting: boolean;
}

export interface Step1Props {
  name: string;
  description: null | EditorState | string;
  unlockable_content: null | EditorState | string;
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
  StepData<Step1Props> | StepData<Step2Props> | StepData<Step3Props> | FileProps
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