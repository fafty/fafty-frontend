import { EditorState } from 'lexical'
import {
  CommentsModerationType,
  CommentsOrderType,
  TagType,
  FileType,
  FormStepDataType
} from '../common'
import { AssetMediaType } from '../asset'

export type AssetFormMainPropsType = {
  onSubmit: (data: AssetFormDataType) => Promise<void>
  submitting: boolean
  defaultAsset?: AssetMediaType
}

export type AssetFormDataType = {
  media: FileType | null
  name: string | null
  description: string | EditorState | null
  unlockable_content: string | EditorState | null
  sensitive_content: boolean
  supply_units: number | null
  blockchain: string
  collection_token: string
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[] | null
}

export interface AssetFormStep1Type {
  name: string | null
  description: null | EditorState | string
  unlockable_content: null | EditorState | string
  sensitive_content: boolean
}

export interface AssetFormStep2Type {
  blockchain: string
  supply_units: number
  collection_token: string
}

export interface AssetFormStep3Type {
  allow_ratings: boolean
  comments_moderation: CommentsModerationType
  comments_order: CommentsOrderType
  tags: TagType[]
}

export interface AssetFormStep4Type {
  is_checked: boolean
}

export type AssetFormSetStepDataType = Record<
  string,
  | FormStepDataType<AssetFormStep1Type>
  | FormStepDataType<AssetFormStep2Type>
  | FormStepDataType<AssetFormStep3Type>
  | FormStepDataType<AssetFormStep4Type>
  | FileType
>

export interface AssetFormStepDataType {
  media: FileType
  step1: FormStepDataType<AssetFormStep1Type>
  step2: FormStepDataType<AssetFormStep2Type>
  step3: FormStepDataType<AssetFormStep3Type>
  step4: FormStepDataType<AssetFormStep4Type>
}

export type AssetFormContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  skipped: Set<number>
  setSkipped: (skipped: Set<number>) => void
  allowSkip: boolean
  components: { [key: string]: JSX.Element }
  setComponent: (components: { [key: string]: unknown }) => void
  view: null | JSX.Element
  stepData: AssetFormStepDataType
  setStepData: (stepData: AssetFormSetStepDataType) => void
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
