import { CollectionType } from '@fafty/shared/types'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Viewer } from '@fafty/text/viewer'
import { childVariants, variants } from '../../../forms/asset/constants'
import {
  ChatBubbleBottomCenterTextIcon,
  DocumentIcon,
  EyeIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { isObjectEmpty } from '../../../../utils/helpers'
import { format } from 'date-fns'

type Props = {
  item: CollectionType
  onClickEdit: (item: CollectionType) => void
}
/**
 * @name Item
 * @description Render a single item in the list.
 * @param {Props} props
 * @param {CollectionProps} props.item
 * @returns {JSX.Element}
 * @example
 * <Item item={item} />
 */
export const Item = ({ item, onClickEdit }: Props): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false)

  const renderVisibility = useMemo(() => {
    const date = item.published_at || item.created_at

    switch (item.visibility) {
      case 'public':
        return (
          <>
            <div className="flex flex-col">
              <div className="flex items-center text-green-500">
                <EyeIcon className="mr-1 h-4 w-4" />
                <span className="">Public</span>
              </div>
              <span className="flex flex-col text-xs font-medium opacity-50">
                <span>Published:</span>{' '}
                <span>{date && format(new Date(date), 'dd LLL yyyy')}</span>
              </span>
            </div>
          </>
        )
      case 'draft':
        return (
          <>
            <div className="flex flex-col">
              <div className="flex items-center">
                <DocumentIcon className="mr-1 h-4 w-4" />
                <span className="">Draft</span>
              </div>
              <span className="flex flex-col text-xs font-medium opacity-50">
                <span>Uploaded:</span>{' '}
                <span>{date && format(new Date(date), 'dd LLL yyyy')}</span>
              </span>
            </div>
          </>
        )
      case 'private':
        return (
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Private</span>
          </div>
        )
      default:
        return null
    }
  }, [item.created_at, item.published_at, item.visibility])

  const renderRestrictions = useMemo(() => {
    switch (item.restrictions) {
      case 'none':
        return <span>None</span>
      case 'sensitive':
        return <span>Sensitive content {/* (set by you) */}</span>
      case 'sensitive_auto':
        return <span>Sensitive content {/* (set automatically) */}</span>
      case 'complaint_copyright':
        return <span className="text-red-500">Complaint (copyright)</span>
      default:
        return null
    }
  }, [item.restrictions])

  return (
    <div
      className="duration-350 group relative mx-auto grid h-[6rem] w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 py-1 text-sm transition hover:bg-white dark:hover:bg-neutral-800/95"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="z-2 ml-7 flex w-full flex-row items-center overflow-hidden p-1">
        <div
          className="h-17 w-17 relative flex flex-shrink-0 items-center justify-center rounded border-2 bg-neutral-200 group-hover:border-white dark:border-neutral-900/95 dark:bg-neutral-700 dark:group-hover:border-neutral-800/95"
          style={{ backgroundColor: item.cover.dominant_color || '' }}
        >
          <Image
            className="relative inline-block h-16 w-16 rounded"
            src={item?.cover.src}
            alt=""
            width={32}
            height={32}
          />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium">{item.name}</p>
          <motion.div
            className="w-[150px] truncate text-xs  font-medium text-neutral-500"
            initial={'visible'}
            variants={{
              visible: {
                height: '30px',
                opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.1,
                  when: 'beforeChildren',
                  staggerChildren: 0.1
                }
              },
              hidden: {
                height: '20px',
                opacity: 0.7,
                filter: 'blur(0.6px)',
                transition: {
                  duration: 0.2,
                  delay: 0.2
                }
              }
            }}
            animate={isHovered ? 'hidden' : 'visible'}
            exit={'visible'}
          >
            {isObjectEmpty(item.description) ? (
              <span className="text-xs font-medium opacity-50">
                Add description
              </span>
            ) : (
              <Viewer
                namespace={'description'}
                editorState={item.description}
              />
            )}
          </motion.div>
          <motion.div
            initial={'hidden'}
            variants={variants}
            animate={isHovered ? 'visible' : 'hidden'}
            exit={'hidden'}
          >
            <motion.div variants={childVariants}>
              <div className="grid auto-cols-max grid-flow-col items-center gap-2 py-2">
                <button
                  type="button"
                  title="Edit"
                  className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                  onClick={() => onClickEdit(item)}
                >
                  <PencilSquareIcon
                    strokeWidth="2"
                    className="h-5 w-5 touch-manipulation select-none"
                  />
                </button>
                <button
                  type="button"
                  title="Manage Comments"
                  className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                  onClick={() =>
                    void console.log('open modal for manage comments')
                  }
                >
                  <ChatBubbleBottomCenterTextIcon
                    strokeWidth="2"
                    className="h-5 w-5 touch-manipulation select-none"
                  />
                </button>
                <Link
                  href="/collection/[slug]"
                  as={`/collection/${encodeURIComponent(item.slug)}`}
                  className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                  title={`View ${item.name} on the marketplace`}
                >
                  <EyeIcon
                    strokeWidth="2"
                    className="h-5 w-5 touch-manipulation select-none"
                  />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {item.supply != null && item.supply > 0 ? (
        <div className="justify-left flex flex-row items-center">
          <div className="flex -space-x-4 overflow-hidden">
            {item.preview_assets?.slice(0, 3).map((asset, index) => (
              <div
                key={index}
                className="flex-inline relative overflow-hidden rounded-full border-2 group-hover:border-white dark:border-neutral-900/95 dark:group-hover:border-neutral-800/95"
              >
                <div
                  className="bg-base-300 h-8 w-8"
                  style={{
                    backgroundColor: asset.media.dominant_color || ''
                  }}
                >
                  <Image
                    className="relative inline-block h-9 w-9 rounded-full"
                    src={asset.media.src || ''}
                    alt=""
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            ))}
            {item.supply > 3 && (
              <div className="flex-inline relative overflow-hidden rounded-full border-2 group-hover:border-white dark:border-neutral-900/95 dark:group-hover:border-neutral-800/95">
                <div className="flex h-full w-8 items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                  <div className="font-bold">+{item.supply - 3}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="justify-left flex items-center">Without Assets</div>
      )}
      <div className="justify-left flex items-center">{renderVisibility}</div>
      <div className="justify-left flex items-center">{renderRestrictions}</div>
      <div className="justify-left flex items-center">{item.blockchain}</div>
    </div>
  )
}
