import { Tag } from 'apps/fafty/src/api/callbacks/tags/types';
import { CSSProperties } from 'react';

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

export interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: FileProps | FileProps[]) => void;
  OnGenetatedThumbnail: () => void;
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
  description: object | null;
  unlockable_content: object | null;
  sensitive_content: boolean;
  supply_units: number | null;
  blockchain: string;
  collection_token: string;
  allow_ratings: boolean;
  comments_moderation: CommentsModerationType;
  comments_order: CommentsOrderType;
  tags: Tag[] | null;
}

export interface Props {
  baseData: FormProps;
  onSubmit: (data: FormProps) => Promise<void>;
  submiting: boolean;
}
