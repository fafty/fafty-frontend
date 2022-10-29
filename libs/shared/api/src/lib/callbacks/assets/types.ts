import {
  BillingTypeValue,
  PriceFiltersValue,
} from '../../../components/assets/filters';
import { AssetProps } from '../asset/types';

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetAssetsResponseProps = {
  paginate: PaginateProps;
  records: AssetProps[];
};

export type GetAssetsParamsProps = {
  limit?: number;
  offset?: number;
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
