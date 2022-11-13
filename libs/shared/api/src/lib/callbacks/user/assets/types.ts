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

type AssetsUserFilterStateType = {
  visibility?: string[];
  restrictions?: string[];
  blockchain?: string[];
  price?: { min: string; max: string };
  type?: string[];
};

export type GetUserAssetsParamsProps = AssetsUserFilterStateType & {
  limit: number;
  offset: number;
};

export type GetUserAssetsCallbackProps = {
  address: string;
  params?: GetUserAssetsParamsProps;
};
