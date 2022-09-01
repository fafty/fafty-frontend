import {
  useState,
  useEffect,
  useContext,
  useCallback,
  ChangeEventHandler,
  Suspense,
  lazy,
  useLayoutEffect,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ContextProps, Step1Props } from '../context';

interface EditorProps {
  isAutocomplete?: boolean;
  maxCharacters?: null | number;
  isRichText?: boolean;
  showTreeView?: boolean;
  initialEditorState: null | string;
  placeholder?: string;
  name: string;
  hasError: boolean;
  onChange: ChangeEventHandler;
  namespace: string;
  loading?: boolean;
}

const Editor = dynamic<EditorProps>(
  () => import('@fafty-frontend/editor').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorPlaceholder header={true} />,
  }
);

const variants = {
  visible: {
    height: 'auto',
    transition: {
      duration: 0.2,
      delay: 0.1,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hidden: {
    height: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
      staggerChildren: 0.1,
      when: 'afterChildren',
      staggerDirection: -1,
    },
  },
};

const childVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
};

const SelectStep1 = ({ Context }: { Context: any }) => {
  /**
   * Context Store
   */
  const { step1Answered, setStep1Answered, stepData, setStepData } =
    useContext(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      ...stepData?.step1?.state,
    },
  });

  /**
   *  Local State
   */
  const formFields = watch();

  const [hasUnlockableContent, setHasUnlockableContent] = useState(false);

  /**
   * Load data from context store on component mount and save data to context store on component unmount
   */
  useLayoutEffect(() => {
    return () => {
      storeData();
    };
  }, []);

  /**
   * Monitor User Input
   */
  useEffect(() => {
    if (isValid) {
      setStep1Answered(true);
    }
  }, [formFields, isValid, setStep1Answered]);

  const storeData = () => {
    setStepData({
      step1: {
        solved: true,
        state: getValues(),
      },
    });
  };

  return (
    <>
      <div>
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
          <Suspense fallback={<EditorPlaceholder header={true} />}>
            <Controller
              name="description"
              control={control}
              defaultValue={formFields.description}
              render={({ field }) => (
                <Editor
                  {...field}
                  initialEditorState={field.value}
                  name="description"
                  placeholder="Enter some description"
                  namespace="description"
                  hasError={errors.description as unknown as boolean}
                  loading={false}
                />
              )}
            />
          </Suspense>
          <span className="text-red-500">
            {errors.description?.type === 'required' && (
              <span role="alert">Description is required.</span>
            )}
          </span>
        </div>
        <div className="flex my-3">
          <div className="flex-row">
            <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Unlockable Content
            </div>
            <div className="text-xs block truncate text-gray-400">
              Include unlockable content that can only be revealed by the owner
              of the item.
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
        <Controller
          name="unlockable_content"
          control={control}
          defaultValue={formFields.unlockable_content}
          render={({ field }) => (
            // <Suspense fallback={<EditorPlaceholder header={false} />}>
            <Editor
              {...field}
              {...(errors.unlockable_content && {
                'aria-invalid': true,
              })}
              initialEditorState={field.value}
              name="unlockable_content"
              placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
              isRichText={false}
              namespace="unlockable_content"
              hasError={errors.unlockable_content as unknown as boolean}
              loading={false}
            />
            // </Suspense>
          )}
        />
        <span className="text-red-500">
          {errors.unlockable_content?.type === 'required' && (
            <span role="alert">Content is required.</span>
          )}
        </span>
        {/* <motion.div
          initial={'hidden'}
          variants={variants}
          animate={hasUnlockableContent ? `visible` : `hidden`}
        >
          <motion.div variants={childVariants}>
            <Controller
              name="unlockable_content"
              control={control}
              defaultValue={formFields.unlockable_content}
              render={({ field }) => (
                <Editor
                  {...field}
                  {...(errors.unlockable_content && {
                    'aria-invalid': true,
                  })}
                  initialEditorState={field.value}
                  name="unlockable_content"
                  placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
                  isRichText={false}
                  namespace='unlockable_content'
                  hasError={errors.unlockable_content as unknown as boolean}
                  loading={loading}
                />
              )}
            />
            <span className="text-red-500">
              {errors.unlockable_content?.type === 'required' && (
                <span role="alert">Content is required.</span>
              )}
            </span>
          </motion.div>
        </motion.div> */}
      </div>
      {!step1Answered && (
        <div>
          <p>
            When alll answers are correct the next step button will be enabled!
          </p>
        </div>
      )}
    </>
  );
};

export default SelectStep1;