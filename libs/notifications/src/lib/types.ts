import { CSSProperties, ReactNode } from 'react';

interface TAction {
  name: string;
  action: () => void;
}

interface TActions {
  first: TAction;
  second?: TAction;
}

export type TCustomStyleObj = CSSProperties | undefined;

interface TCustomStyle {
  default?: TCustomStyleObj;
  success?: TCustomStyleObj;
  error?: TCustomStyleObj;
  warning?: TCustomStyleObj;
  info?: TCustomStyleObj;
}

interface TOptions {
  countdown?: number;
  persist?: boolean;
  dismissible?: boolean;
  customIcon?: any;
  customStyle?: TCustomStyle;
}

export interface TQueueableNotification {
  message: string;
  actions?: TActions;
  options?: TOptions;
}

export interface TNotification extends TQueueableNotification {
  id: number;
  open: boolean;
}

export interface TNotificationItem extends TNotification {
  onDismiss: (id: number) => void;
}

export interface TNotificationProvider {
  children?: ReactNode;
  maxNotifications?: number;
  customStyle?: TCustomStyle;
  customDismiss?: any;
}

export interface TProviderContext {
  enqueueNotification: (Snack: TQueueableNotification) => number;
  closeNotification: (id: number) => void;
}
