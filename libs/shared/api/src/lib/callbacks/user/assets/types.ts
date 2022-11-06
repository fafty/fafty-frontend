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

export type BillingTypeValue = 'fixed_price' | 'auction' | null;

//TODO do types together with components
type VisibilityValues = 'public' | 'draft' | 'private';
type RestrictionsValues =
  | 'sensitive'
  | 'sensitive_auto'
  | 'complaint_copyright';

type BlockchainValues = 'dfinity' | 'ethereum' | 'solana' | 'near';

type ContentTypeValues = 'image' | 'video' | 'sound';

type FiltersPrice = {
  min?: number;
  max?: number;
};

type FiltersState = {
  visibility?: VisibilityValues[];
  restrictions?: RestrictionsValues[];
  blockchain?: BlockchainValues[];
  type?: ContentTypeValues[];
  price?: FiltersPrice;
};

export type GetUserAssetsParamsProps = FiltersState & {
  limit: number;
  offset: number;
};

export type GetUserAssetsCallbackProps = {
  address: string;
  params?: GetUserAssetsParamsProps;
};
