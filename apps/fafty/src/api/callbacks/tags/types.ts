export type Tag = {
  active: boolean;
  name: string;
  slug: string;
  description: string;
  total_bundles_count: number;
  total_collections_count: number;
  total_nfts_count: number;
  updated_at: string;
  created_at: string;
};

export type GetPopularResponse = {
  records: Tag[];
};

export type GetSearchTagsResponse = GetPopularResponse;
