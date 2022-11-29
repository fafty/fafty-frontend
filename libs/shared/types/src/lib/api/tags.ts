import { ApiResponseGeneric, TagType } from '../common'

export type GetPopularTagsResponseType = ApiResponseGeneric<TagType[]>

export type GetSearchTagsResponseType = ApiResponseGeneric<TagType[]>
