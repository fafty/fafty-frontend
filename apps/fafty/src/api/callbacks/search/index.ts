import { SearchResultResponse } from './types';
import api from '../../index';

export const getSearchResult = async (
  query?: string
): Promise<SearchResultResponse> => {
  const { data } = await api.get('/search', { params: { query } });

  return data;
};
