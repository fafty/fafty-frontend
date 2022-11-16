import { ReactNode } from 'react'

interface ActionProps {
  name: string
  action: () => void
}

interface ActionsProps {
  first: ActionProps
  second?: ActionProps
}
interface DismissibleProps {
  active: boolean
  disabled: boolean
  title: string
}

interface OptionsProps {
  persist?: boolean
  dismissible?: DismissibleProps
  customIcon?: SVGElement
}

export interface ModalProps {
  children: ReactNode
  title: string
  actions?: ActionsProps
  options?: OptionsProps
  open: boolean
  className?: string
  onDismiss: () => void
}
