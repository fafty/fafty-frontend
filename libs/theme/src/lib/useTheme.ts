import { useContext } from 'react'
import ThemeContext from './context'
import { ProviderContextProps } from './types'

// Custom hook to switch the theme on function components
const useTheme = ():ProviderContextProps => useContext(ThemeContext)

export default useTheme
