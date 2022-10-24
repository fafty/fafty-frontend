export type TagProps = {
  active: boolean;
  name: string;
  slug: string;
  description: string;
  total_bundles_count: number;
  total_collections_count: number;
  total_assets_count: number;
  updated_at: string;
  created_at: string;
};

export type GetPopularTagsResponseProps = {
  records: TagProps[];
};

export type GetSearchTagsResponseProps = GetPopularTagsResponseProps;
