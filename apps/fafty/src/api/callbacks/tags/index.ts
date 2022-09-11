import api from '../../index';
import { GetPopularResponse, GetSearchTagsResponse } from './types';

export const getPopularTags = async (): Promise<GetPopularResponse> => {
  const { data } = await api.get('/tags/popular');

  return data;
};

export const getTagsBySearch = async (
  query?: string
): Promise<GetSearchTagsResponse> => {
  const { data } = await api.get('/tags/search', { params: { query } });

  return data;
};
