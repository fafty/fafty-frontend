import api from '../../index';
import { GetPopularResponse } from './types';

export const getPopularTags = async (): Promise<GetPopularResponse> => {
  const { data } = await api.get('/tags/popular');

  return data;
};
