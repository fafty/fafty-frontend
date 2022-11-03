// Create functional component for item  with progress indicator
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import ProgressIndicator from "./progressIndicator"
import { ProgressProps, ThumbnailProps } from "../uploader"
import classNames from "classnames"
import { FileRemoveReason } from "@uppy/core"
const Label = ({
  item,
  progress,
}: {
  item: any;
  progress: any;
}): JSX.Element => {
  const size = (value: number) => {
    if (value === 0) return 0 + " B"
    const units: string[] = ["B", "kB", "MB", "GB", "TB"]
    const exponent: number = Math.min(
      Math.floor(Math.log(value) / Math.log(1000)),
      units.length - 1
    )
    const unit = units[exponent]
    return (
      (Number(value / Math.pow(1000, exponent)) * 1).toFixed(1) + " " + unit
    )
  };

  const calculateProgress = () => {
    const { bytesUploaded, bytesTotal } = progress
    console.log("calculateProgress", progress)
    return size(bytesUploaded) + "/" + size(bytesTotal)
  };

  const Define = () => {
    if (item.state === "uploading") {
      return calculateProgress()
    } else if (item.state === "complete" && item.type === "video") {
      return "Video"
    } else {
      return item.state
    }
  }

  return (
    item.state !== "complete" && (
      <span className="action">
        <Define />
      </span>
    )
  )
};

const Item = ({
  engine,
  item,
  // previewHeight,
  onAction,
}: {
  engine: any;
  item: ThumbnailProps;
  // previewHeight: number,
  onAction: ({
    id,
    globalId,
    action,
  }: {
    id: string;
    globalId?: string;
    action: string;
    reason: FileRemoveReason;
  }) => void;
}) => {
  const [progress, setProgress] = useState<ProgressProps>({
    percentage: 0,
    bytesUploaded: 0,
    bytesTotal: 0,
  })
  const [src, setSrc] = useState<string>()
  engine.on(
    "upload-progress",
    (file: { id: string }, progress: ProgressProps) => {
      item.id === file.id
      console.log("progress", file.id, progress)
      setProgress(progress)
      console.log("item", progress)
    }
  )

  const assetsVideoRef: any = useRef<HTMLVideoElement>()
  // const onScreen: boolean = useOnScreen<HTMLVideoElement>(assetsVideoRef, '-10px');

  // useEffect(() => {
  //   if (item.type ==='video') {
  //     const ref = assetsVideoRef.current;
  //     onScreen && ref && ref.play()
  //     !onScreen && ref && ref.pause()
  //   }
  // }, [onScreen])

  // useEffect(() => {
  //   return () => {
  //     assetsVideoRef.current = null
  //   }
  // }, [])

  useEffect(() => {
    const file = engine.getFile(item.id)
    if (file) {
      setSrc(file?.preview)
    } else if (item.src) {
      setSrc(item.src)
    }
  }, [])

  return (
    <div
      className={classNames(
        {
          error: item.state === "error",
          complete: item.state === "complete",
        },
        "attachment-preview image"
      )}
    >
      <div className="attachment-wrap">
        <Label item={item} progress={progress} />
        <button
          type="button"
          title="Remove"
          onClick={() =>
            onAction({
              id: item.id,
              globalId: item.id,
              action: "remove",
              reason: "removed-by-user",
            })
          }
          className="delete z-1 absolute top-2 right-2 m-1 hidden rounded-full bg-gray-600 p-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon
            className="h-4 w-4"
            strokeWidth="2"
            width={16}
            height={16}
            aria-hidden="true"
          />
        </button>
        {item.state !== "complete" && (
          <ProgressIndicator
            id={item.id}
            state={item.state as string}
            percentage={progress.percentage}
            onAction={onAction}
          />
        )}

        {item.type === "image" && <img src={src} alt="" />}
        {item.type === "video" && (
          <video
            id={item.id}
            src={src}
            height="260"
            autoPlay
            loop
            muted
            playsInline
            ref={assetsVideoRef}
          />
        )}
      </div>
    </div>
  )
};

export default Item
