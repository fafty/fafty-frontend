import { CSSProperties, ReactNode } from 'react'

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
  playSound?: boolean;
  customIcon?: SVGElement;
  customStyle?: CustomStyleProps;
}

// export type NotificationPositionType = 'bottom-left' | 'bottom-center';
export interface QueueableNotificationProps {
  title?: string;
  message: string;
  actions?: ActionsProps;
  options?: OptionsProps;
  position: string;
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
  enqueueNotification: (notification: QueueableNotificationProps) => void;
  closeNotification: (id: number) => void;
}
