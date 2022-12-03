import api from '../../index'
import {
  GetPopularTagsResponseType,
  GetSearchTagsResponseType
} from '@fafty/shared/types'

const getPopularTags = async (): Promise<GetPopularTagsResponseType> => {
  const { data } = await api.get('/tags/popular')

  return data
}

const getTagsBySearch = async (
  query?: string
): Promise<GetSearchTagsResponseType> => {
  const { data } = await api.get('/tags/search', { params: { query } })

  return data
}

export { getPopularTags, getTagsBySearch }
