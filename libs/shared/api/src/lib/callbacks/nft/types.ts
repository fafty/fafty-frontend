import { TagProps } from '../tags/types';
import { EditorState } from 'lexical';
// import { CSSProperties } from 'react';

export type NftAsset = {
  dominant_color: string | null;
  file_id: string;
  filename: string;
  height: number;
  mime_type: string;
  size: number;
  src: string;
  storage: string;
  type: string;
  width: number;
};

export type NftProps = {
  token: number;
  name: string;
  description: string | EditorState | null;
  price?: number;
  ticker?: string;
  edit_count?: number;
  slug: string;
  type?: string;
  available_supply_units: 1;
  created_at: string;
  published_at: string | null;
  deleted_at: string | null;
  asset: NftAsset;
  sensitive_content?: boolean;
  contract_address?: string;
  token_id?: number;
  token_standart?: string;
  blockchain?: string;
  restrictions?: string;
  visibility: string;
  tags: TagProps[];
  comments_moderation: CommentsModerationType;
  collection_token: string;
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

export type NftResponseProps = {
  record: NftProps;
};

interface ExistingFileProps {
  id: string;
  file_id: string;
  type: string;
  storage: string;
  position: number;
  size: number;
  filename: string;
  mime_type: string;
  src: string;
}

export interface FileProps {
  id: string;
  storage: string;
  metadata: {
    size: number;
    filename: string;
    mime_type: string;
  };
}

export type CommentsModerationType =
  | 'allow_all'
  | 'automoderation'
  | 'hold_all'
  | 'disabled';

export type CommentsOrderType = 'interesting' | 'newest';

export interface FormProps {
  asset: FileProps | null;
  name: string | null;
  description: string | EditorState | null;
  unlockable_content: string | EditorState | null;
  sensitive_content: boolean;
  supply_units: number | null;
  blockchain: string;
  collection_token: string;
  allow_ratings: boolean;
  comments_moderation: CommentsModerationType;
  comments_order: CommentsOrderType;
  tags: TagProps[] | null;
}

export type NftPutParams = {
  slug?: string;
  nft: FormProps;
};
