import { useMemo } from 'react'
import { useAsync } from '@fafty/shared/api'
import { getPopularTags } from '@fafty/shared/api'
import { TagProps } from '@fafty/shared/api'
import { TagsInput } from './tagsInput'

type Props = {
  onChange: (value: TagProps[]) => void;
  value: TagProps[];
};

export const TagsSelect = ({ value, onChange }: Props) => {
  const { data: popularData } = useAsync({
    callback: getPopularTags,
    withMount: true,
  })

  const onChangeTag = (tag: TagProps) => {
    const isIncludes = value.find((valueTag) => valueTag.slug === tag.slug)

    if (isIncludes) {
      onChange(value.filter((valueTag) => valueTag.slug !== tag.slug))
    } else {
      onChange([...value, tag])
    }
  }

  const onDelete = (tag: TagProps) => {
    onChange(value.filter((valueTag) => valueTag.slug !== tag.slug))
  }

  const filteredPopularTags = useMemo(() => {
    return (
      popularData?.records?.filter(
        ({ slug }) => !value?.find((valueTag) => valueTag.slug === slug)
      ) || []
    )
  }, [popularData, value])

  return (
    <div className="flex flex-col">
      <TagsInput tags={value} onChange={onChangeTag} onDelete={onDelete} />
      {!!filteredPopularTags.length && (
        <div className="flex flex-col">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
            Popular tags
          </span>
          <div className="flex flex-wrap gap-2.5 col-auto -mt-2.5">
            {filteredPopularTags?.map((record) => (
              <div
                key={record.slug}
                onClick={() => onChangeTag(record)}
                className="bg-blue-600  rounded text-sm px-4 py-2 cursor-pointer flex text-white dark:text-slate-50"
              >
                {record.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
