import {
  BillingTypeValue,
  PriceFiltersValue,
} from '../../../components/nfts/filters';
import { NftItemProps } from '../nft/types';

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetNftsResponseProps = {
  paginate: PaginateProps;
  records: NftItemProps[];
};

export type GetNftsParamsProps = {
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
