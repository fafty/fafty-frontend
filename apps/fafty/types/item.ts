export default interface ItemProps {
  token: number
  title: string
  body?: string
  price?: number
  ticker?: string
  edit_count?: number
  slug: string
  type?: string
  thumbnail: {
    src: string
    dominant_color?: string
  }
  adult_content?: boolean
  properties?: object
  contract_address?: string
  token_id?: number
  token_standart?: string
  blockchain?: string
  cardCounter?: number
  cardUser?: number[]
}
