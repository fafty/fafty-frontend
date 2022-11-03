import { BundleProps } from '../bundle/types'

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetBundlesResponseProps = {
  paginate: PaginateProps;
  records: BundleProps[];
};

export type GetBundlesParamsProps = {
  limit?: number;
  offset?: number;
  filters?: {
    blockchain?: string;
  };
  sort?: string;
};
