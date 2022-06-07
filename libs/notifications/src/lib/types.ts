import { CSSProperties, ReactNode } from 'react';

interface ActionProps {
  name: string;
  action: () => void;
}

interface ActionsProps {
  first: ActionProps;
  second?: ActionProps;
}

export type CustomStyleObjProps = CSSProperties | undefined;

interface CustomStyleProps {
  default?: CustomStyleObjProps;
  success?: CustomStyleObjProps;
  error?: CustomStyleObjProps;
  warning?: CustomStyleObjProps;
  info?: CustomStyleObjProps;
}

interface OptionsProps {
  countdown?: number;
  persist?: boolean;
  dismissible?: boolean;
  customIcon?: SVGElement;
  customStyle?: CustomStyleProps;
}

export interface QueueableNotificationProps {
  message: string;
  actions?: ActionsProps;
  options?: OptionsProps;
}

export interface NotificationProps extends QueueableNotificationProps {
  id: number;
  open: boolean;
}

export interface NotificationItemProps extends NotificationProps {
  onDismiss: (id: number) => void;
}

export interface NotificationProviderProps {
  children?: ReactNode;
  maxNotifications?: number;
  customStyle?: CustomStyleProps;
  customDismiss?: SVGElement;
}

export interface ProviderContextProps {
  enqueueNotification: (Snack: QueueableNotificationProps) => number;
  closeNotification: (id: number) => void;
}
