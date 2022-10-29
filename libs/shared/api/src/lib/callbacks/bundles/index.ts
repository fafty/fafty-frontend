import api from '../../index';
import {
  GetBundlesParamsProps,
  GetBundlesResponseProps,
} from './types';


const getBundles = async (params?: GetBundlesParamsProps): Promise<GetBundlesResponseProps> => {
  const { data } = await api.get(`/bundles`, { params });

  return data;
};

// const getBundles = async ({
//   offset,
//   limit,
// }: {
//   limit: number;
//   offset: number;
// }): Promise<GetBundlesResponseProps> => {
//   const { data } = await api.get('/bundles', { params: { offset, limit } });

//   return data;
// };

export default getBundles;