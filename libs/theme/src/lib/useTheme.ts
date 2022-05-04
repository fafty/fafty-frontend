import { useContext } from 'react'
import ThemeContext from './context'
import { TProviderContext } from './types'

// Custom hook to switch the theme on function components
const useTheme = ():TProviderContext => useContext(ThemeContext)

export default useTheme