type Paginate = {
  count: number;
  limit: number;
  offset: number;
};

export type NftItem = {
  token: number;
  name: string;
  description?: string;
  price?: number;
  ticker?: string;
  edit_count?: number;
  slug: string;
  type?: string;
  asset: {
    src: string;
    dominant_color?: string;
  };
  sensitive_content?: boolean;
  properties?: object;
  contract_address?: string;
  token_id?: number;
  token_standart?: string;
  blockchain?: string;
  cardCounter?: number;
  cardUser?: number[];
};

export type GetNftsResponse = {
  paginate: Paginate;
  records: NftItem[];
};

export type GetNftsParams = {
  limit: number;
  offset: number;
};
