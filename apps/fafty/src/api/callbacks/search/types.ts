export type Searchable = {
  name: string;
  description: null | string;
};

export type SearchResult = {
  result_type: 'nft' | 'user';
  searchable: Searchable;
};

export type SearchResultResponse = {
  records: SearchResult[];
};
