import { TagProps } from '../tags/types';
import { EditorState } from 'lexical';
import { CollectionProps } from '../collection/types';
// import { CSSProperties } from 'react';

export type AssetMedia = {
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

export type AssetProps = {
  token: number;
  name: string;
  description: string | EditorState | null;
  price?: number;
  ticker?: string;
  edit_count?: number;
  slug: string;
  type?: string;
  supply_units: number;
  available_supply_units: number;
  created_at: string;
  published_at: string | null;
  deleted_at: string | null;
  media: AssetMedia;
  sensitive_content?: boolean;
  contract_address?: string;
  token_id?: number;
  token_standart?: string;
  blockchain?: string;
  restrictions?: string;
  visibility: string;
  tags: TagProps[];
  comments_moderation: CommentsModerationType;
  collection?: CollectionProps;
  collection_token: string;
};

export type AssetInfoResponseProps = {
  record: {
    blockchain: string;
    contract_address: string | null;
    slug: string;
    token: string;
    token_id: string | null;
    token_standart: string | null;
  };
};

type AssetCreatorProps = {
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

export type AssetOwnersResponseProps = {
  record: {
    token: string;
    slug: string;
    creator: AssetCreatorProps;
    //@todo change owners to model
    owners: string[];
  };
};

export type AssetResponseProps = {
  record: AssetProps;
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
  media: FileProps | null;
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

export type AssetPutParams = {
  slug?: string;
  asset: FormProps;
};
