import { createContext } from 'react'
import { ContextProps } from './types'

const Context = createContext<Partial<ContextProps>>({})

export default Context
