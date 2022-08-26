import dynamic from 'next/dynamic';
import {
  ChangeEventHandler,
  lazy,
  Suspense,
  CSSProperties,
  useState,
  useEffect,
} from 'react';
import { UploaderPlaceholder } from '@fafty-frontend/shared/ui';
import Stepper from './formstep/stepper';
import { StepperContextProvider } from './formstep/provider';

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

interface FileProps {
  id: string;
  storage: string;
  metadata: {
    size: number;
    filename: string;
    mime_type: string;
  };
}

interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: FileProps | FileProps[]) => void;
}

interface FormProps {
  asset: FileProps | null;
  name: string | null;
  description: string | null;
  unlockable_content: string | null;
  sensitive_content: boolean;
  supply_units: number | null;
  blockchain_name: string;
  collection_token: string;
}

interface Props {
  data: FormProps;
  onSubmit: (data: FormProps) => void;
  submiting: boolean;
}

const NftForm = ({ data, onSubmit, submiting }: Props): JSX.Element => {
  return (
    <>
      <StepperContextProvider> 
        <Stepper />
      </StepperContextProvider>
    </>
  );
};

export default NftForm;
