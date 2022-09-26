export type Searchable = {
  name: string;
  description: null | string;
  slug: string;
};

export type SearchResult = {
  result_type: 'nft' | 'user' | 'collection' | 'bundle';
  searchable: Searchable;
};

export type SearchResultResponse = {
  records: SearchResult[];
};
