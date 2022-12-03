import { useMemo } from 'react'
import { useAsync } from '@fafty/shared/api'
import { getPopularTags } from '@fafty/shared/api'
import { TagProps } from '@fafty/shared/api'
import TagsInput from './tagsInput'
import { motion } from 'framer-motion'

type Props = {
  onChange: (value: TagProps[]) => void
  value: TagProps[]
}

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
    withMount: true
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
      <TagsInput
        tags={value}
        onChange={handleOnChangeTag}
        onDelete={handleOnDelete}
      />
      {!!filteredPopularTags.length && (
        <div className="flex flex-col">
          <span className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-100">
            Popular tags
          </span>
          <motion.div layout className="col-auto -mt-2.5 flex flex-wrap gap-2.5">
            {filteredPopularTags?.map((record) => (
              <motion.div
                layout
                key={record.slug}
                onClick={() => handleOnChangeTag(record)}
                >
                <div
                  className="duration-250 cursor-pointer box-border flex flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-neutral-200 px-3 py-1 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                >
                  {record.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default TagsSelect
