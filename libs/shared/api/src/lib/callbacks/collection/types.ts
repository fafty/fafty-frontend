import { TagProps } from '../tags/types'

import { EditorState } from 'lexical'
import { AssetProps } from '../asset/types'
import { GetAssetsResponseProps } from '../assets/types'

export type CollectionCoverProps = {
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

export type CollectionProps = {
  token: string;
  slug: string;
  name: string;
  description: string | EditorState | null;
  supply?: number;
  owners_count?: number;
  floor_price?: number;
  listed_count?: number;
  sales_count?: number;
  sales_volume?: number;
  blockchain?: string;
  visibility?: string;
  restrictions?: string;
  rating?: number;
  preview_assets?: AssetProps[];
  likes?: number;
  cover: CollectionCoverProps;
  banner?: null | string;
  sensitive_content?: boolean;
  pool?: string;
  deleted_at?: null | string;
  published_at?: string;
  updated_at?: string;
  created_at?: string;
};

export type GetCollectionParamsProps = {
  slug: string;
};

export type GetCollectionAssetsBySlugParamsProps = {
  slug: string;
  limit: number;
  offset: number;
  filters?: {
    currency?: string;
    price?: {
      lg?: number | string;
      ge?: number | string;
    };
    // billing_type?: BillingTypeValue;
  };
  sort?: string;
};

export type GetCollectionAssetsBySlugResponseProps = {
  record: {
    assets: GetAssetsResponseProps;
    slug: string;
    token: string;
  };
};

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
  cover: FileProps | null;
  name: string | null;
  description: string | EditorState | null;
  assets: AssetProps[] | null;
  allow_ratings: boolean;
  comments_moderation: CommentsModerationType;
  comments_order: CommentsOrderType;
  tags: TagProps[] | null;
}

export type GetCollectionResponseProps = {
  record: CollectionProps;
};

export type PutCollectionParamsProps = {
  slug?: string;
  collection: FormProps;
};
