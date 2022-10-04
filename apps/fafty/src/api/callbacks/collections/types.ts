import { GetNftsResponse } from '../nfts/types';

type Paginate = {
  count: number;
  limit: number;
  offset: number;
};

export type Collection = {
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

export type GetCollectionsResponse = {
  paginate: Paginate;
  records: Collection[];
};

export type GetCollectionParams = {
  slug: string;
};

export type GetCollectionNftsBySlugParams = {
  slug: string;
};

export type GetCollectionNftsBySlugResponse = {
  nfts: GetNftsResponse;
  slug: string;
  token: string;
};

export type GetCollectionResponse = {
  record: Collection;
};
