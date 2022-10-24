import api from '../../index';
import {
  GetCollectionsResponseProps,
} from './types';

const getCollections = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<GetCollectionsResponseProps> => {
  const { data } = await api.get('/collections', { params: { offset, limit } });

  return data;
};

export default getCollections;