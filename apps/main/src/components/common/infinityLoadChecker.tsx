import { MutableRefObject, useEffect, useRef } from 'react'
import { useOnScreen } from '@fafty/usehooks'

type Props = {
  allowLoad: boolean;
  isLoading: boolean;
  loadMore: () => void;
};

export const InfinityLoadChecker = ({
  isLoading,
  allowLoad,
  loadMore,
}: Props) => {
  const loaderAreaRef = useRef<HTMLDivElement | null>(null)
  const onScreen = useOnScreen<HTMLDivElement>(
    loaderAreaRef as MutableRefObject<HTMLDivElement>
  )

  useEffect(() => {
    if (!isLoading && onScreen && allowLoad) {
      loadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen, isLoading, allowLoad])

  return (
    <div className="relative flex">
      <div className="b-full absolute flex h-[300px]" ref={loaderAreaRef} />
    </div>
  )
}
