import { createContext } from 'react';

export interface Step1Props {
  name: string,
  description: object,
  unlockable_content: object,
  adult_content: boolean,
}

export interface Step2Props {
  blockchain_name: string,
  supply_units: number,
  collection_token: string,
}

export interface Step3Props {
  citizens: number,
  age: number,
}

export interface StepsProps {
  asset: object
  step1: {
    state: Step1Props,
    solved: boolean
  }
  step2: {
    state: Step2Props,
    solved: boolean
  }
  step3: {
    state: Step3Props
    solved: boolean
  }
}
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
  setStepData: (stepData: StepsProps) => void;
  setView: (view: JSX.Element) => void;
  solutionProvided: boolean;
  setSolutionProvided: (solutionProvided: boolean) => void;
  setStep1Answered: (step1Answered: boolean) => void;
  setStep2Answered: (step2Answered: boolean) => void;
  step1Answered: boolean;
  step2Answered: boolean;
  step3Answered: boolean;
  finished: boolean;
  setFinished: (finished: boolean) => void;
}
const Context = createContext<Partial<ContextProps>>({});

export default Context;