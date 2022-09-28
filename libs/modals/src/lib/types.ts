import { ReactNode } from 'react';

interface ActionProps {
  name: string;
  action: () => void;
}

interface ActionsProps {
  first: ActionProps;
  second?: ActionProps;
}

interface OptionsProps {
  persist?: boolean;
  dismissible?: boolean;
  customIcon?: SVGElement;
}

export interface ModalProps {
  children: ReactNode;
  title: string;
  actions?: ActionsProps;
  options?: OptionsProps;
  open: boolean;
  onDismiss: () => void;
}
