import { useContext } from 'react'
import NotificationContext from './context'
import { TProviderContext } from './types'

// Custom hook to trigger the notification on function components
const useNotifications = ():TProviderContext => useContext(NotificationContext)

export default useNotifications;