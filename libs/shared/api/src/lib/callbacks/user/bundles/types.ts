import { BundleProps } from '../../bundle/types';

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetUserBundlesResponseProps = {
  paginate: PaginateProps;
  records: BundleProps[];
};

export type BillingTypeValue = 'fixed_price' | 'auction' | null;

export type GetUserBundlesParamsProps = {
  limit: number;
  offset: number;
  filters?: {
    currency?: string;
    price?: {
      lg?: number | string;
      ge?: number | string;
    };
    billing_type?: BillingTypeValue;
  };
  sort?: string;
};

export type GetUserBundlesCallbackProps = {
  address: string;
  params?: GetUserBundlesParamsProps;
};
