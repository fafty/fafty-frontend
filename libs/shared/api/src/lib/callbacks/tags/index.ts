import api from '../../index'
import {
  GetPopularTagsResponseProps,
  GetSearchTagsResponseProps,
} from './types'

const getPopularTags = async (): Promise<GetPopularTagsResponseProps> => {
  const { data } = await api.get('/tags/popular')

  return data
}

const getTagsBySearch = async (
  query?: string
): Promise<GetSearchTagsResponseProps> => {
  const { data } = await api.get('/tags/search', { params: { query } })

  return data
}

export { getPopularTags, getTagsBySearch }
