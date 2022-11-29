import { SearchResultType } from '../search'
import { ApiResponseGeneric } from '../common'

export type SearchResultResponseType = ApiResponseGeneric<SearchResultType[]>

export type SearchResultParamsType = string
