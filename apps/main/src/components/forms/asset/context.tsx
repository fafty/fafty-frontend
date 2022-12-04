import { createContext } from 'react'
import { AssetFormContextType } from '@fafty/shared/types'

const Context = createContext<Partial<AssetFormContextType>>({})

export default Context
