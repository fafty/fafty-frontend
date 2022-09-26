type Paginate = {
  count: number;
  limit: number;
  offset: number;
};

export type Nft = {
  token: string;
  slug: string;
  name: string;
  active: boolean;
  total_nfts_count: number;
  blockchain: string;
  rating: number;
  likes: number;
  asset: null | string;
  sensitive_content: boolean;
  pool: string;
  deleted_at: null | string;
  updated_at: string;
  created_at: string;
};

export type GetNftResponse = {
  paginate: Paginate;
  records: Nft[];
};
