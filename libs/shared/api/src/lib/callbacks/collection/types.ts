import { GetNftsResponseProps } from '../nfts/types';


export type CollectionProps = {
  token: string;
  slug: string;
  name: string;
  active: boolean;
  total_nfts_count: number;
  default_blockchain: string;
  rating: number;
  likes: number;
  cover: null | string;
  banner: null | string;
  sensitive_content: boolean;
  pool: string;
  deleted_at: null | string;
  updated_at: string;
  created_at: string;
};

export type GetCollectionParamsProps = {
  slug: string;
};

export type GetCollectionNftsBySlugParamsProps = {
  slug: string;
};

export type GetCollectionNftsBySlugResponseProps = {
  nfts: GetNftsResponseProps;
  slug: string;
  token: string;
};

export type GetCollectionResponseProps = {
  record: CollectionProps;
};
