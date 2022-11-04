import { createContext } from 'react'
import { ProviderContextProps } from './types'

// Context used by the hook useTheme()
export default createContext<ProviderContextProps>({
  setTheme: (_) => {},
  themes: [],
})
