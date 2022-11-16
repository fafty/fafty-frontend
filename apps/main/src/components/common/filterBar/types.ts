export enum TypeProps {
  ARRAY = 'array',
  RANGE = 'range'
}

export type ArrayProps = {
  title: string
  value: string
  type: TypeProps
  options: { title: string; value: string }[]
}

export type RangeProps = {
  title: string
  value: string
  type: TypeProps
  params: {
    firstTitle: string
    secondTitle: string
    firstKey: string
    secondKey: string
  }
}

export type ItemProps<T> = T extends 'array'
  ? ArrayProps
  : T extends 'range'
  ? RangeProps
  : never

export type ItemValueProps<T> = T extends 'array'
  ? string[]
  : T extends 'range'
  ? { from: string; to: string }
  : never

export type OnChangeValueProps = RangeFilterValueProps | string[]

export type Props<T> = {
  values: T
  onChange: (key: string, value: OnChangeValueProps) => void
  onCloseTag: (key: string) => void
  filters: (ArrayProps | RangeProps)[]
}

export type RangeFilterValueProps = Record<string, string>

export type TagProps<T> = {
  onClickClose: () => void
  onChange: (value: OnChangeValueProps) => void
  filter: ItemProps<T>
  value: ItemValueProps<T>
}
