export type VisibilityValues = 'public' | 'draft' | 'private';
export type RestrictionsValues =
  | 'sensitive'
  | 'sensitive_auto'
  | 'complaint_copyright';

export type BlockchainValues = 'dfinity' | 'ethereum' | 'solana' | 'near';

export type ContentTypeValues = 'image' | 'video' | 'sound';

export type FiltersPrice = {
  min?: number;
  max?: number;
};

export type FiltersState = {
  visibility?: VisibilityValues[];
  restrictions?: RestrictionsValues[];
  blockchain?: BlockchainValues[];
  type?: ContentTypeValues[];
  price?: FiltersPrice;
};

export type onChangeFiltersValues =
  | VisibilityValues[]
  | RestrictionsValues[]
  | BlockchainValues[]
  | ContentTypeValues[]
  | FiltersPrice;

export type FiltersProps = {
  values: FiltersState;
  onChange: (key: string, value: onChangeFiltersValues) => void;
  onCloseTag: (key: keyof FiltersState) => void;
};
