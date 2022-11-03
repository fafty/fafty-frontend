import { CollectionProps } from '../../collection/types'

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetUserCollectionsResponseProps = {
  paginate: PaginateProps;
  records: CollectionProps[];
};

export type BillingTypeValue = 'fixed_price' | 'auction' | null;

export type GetUserCollectionsParamsProps = {
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

export type GetUserCollectionsCallbackProps = {
  address: string;
  params?: GetUserCollectionsParamsProps;
};
