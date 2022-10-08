export type NftProps = {
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

export type NftInfoResponseProps = {
  record: {
    blockchain: string;
    contract_address: string | null;
    slug: string;
    token: string;
    token_id: string | null;
    token_standart: string | null;
  };
};

type NftCreatorProps = {
  first_name: string;
  last_name: string;
  username: string;
  bio: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  language: string;
  created_at: string;
};

export type NftOwnersResponseProps = {
  record: {
    token: string;
    slug: string;
    creator: NftCreatorProps;
    //@todo change owners to model
    owners: string[];
  };
};
