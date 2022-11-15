import { EditorState } from 'lexical'
import {
  AssetProps,
  CommentsModerationType,
  CommentsOrderType,
  FileProps,
} from '../asset/types'
import { GetAssetsResponseProps } from '../assets/types'
import { TagProps } from '../tags/types'

export type BundleCover = {
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

export type BundleProps = {
  token: string;
  slug: string;
  name: string;
  description: string | EditorState | null;
  items_count?: number;
  blockchain?: string;
  visibility?: string;
  restrictions?: string;
  rating?: number;
  preview_assets?: AssetProps[];
  likes?: number;
  cover: BundleCover;
  sensitive_content?: boolean;
  pool?: string;
  deleted_at?: null | string;
  published_at?: string;
  updated_at?: string;
  created_at?: string;
};

export type GetBundleParamsProps = {
  slug: string;
};

export type GetBundleAssetsBySlugParamsProps = {
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

export type GetBundleAssetsBySlugResponseProps = {
  record: {
    assets: GetAssetsResponseProps;
    slug: string;
    token: string;
  };
};

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

export type GetBundleResponseProps = {
  record: BundleProps;
};

export type PutBundleParamsProps = {
  slug?: string;
  bundle: FormProps;
};
