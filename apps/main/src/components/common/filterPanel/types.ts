export enum FilterTypes {
  ARRAY = 'array',
  RANGE = 'range',
}

export type FilterTypeArray = {
  title: string;
  value: string;
  type: FilterTypes;
  options: { title: string; value: string }[];
};

export type FilterTypeRange = {
  title: string;
  value: string;
  type: FilterTypes;
  params: {
    firstTitle: string;
    secondTitle: string;
    firstKey: string;
    secondKey: string;
  };
};

export type FilterItem<T> = T extends 'array'
  ? FilterTypeArray
  : T extends 'range'
  ? FilterTypeRange
  : never;

export type FilterItemValue<T> = T extends 'array'
  ? string[]
  : T extends 'range'
  ? { from: string; to: string }
  : never;

export type OnChangeValue = RangeFilterValue | string[];

export type FiltersProps<T> = {
  values: T;
  onChange: (key: string, value: OnChangeValue) => void;
  onCloseTag: (key: string) => void;
  filters: (FilterTypeArray | FilterTypeRange)[];
};

export type RangeFilterValue = Record<string, string>;

export type TagProps<T> = {
  onClickClose: VoidFunction;
  onChange: (value: OnChangeValue) => void;
  filter: FilterItem<T>;
  value: FilterItemValue<T>;
};
