import { useMemo } from 'react'
import { useAsync } from '@fafty/shared/api'
import { getPopularTags } from '@fafty/shared/api'
import { TagProps } from '@fafty/shared/api'
import TagsInput from './tagsInput'

type Props = {
  onChange: (value: TagProps[]) => void;
  value: TagProps[];
};

/** 
 * @param {Props} props
 * @param {TagProps[]} props.value
 * @param {(value: TagProps[]) => void} props.onChange
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <TagsInput value={value} onChange={onChange} />
 */
const TagsSelect = ({ value, onChange }: Props): JSX.Element => {
  const { data: popularData } = useAsync({
    callback: getPopularTags,
    withMount: true,
  })

  /**
   * @param {TagProps} tag
   * @returns {void}
   * @example
   * <TagsInput value={value} onChange={onChange} />
   */
  const handleOnChangeTag = (tag: TagProps): void => {
    const isIncludes = value.find((valueTag) => valueTag.slug === tag.slug)

    if (isIncludes) {
      onChange(value.filter((valueTag) => valueTag.slug !== tag.slug))
    } else {
      onChange([...value, tag])
    }
  }

  /**
   * @name handleOnDelete
   * @param {TagProps} tag
   * @returns {void}
   * @example
   * <TagsInput onDelete={handleOnDelete} />
   */
  const handleOnDelete = (tag: TagProps): void => {
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
      <TagsInput tags={value} onChange={handleOnChangeTag} onDelete={handleOnDelete} />
      {!!filteredPopularTags.length && (
        <div className="flex flex-col">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
            Popular tags
          </span>
          <div className="flex flex-wrap gap-2.5 col-auto -mt-2.5">
            {filteredPopularTags?.map((record) => (
              <div
                key={record.slug}
                onClick={() => handleOnChangeTag(record)}
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

export default TagsSelect
