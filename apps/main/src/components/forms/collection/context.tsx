import { createContext } from 'react'
import { CollectionFormContextType } from '@fafty/shared/types'

const Context = createContext<Partial<CollectionFormContextType>>({})

export default Context
