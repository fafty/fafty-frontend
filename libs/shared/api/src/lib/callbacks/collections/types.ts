import { CollectionProps } from '../collection/types';

type PaginateProps = {
  count: number;
  limit: number;
  offset: number;
};

export type GetCollectionsResponseProps = {
  paginate: PaginateProps;
  records: CollectionProps[];
};
