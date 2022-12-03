import { EditorState } from 'lexical'

export type ResultDataType = 'asset' | 'user' | 'collection' | 'bundle'

export type SearchableType = {
  image: {
    src: string
    dominant_color: string
  }
  name: string
  description: string | EditorState | null
  slug: string
}

export type SearchResultType = {
  result_type: ResultDataType
  searchable: SearchableType
}
