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

export type GetCollectionResponse = {
  paginate: Paginate;
  records: Collection[];
};
