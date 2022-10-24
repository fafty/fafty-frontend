import {
  BillingTypeValue,
  PriceFiltersValue,
} from '../../../components/assets/filters';
import { AssetProps } from '../../asset/types';

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetUserAssetsResponseProps = {
  paginate: PaginateProps;
  records: AssetProps[];
};

export type GetUserAssetsParamsProps = {
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

export type GetUserAssetsCallbackProps = {
  address: string;
  params?: GetUserAssetsParamsProps;
};
