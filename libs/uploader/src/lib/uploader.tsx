import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ErrorResponse,
  FileRemoveReason,
  SuccessResponse,
  Uppy,
  UppyFile,
} from '@uppy/core';
import Compressor from '@uppy/compressor';
import AwsS3 from '@uppy/aws-s3';

import ThumbnailGenerator from '@uppy/thumbnail-generator';
import getDroppedFiles from '@uppy/utils/lib/getDroppedFiles';
import isDragDropSupported from '@uppy/utils/lib/isDragDropSupported';
import toArray from '@uppy/utils/lib/toArray';
import Item from './ui/item';
import classNames from 'classnames';
import { useNotifications } from '@fafty-frontend/notifications';
import { useIsomorphicLayoutEffect, useTimeout } from '@fafty-frontend/usehooks';
import Sortable from 'sortablejs';
import { gsap } from 'gsap';
export interface ExistingFileProps {
  id: string;
  file_id: string;
  type: string;
  storage: string;
  position: number;
  size: number;
  filename: string;
  mime_type: string;
  src: string;
}
export interface FileProps {
  id: string;
  file_id?: string;
  type: string;
  position: number;
  attachment?: {
    id: string;
    storage: string;
    metadata: {
      size: number;
      filename: string;
      mime_type: string;
    };
  };
  meta?: {
    existing: boolean;
  };
}
export interface ProgressProps {
  // action?: string
  percentage: number;
  bytesUploaded: number;
  bytesTotal: number;
  attachment?: {
    id: string;
    storage: string;
    metadata: {
      size: number;
      filename: string;
      mime_type: string;
    };
  };
}
export interface ThumbnailProps {
  id: string;
  file_id?: string;
  type: string;
  position: number;
  state: string;
  // progress: ProgressInterface
  meta?: {
    existing: boolean;
  };
  src?: string;
}
interface Props {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  previewHeight?: number;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: React.CSSProperties;
  presignEndpoint?: string;
  onChange: (value: string) => void;
}

const Uploader = ({
  hasError = false,
  loading = false,
  type = 'assets',
  previewHeight = 300,
  existingFiles = [],
  allowedFileTypes = [
    '.jpg',
    '.jpeg',
    '.png',
    '.bmp',
    '.mp4',
    '.mov',
    '.qt',
    '.webm',
    '.ogg',
    '.avi',
  ],
  style = {},
  presignEndpoint = 'presign',
  onChange,
}: Props): JSX.Element => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [thumbnails, setThumbnails] = useState<ThumbnailProps[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragDropSupported] = useState<boolean>(isDragDropSupported);
  // const removeDragOverClassTimeout = useRef<setTimeout | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const inputFilesRef: any = useRef<HTMLInputElement>();
  const { enqueueNotification, closeNotification } = useNotifications();

  const mainTextRef = useRef<HTMLDivElement>(null);
  const tipTextRef = useRef<HTMLDivElement>(null);
  const uploadIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    existingFiles.forEach(function (file) {
      setFiles((files) => [
        ...files,
        {
          id: file.id,
          file_id: file.file_id,
          type: file.type,
          position: file.position,
          attachment: {
            id: file.file_id,
            storage: file.storage,
            metadata: {
              size: file.size,
              filename: file.filename,
              mime_type: file.mime_type,
            },
          },
        },
      ]);
      setThumbnails((thumbnails) => [
        ...thumbnails,
        {
          id: file.id,
          type: file.type,
          position: file.position,
          state: 'complete',
          meta: { existing: true },
          src: file.src,
        },
      ]);
    });
    setIsLoading(false);
    engine.setOptions({ autoProceed: true });
  }, []);

  useIsomorphicLayoutEffect(() => {
    const tiptl = gsap.timeline({
      delay: 5,
      repeat: 3,
      repeatDelay: 15
    });
    const icontl = gsap.timeline({
      delay: 5,
      repeat: 3,
      repeatDelay: 15
    });
    tiptl.to(
      mainTextRef.current, {
        duration: 0.5,
        opacity: 0,
        display: 'none',
        delay: 0.5
      }
    )
    tiptl.to(
      tipTextRef.current, {
        duration: 0.5,
        opacity: 1,
        display: 'block',
        delay: 0.5
      }
    )
    tiptl.to(
      tipTextRef.current, {
        duration: 0.5,
        opacity: 0,
        display: 'none',
        delay: 5
      }
    )
    tiptl.to(
      mainTextRef.current, {
        duration: 0.5,
        opacity: 1,
        display: 'block',
        delay: 0.5
      }
    )
    
    icontl.to(
      uploadIconRef.current, {
        duration: 0.5,
        scale: 1.2,
        stroke: 'rgb(59 130 246)',
        delay: 0.5
      }
    )
    icontl.to(
      uploadIconRef.current, {
        duration: 0.5,
        scale: 1,
        stroke: 'rgb(156 163 175)',
        delay: 1.2
      }
    )

  }, []);
  
  useEffect(() => {
    var draggablesection = document.getElementById('draggable');
    const draggable = new Sortable(draggablesection as HTMLElement, {
      sort: true,
      animation: 400,
      delay: 0, // time in milliseconds to define when the sorting should start
      delayOnTouchOnly: true, // only delay if user is using touch
      // easing: "cubic-bezier(1, 0, 0, 1)",
      swapThreshold: 1, // Threshold of the swap zone
      invertSwap: true, // Will always use inverted swap zone if set to true
      handle: '.attachment-wrap',
      dataIdAttr: 'data-id',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'draggable-ghost',
      forceFallback: false, // Ignore the HTML5 DnD behaviour and force the fallback to kick in
      fallbackTolerance: 10, // Specify in pixels how far the mouse should move before it's considered as a drag.
      // Element dragging started
      onStart: function (/**Event*/ evt) {
        evt.oldIndex; // element index within parent
      },

      // Element dragging ended
      onEnd: function (/**Event*/ evt) {
        var itemEl = evt.item; // dragged HTMLElement
        evt.to; // target list
        evt.from; // previous list
        evt.oldIndex; // element's old index within old parent
        evt.newIndex; // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone; // the clone element
        evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
      },
    });
    return () => {};
  }, []);

  const engine = useMemo(() => {
    return (
      new Uppy({
        id: 'assets',
        autoProceed: false,
        allowMultipleUploadBatches: true,
        debug: true,
        restrictions: {
          maxNumberOfFiles: 10,
          minNumberOfFiles: 1,
          minFileSize: 10 * 1024,
          maxFileSize: 300 * 1024 * 1024,
          allowedFileTypes: allowedFileTypes,
        },
        meta: {
          username: 'custom meta like address walet',
        },
        locale: {
          strings: {
            exceedsSize2: 'This file exceeds maximum allowed size of %{size}',
            noInternetConnection: 'No Internet connection',
            connectedToInternet: 'Connected to the Internet',
            noDuplicates:
              "Cannot add the duplicate file '%{fileName}', it already exists",
            // youCanOnlyUploadFileTypes: 'You can only upload images and videos with extension: .jpeg, .png, .bpm, .mp4, .mov, .webm, .ogg, .avi'
          },
        },
      })
        .use(ThumbnailGenerator, {
          thumbnailWidth: 800,
          waitForThumbnailsBeforeUpload: true,
          // queueProcessing: true
        })
        .use(AwsS3, {
          limit: 4,
          async getUploadParameters(file) {
            // Send a request to our signing endpoint.
            const requestOptions = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
            };
            console.log('before fetch');
            const url = `/api/v0/${presignEndpoint}?filename=${file.name}&type=${file.type}`;
            const response = await fetch(url, requestOptions);
            console.log('response fetch');

            const data = await response.json();
            return {
              method: data.method,
              url: data.url,
              fields: data.fields,
            };
          },
        })
        .use(Compressor, {
          quality: 0.6,
          limit: 2,
        })
        .on('thumbnail:generated', (file, preview) => {
          setThumbnails((thumbnails) => [
            ...thumbnails,
            {
              id: file.id,
              // global_id: file.meta.key.match(/^cache\/(.+)/)[1],
              type: 'image',
              position: 0,
              state: 'pending',
              // meta: file.meta,
              // src: preview
            },
          ]);
        })
        .on('file-added', (file: UppyFile) => {
          if (file.type && file.type.includes('video')) {
            addVideo(file);
          }
        })
        // @ts-ignore
        .on('preprocess-progress', (file: UppyFile) => {
          changeThumbnailState(file.id, 'compressing');
        })
        .on('preprocess-complete', (file) => {
          changeThumbnailState(file.id, 'in-upload-queue');
        })
        // @ts-ignore
        .on('upload-started', (file: UppyFile) => {
          changeThumbnailState(file.id, 'uploading');
        })
        .on('upload-success', (file: UppyFile, _response: SuccessResponse) => {
          const uploadedFileData = (file: any) => {
            // construct uploaded file data in the format that Shrine expects
            return {
              id: file.meta.key.match(/^cache\/(.+)/)[1], // object key without prefix
              storage: 'cache',
              metadata: {
                size: file.size,
                filename: file.name,
                mime_type: file.type,
              },
            };
          };
          setThumbnails((thumbnails) =>
            thumbnails.map((t) =>
              t.id === file.id
                ? {
                    ...t,
                    state: 'complete',
                    ...{
                      progress: {
                        // ...t.progress,
                        attachment: uploadedFileData(file),
                      },
                    },
                  }
                : t
            )
          );
          // TODO add attachment to object
          // setFiles([...files, { attachment: uploadedFileData(file) } ])
        })

        // .on('upload-error', (file, error, response: ErrorResponse) => {
        //   setThumbnails(thumbnails => thumbnails.map(
        //     t => t.id === file.id ? {
        //       ...t,
        //       state: 'error',
        //       description: `${error} uploading file ${file.name}`,
        //     } : t
        //   ))
        // })
        .on('file-removed', (file: UppyFile) => {
          try {
            // for edit page
            setFiles((files) => files.filter((f) => f.id !== file.id));
            setThumbnails((thumbnails) =>
              thumbnails.filter((t) => t.id !== file.id)
            );
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
        })
        .on('info-visible', () => {
          const info = engine.getState().info;
          if (info && info.message !== '') {
            console.log('info', info);
            // notifications.push(info)
            if (info.type === 'error' && !info.isHidden) {
              const id = enqueueNotification({
                message: `${info.message}, ${info.details}`,
                options: { dismissible: true },
              });
            }
            setNotifications((notifications) => [...notifications, info]);
          }
        })
        .on('info-hidden', () => {
          setNotifications([]);
        })
    );
  }, []);

  useEffect(() => {
    console.log('useEffect', engine.state);
  }, [engine.state]);

  useEffect(() => {
    return () => engine.close();
  }, [engine]);

  useEffect(() => {
    console.log('isDragging', isDragging);
    console.log('isDraggingOver', isDraggingOver);
    console.log('isSorting', isSorting);
    console.log('isSorting', isSorting);
  }, [isDraggingOver, isDragging, isSorting]);

  // functions -------

  // TODO implement this function to file-removed event
  // const remove = async({ id, globalId }: { id: string, globalId: string }) =>{
  //   await (
  //     setFiles(
  //       files.map(
  //         f => f.id === id ? {
  //           ...f,
  //           ...{
  //             _delete: true
  //           }
  //         } : f
  //       )
  //     )
  //   )
  //   if (globalId) {
  //     await ( setFiles(files.filter(f => f.id !== globalId && f.attachment && f.attachment.storage !== 'cache')))
  //   }
  //   await engine.removeFile(id)
  //   await (
  //     setThumbnails(thumbnails => thumbnails.filter(t => t.id !== id))
  //   )
  // }

  const chnageThumbnailPosition = (id: string, position: number) => {
    setThumbnails((thumbnails) =>
      thumbnails.map((t) =>
        t.id === id
          ? {
              ...t,
              position,
            }
          : t
      )
    );
  };

  const changeThumbnailState = (id: string, state: string) => {
    setThumbnails((thumbnails) =>
      thumbnails.map((t) =>
        t.id === id
          ? {
              ...t,
              state,
            }
          : t
      )
    );
  };

  const addFiles = (files: File[]): void => {
    const descriptors = files.map((file) => ({
      // source: this.id,
      type: file.type,
      data: file,
      meta: {
        // path of the file relative to the ancestor directory the user selected.
        // relativePath: file.relativePath || null
      },
      source: 'Local',
      isRemote: false,
    }));

    try {
      engine.addFiles(descriptors);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const addVideo = (file: UppyFile) => {
    setThumbnails((thumbnails) => [
      ...thumbnails,
      {
        id: '',
        type: 'video',
        position: 0,
        state: 'pending',
        // progress: {
        //   percentage: 0,
        //   bytesUploaded: 0,
        //   bytesTotal: 0
        // },
        src: URL.createObjectURL(file.data),
      },
    ]);
  };

  // Ui function to add a file to the uploader
  const onInputChange = (event: any): void => {
    const files = toArray(event.target.files);
    addFiles(files);

    // We clear the input after a file is selected, because otherwise
    // change event is not fired in Chrome and Safari when a file
    // with the same name is selected.
    // ___Why not use value="" on <input/> instead?
    //    Because if we use that method of clearing the input,
    //    Chrome will not trigger change if we drop the same file twice (Issue #768).
    event.target.value = null;
  };

  const handleDrop = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();

    // 2. Remove dragover class
    setIsDraggingOver(false);

    setIsDragging(true);

    // 3. Add all dropped files
    const logDropError = (error: any) => {
      // eslint-disable-next-line no-console
      console.log(error, 'error');
    };
    getDroppedFiles(event.dataTransfer, { logDropError }).then((files) =>
      addFiles(files)
    );
  };

  const handleDragOver = (event: any) => {
    if (isSorting) {
      return;
    }
    if (thumbnails.length > 0 && type !== 'assets') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    // 1. Add a small (+) icon on drop
    // (and prevent browsers from interpreting this as files being _moved_ into the browser, https://github.com/transloadit/uppy/issues/1978)
    event.dataTransfer.dropEffect = 'copy';

    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDragEnd = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    console.log('handleDragExit');
  };

  const draggableChange = ({ moved }: { moved: any }) => {
    if (moved) {
      // move the item in the underlying array
      files.splice(moved.newIndex, 0, files.splice(moved.oldIndex, 1)[0]);
      // update order property based on position in array
      files.forEach(function (file, index) {
        file.position = index; // + 1
      });
    }
  };

  const PlaceHolders = (): JSX.Element => {
    const items = existingFiles.map((file) => (
      <div
        key={file.id}
        className="attachment-preview image"
        // style={` height: ${previewHeight} `}
      >
        <div className="attachment-wrap">
          <div className="placeholder" />
        </div>
      </div>
    ));
    return <>{items}</>;
  };

  const onAction = ({
    id,
    globalId,
    action,
    reason,
  }: {
    id: string;
    globalId?: string;
    action: string;
    reason: FileRemoveReason;
  }): void => {
    console.log('action', action);
    switch (action) {
      case 'cancel':
        engine.removeFile(id, reason);
        break;
      case 'remove':
        engine.removeFile(id, reason);
        break;
      case 'retry':
        engine.retryUpload(id);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('unknown action emited from progress indicator');
    }
  };

  return (
    <div
      id="assets"
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      className="grow h-full"
    >
      <div
        id="draggable"
        className={classNames('attachment-container-preview flex flex-wrap', {
          draggable: isSorting,
          attachments: type === 'assets',
        })}
      >
        {isLoading ? (
          <PlaceHolders />
        ) : (
          thumbnails.map((item) => (
            <Item
              key={item.id}
              engine={engine}
              item={item}
              previewHeight={previewHeight}
              onAction={onAction}
            />
          ))
        )}
      </div>
      {(isDragging || thumbnails.length === 0) && (
        <div
          className={classNames(
            'flex flex-row h-full w-full space-x-1 flex-1',
            {
              'absolute left-0 right-0 top-0 bottom-0 z-10 p-5 hidden ':
                thumbnails.length > 0,
              'show block': isDraggingOver,
            }
          )}
        >
          <div
            role="button"
            className={classNames(
              'flex items-center justify-center flex-1 border-2 rounded-lg bg-gray-50 dark:bg-neutral-800',
              {
                'border-blue-500': isDraggingOver,
                'border-dashed': !isDraggingOver,
                'border-gray-300 dark:border-neutral-300': dragDropSupported && !isDraggingOver,
                'border-red-500 ': hasError && !isDraggingOver,
              }
            )}
            onClick={() => inputFilesRef.current.click()}
          >
            <div className="flex flex-col items-center flex-1">
              <svg
                ref={uploadIconRef}
                className={classNames(
                  'mx-auto h-12 w-12',
                  {
                    'text-blue-500': isDraggingOver,
                    'text-gray-400': !isDraggingOver,
                  }
                )}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <span className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <div className="text-xs text-gray-500 h-3">
                <span ref={mainTextRef}>PNG, JPG, GIF up to 100MB</span>
                <span ref={tipTextRef} className="hidden">Also MP3 WAW, OGG, GLB, GLTF File types supported.</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* TODO: Finalize for many files upload... planed using in other applications of the monorepo. */}
      <div className="hidden">
        <div className="small tip-text">
          first-photo-is-cover text
        </div>
        <div className="wrapper-input">
          <div className="custom-file">
            <input
              id="customFile"
              ref={ inputFilesRef }
              className={classNames('custom-file-input', { show: thumbnails.length !== 0 })}
              type="file"
              tabIndex={thumbnails.length !== 0 ? 1 : -1}
              name="files[]"
              multiple={true}
              accept={ allowedFileTypes.join(', ') }
              onChange={ (e) => onInputChange(e) }
            />
            <label className="custom-file-label" htmlFor="customFile">Choose File</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
