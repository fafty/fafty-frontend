import {
  useState,
  useEffect,
  useContext,
  ChangeEventHandler,
  Suspense,
  useLayoutEffect,
  Context,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
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
// const Editor = lazy<EditorProps>(() => import('@fafty-frontend/editor').then((mod) => mod.Editor));

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

const SelectStep1 = ({ Context }: { Context: Context<ContextProps> }) => {
  /**
   * Context Store
   */
  const { step1Answered, setStep1Answered, stepData, setStepData } =
    useContext<ContextProps>(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    register,
    watch,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
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

  useEffect(() => {
    reset({
      ...stepData?.step1?.state,
    });
  }, [stepData?.step1?.state]);

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
        state: getValues() as Step1Props,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Infomation</h4>
      <div className="mb-5 mt-1 relative">
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
      <div className="my-3">
        <div className="flex-row mb-2">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Unlockable Content
          </div>
          <div className="text-xs block truncate text-gray-400">
            Include unlockable content that can only be revealed by the owner
            of the item.
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
      </div>
      <span className="text-red-500">
        {errors.unlockable_content?.type === 'required' && (
          <span role="alert">Content is required.</span>
        )}
      </span>
    </div>
  );
};

export default SelectStep1;
