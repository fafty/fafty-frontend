import { createContext } from 'react'
import { TProviderContext } from './types'

// Context used by the hook useTheme()

export default createContext<TProviderContext>({ setTheme: _ => {}, themes: [] })
