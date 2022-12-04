import { CSSProperties } from 'react'

export type UploaderAttachmentType = {
  id: string
  storage: string
  metadata: {
    size: number
    filename: string
    mime_type: string
  }
}

export type UploaderExistingFileType = {
  id: string
  file_id: string
  type: string
  storage: string
  position: number
  size: number
  filename: string
  mime_type: string
  src: string
}

export interface UploaderItemProgressType {
  // action?: string
  percentage: number
  bytesUploaded: number
  bytesTotal: number
  attachment?: {
    id: string
    storage: string
    metadata: {
      size: number
      filename: string
      mime_type: string
    }
  }
}

export interface UploaderThumbnailPropsType {
  id: string
  file_id?: string
  type: string
  position: number
  state: string
  // progress: ProgressInterface
  meta?: {
    existing: boolean
  }
  src?: string
}

export type UploaderPropsType = {
  hasError?: boolean
  loading?: boolean
  type?: string
  maxNumberOfFiles?: number
  // previewHeight?: number;
  existingFiles?: UploaderExistingFileType[]
  allowedFileTypes?: string[]
  style?: CSSProperties
  presignEndpoint?: string
  onChange: (value: UploaderAttachmentType | UploaderAttachmentType[]) => void
  OnGeneratedThumbnail: () => void
}

export type UploaderFileType = {
  id: string
  file_id?: string
  type: string
  position: number
  attachment: UploaderAttachmentType
  meta?: {
    existing: boolean
  }
}
