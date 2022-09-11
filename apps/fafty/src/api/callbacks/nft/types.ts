export type InfoResponse = {
  record: {
    blockchain: string;
    contract_address: string | null;
    slug: string;
    token: string;
    token_id: string | null;
    token_standart: string | null;
  };
};

export type Creator = {
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

export type OwnersResponse = {
  record: {
    token: string;
    slug: string;
    creator: Creator;
    //@todo change owners to model
    owners: string[];
  };
};
