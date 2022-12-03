import api from '../../index'
import {
  SearchResultParamsType,
  SearchResultResponseType
} from '@fafty/shared/types'

const getSearchResult = async (
  query?: SearchResultParamsType
): Promise<SearchResultResponseType> => {
  const { data } = await api.get('/search', { params: { query } })

  return data
}

export default getSearchResult
