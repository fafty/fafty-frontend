import { useContext } from 'react'
import NotificationContext from './context'
import { ProviderContextProps } from './types'

// Custom hook to trigger the notification on function components
const useNotifications = (): ProviderContextProps =>
  useContext(NotificationContext)

export default useNotifications
