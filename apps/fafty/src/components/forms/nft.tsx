import dynamic from 'next/dynamic';
import {
  ChangeEventHandler,
  lazy,
  Suspense,
  CSSProperties,
  useState,
  useEffect,
} from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
// import classNames from 'classnames';
import { UploaderPlaceholder } from '@fafty-frontend/shared/ui';
// import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Stepper from './formstep/stepper';
import { StepperContextProvider } from './formstep/provider';

interface ExistingFileProps {
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

// interface FileProps {
//   id: string;
//   file_id?: string;
//   type: string;
//   position: number;
//   attachment?: {
//     id: string;
//     storage: string;
//     metadata: {
//       size: number;
//       filename: string;
//       mime_type: string;
//     };
//   };
//   meta?: {
//     existing: boolean;
//   };
// }

interface FileProps {
  id: string;
  storage: string;
  metadata: {
    size: number;
    filename: string;
    mime_type: string;
  };
}

interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: FileProps | FileProps[]) => void;
}

// const Uploader = dynamic<UploaderProps>(
//   () => import('@fafty-frontend/uploader').then((mod) => mod.Uploader),
//   {
//     ssr: false,
//     loading: () => <UploaderPlaceholder />,
//   }
// );
// const SelectBlockchain = lazy(() => import('./components/selectBlockchain'));
// const SelectCollection = lazy(() => import('./components/selectCollection'));

// interface EditorProps {
//   isAutocomplete?: boolean;
//   maxCharacters?: null | number;
//   isRichText?: boolean;
//   showTreeView?: boolean;
//   initialEditorState: null | string | object;
//   placeholder?: string;
//   name: string;
//   hasError: boolean;
//   onChange: ChangeEventHandler;
// }

// const Editor = dynamic<EditorProps>(
//   () => import('@fafty-frontend/editor').then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => <EditorPlaceholder />,
//   }
// );

interface FormProps {
  asset: FileProps | null;
  name: string | null;
  description: string | null;
  unlockable_content: string | null;
  sensitive_content: boolean;
  supply_units: number | null;
  blockchain_name: string;
  collection_token: string;
}

interface Props {
  data: FormProps;
  onSubmit: (data: FormProps) => void;
  submiting: boolean;
}

// const variants = {
//   visible: {
//     height: 'auto',
//     transition: {
//       duration: 0.2,
//       delay: 0.1,
//       when: 'beforeChildren',
//       staggerChildren: 0.1,
//     },
//   },
//   hidden: {
//     height: 0,
//     transition: {
//       duration: 0.2,
//       delay: 0.1,
//       staggerChildren: 0.1,
//       when: 'afterChildren',
//       staggerDirection: -1,
//     },
//   },
// };
// const childVariants = {
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       delay: 0.1,
//     },
//   },
//   hidden: {
//     opacity: 0,
//     transition: {
//       duration: 0.2,
//       delay: 0.1,
//     },
//   },
// };
const NftForm = ({ data, onSubmit, submiting }: Props): JSX.Element => {
  // const [hasUnlockableContent, setHasUnlockableContent] = useState(false);
  // const [hasAdultContent, setHasAdultContent] = useState(false);
  // const {
  //   control,
  //   register,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();


  // useEffect(() => {
  //   if (hasUnlockableContent === false && data.unlockable_content !== null) {
  //     console.log('cleared unlockable content');
  //     reset({ unlockable_content: null });
  //   }
  // }, [hasUnlockableContent]);

  return (
    <>
      <StepperContextProvider> 
        <Stepper />
      </StepperContextProvider>
      {/* <div className="py-10 lg:pl-4 lg:pt-6 lg:pb-16 lg:col-start-2 lg:col-span-2 lg:border-l lg:border-gray-200 dark:lg:border-neutral-700 lg:pr-8"> */}

      {/* </div> */}
      {/* <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-1">
        <div className="rounded-lg border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow ">
          <div className="sticky top-[80px] p-3 mx-auto h-[500px]">
            <Controller
              name="asset"
              control={control}
              defaultValue={data.asset}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Uploader
                  {...field}
                  hasError={errors.asset?.type === 'required'}
                />
              )}
            />
          </div>
        </div>
      </div> */}

      {/* <div className="py-10 lg:pl-4 lg:pt-6 lg:pb-16 lg:col-start-2 lg:col-span-2 lg:border-l lg:border-gray-200 dark:lg:border-neutral-700 lg:pr-8">
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data as FormProps);
          })}
        >
          <div className="mb-5 relative">
            <label
              htmlFor="item-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              Name
            </label>
            <input
              type="text"
              id="item-name"
              className={`${
                errors.name
                  ? 'border-red-500'
                  : 'border-gray-200 dark:border-neutral-800'
              } text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12`}
              placeholder="Enter name of Nft"
              autoComplete="off"
              defaultValue={data.name}
              {...(errors.name && { 'aria-invalid': true })}
              {...register('name', {
                required: true,
                minLength: 5,
                maxLength: 30,
              })}
            />
            <span className="text-red-500">
              {errors.name?.type === 'required' && (
                <span role="alert">Name is required.</span>
              )}
              {errors.name?.type === 'minLength' && (
                <span role="alert">Min length of name is 5 characters.</span>
              )}
              {errors.name?.type === 'maxLength' && (
                <span role="alert">Max length of name is 30 characters.</span>
              )}
            </span>
          </div>
          <div className="my-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              // defaultValue="acasc cacascacsasca"
              rules={{
                required: true,
                minLength: 5,
                maxLength: 30,
              }}
              render={({ field }) => (
                <Editor
                  {...field}
                  initialEditorState={field.value}
                  name="description"
                  placeholder={'Enter some description'}
                  hasError={errors.description}
                />
              )}
            />
            <span className="text-red-500">
              {errors.description?.type === 'required' && (
                <span role="alert">Description is required.</span>
              )}
              {errors.description?.type === 'minLength' && (
                <span role="alert">
                  Min length of description is 5 characters.
                </span>
              )}
              {errors.description?.type === 'maxLength' && (
                <span role="alert">
                  Max length of description is 30 characters.
                </span>
              )}
            </span>
          </div>
          <div className="flex my-3">
            <div className="flex-row">
              <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Unlockable Content
              </div>
              <div className="text-xs block truncate text-gray-400">
                Include unlockable content that can only be revealed by the
                owner of the item.
              </div>
            </div>
            <div className="ml-auto">
              <label
                htmlFor="unlockable-content-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="unlockable-content-toggle"
                  className="sr-only peer"
                  name="unlockableContent"
                  aria-label={`${
                    hasUnlockableContent ? 'Activate' : 'Deactivate'
                  } Unlockable Content`}
                  onChange={(e) => setHasUnlockableContent(e.target.checked)}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <motion.div
            initial={'hidden'}
            variants={variants}
            animate={hasUnlockableContent ? `visible` : `hidden`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              variants={childVariants}
            >
              <Controller
                name="unlockable_content"
                control={control}
                rules={{
                  required: true,
                  maxLength: 300,
                }}
                render={({ field }) => (
                  <Editor
                    {...field}
                    {...(errors.unlockable_content && {
                      'aria-invalid': true,
                    })}
                    initialEditorState={field.value}
                    name="unlockable_content"
                    placeholder={
                      'Enter content (access key, code to redeem, link to a file, etc.)'
                    }
                    isRichText={false}
                    hasError={errors.unlockable_content}
                  />
                )}
              />
              <span className="text-red-500">
                {errors.unlockable_content?.type === 'required' && (
                  <span role="alert">Content is required.</span>
                )}
                {errors.unlockable_content?.type === 'minLength' && (
                  <span role="alert">
                    Min length of content is 5 characters.
                  </span>
                )}
                {errors.unlockable_content?.type === 'maxLength' && (
                  <span role="alert">
                    Max length of content is 30 characters.
                  </span>
                )}
              </span>
            </motion.div>
          </motion.div>
          <motion.div className="mb-5 relative">
            <label
              htmlFor="item-supply-units"
              className="block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              Supply
            </label>
            <input
              type="number"
              id="item-supply-units"
              className={`${
                errors.supply_units
                  ? 'border-red-500'
                  : 'border-gray-200 dark:border-neutral-800'
              } text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12`}
              placeholder="Enter of supply units"
              defaultValue={data.supply_units}
              min="1"
              {...(errors.supply_units && { 'aria-invalid': true })}
              {...register('supply_units', {
                required: true,
                min: 1,
              })}
            />
            <span className="text-red-500">
              {errors.supply_units?.type === 'required' && (
                <span role="alert">Units for supply is required.</span>
              )}
              {errors.supply_units?.type === 'min' && (
                <span role="alert">Minimum 1 unit.</span>
              )}
            </span>
          </motion.div>
          <Suspense fallback={<div>Loading...</div>}>
            <Controller
              name="blockchain_name"
              control={control}
              defaultValue={data.blockchain_name}
              render={({ field }) => (
                <SelectBlockchain {...field} current={field.value} />
              )}
            />
          </Suspense>
          <label
            htmlFor=""
            className="text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Collections
          </label>
          <Suspense fallback={<div>Loading...</div>}>
            <Controller
              name="collection_token"
              control={control}
              defaultValue={data.collection_token}
              render={({ field }) => (
                <SelectCollection {...field} current={field.value} />
              )}
            />
          </Suspense>
          <div className="flex my-3">
            <div className="flex-row">
              <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Adult Content
              </div>
              <div className="text-xs block truncate text-gray-400">
                This content is 18+.
              </div>
            </div>
            <div className="ml-auto">
              <label
                htmlFor="adult-content-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={data.sensitive_content}
                  id="adult-content-toggle"
                  className="sr-only peer"
                  aria-label="Adult Content"
                  {...register('sensitive_content', {})}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div className="flex my-3">
            <button
              type="submit"
              className={classNames(
                'inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400',
                {
                  'transition ease-in-out duration-150 cursor-not-allowed':
                    submiting,
                }
              )}
              {...(submiting && { 'aria-disabled': true, disabled: true })}
            >
              {submiting && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {submiting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default NftForm;
