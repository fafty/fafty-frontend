import { SearchResultResponseProps } from './types'
import api from '../../index'

const getSearchResult = async (
  query?: string
): Promise<SearchResultResponseProps> => {
  const { data } = await api.get('/search', { params: { query } })

  return data
}

export default getSearchResult
