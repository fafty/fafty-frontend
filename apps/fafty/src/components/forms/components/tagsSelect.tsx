import { useAsync } from '../../../api/useAsync';
import { getPopularTags } from '../../../api/callbacks/tags';

type Props = {
  onChange: (value: string) => void;
  value: string[];
};

export const TagsSelect = ({}: Props) => {
  const { isLoading, data } = useAsync({
    callback: getPopularTags,
    withMount: true,
  });

  return null;
};
