import api from '../../index';
import {
  GetBundlesResponseProps,
} from './types';

const getBundles = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<GetBundlesResponseProps> => {
  const { data } = await api.get('/bundles', { params: { offset, limit } });

  return data;
};

export default getBundles;