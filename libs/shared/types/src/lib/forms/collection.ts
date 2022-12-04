import { EditorState } from 'lexical'
import { AssetMediaType, AssetType } from '../asset'
import {
  FileType,
  TagType,
  CommentsOrderType,
  CommentsModerationType,
  FormStepDataType
} from '../common'

export type CollectionFormDataType = {
  cover: FileType | null
  name: string | null
  description: string | EditorState | null
  assets: AssetType[] | null
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[] | null
}

export type CollectionFormMainPropsType = {
  submitting: boolean
  defaultCover?: AssetMediaType
  onSubmit: (data: CollectionFormDataType) => Promise<void>
}

export type CollectionFormContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  skipped: Set<number>
  setSkipped: (skipped: Set<number>) => void
  allowSkip: boolean
  components: { [key: string]: JSX.Element }
  setComponent: (components: { [key: string]: unknown }) => void
  view: null | JSX.Element
  stepData: CollectionFormStepDataType
  setStepData: (stepData: CollectionFormSetStepDataType) => void
  setView: (view: JSX.Element) => void
  solutionProvided: boolean
  setSolutionProvided: (solutionProvided: boolean) => void
  setStep1Answered: (step1Answered: boolean) => void
  setStep2Answered: (step2Answered: boolean) => void
  setStep3Answered: (step3Answered: boolean) => void
  setStep4Answered: (step4Answered: boolean) => void
  step1Answered: boolean
  step2Answered: boolean
  step3Answered: boolean
  step4Answered: boolean
  finished: boolean
  setFinished: (finished: boolean) => void
  clearState: VoidFunction
}

export type CollectionFormStep1Type = {
  name: string | null
  description: null | EditorState | string
}

export type CollectionFormStep2Type = {
  assets: AssetType[] | null
}

export type CollectionFormStep3Type = {
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[]
}

export type CollectionFormStep4Type = {
  is_checked: boolean
}

export type CollectionFormStepDataType = {
  cover: FileType
  step1: FormStepDataType<CollectionFormStep1Type>
  step2: FormStepDataType<CollectionFormStep2Type>
  step3: FormStepDataType<CollectionFormStep3Type>
  step4: FormStepDataType<CollectionFormStep4Type>
}

export type CollectionFormSetStepDataType = Record<
  string,
  | FormStepDataType<CollectionFormStep1Type>
  | FormStepDataType<CollectionFormStep2Type>
  | FormStepDataType<CollectionFormStep3Type>
  | FormStepDataType<CollectionFormStep4Type>
  | FileType
>
