export default interface ItemProps {
  token: number
  name: string
  description?: object
  price?: number
  ticker?: string
  edit_count?: number
  slug: string
  type?: string
  asset: {
    src: string
    dominant_color?: string
  }
  sensitive_content?: boolean
  properties?: object
  contract_address?: string
  token_id?: number
  token_standart?: string
  blockchain?: string
  restrictions?: string
  visibility?: string
  created_at?: string
  updated_at?: string
  published_at?: string
  cardCounter?: number
  cardUser?: number[]
}
