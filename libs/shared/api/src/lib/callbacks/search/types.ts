type SearchableProps = {
  image: string;
  name: string;
  description: null | string;
  slug: string;
};

type SearchResultProps = {
  result_type: 'nft' | 'user' | 'collection' | 'bundle';
  searchable: SearchableProps;
};

export type SearchResultResponseProps = {
  records: SearchResultProps[];
};
