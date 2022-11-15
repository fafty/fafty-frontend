export type TagProps = {
  active: boolean;
  name: string;
  slug: string;
  description: string;
  bundles_count: number;
  collections_count: number;
  assets_count: number;
  updated_at: string;
  created_at: string;
};

export type GetPopularTagsResponseProps = {
  records: TagProps[];
};

export type GetSearchTagsResponseProps = GetPopularTagsResponseProps;
