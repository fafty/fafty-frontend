import {
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
import { motion } from 'framer-motion';
import { childVariants, variants } from '../constants';
import classNames from 'classnames';
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

const SelectStep1 = ({ Context }: { Context: Context<ContextProps> }) => {
  /**
   * Context Store
   */
  const { step1Answered, setStep1Answered, step1Errored, setStep1Errored, stepData, setStepData } =
    useContext<ContextProps>(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    register,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  /**
   *  Local State
   */
  const formFields = watch();

  /**
   * Load data from context store on component mount and save data to context store on component unmount
   */
  useLayoutEffect(() => {
    const result = trigger("name", { shouldFocus: true });
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
      setStep1Errored(false);
    } else {
      setStep1Answered(false);
      setStep1Errored(true);
    }
  }, [formFields, isValid, setStep1Answered]);

  const  storeData = async () => {
    const result = await trigger("name", { shouldFocus: true });
    setStepData({
      step1: {
        state: getValues() as Step1Props,
        solved: isValid,
        error: result,
      },
    });
    console.log('errors', result);
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
          className={classNames(
            {
              'border-red-500': errors.name,
              'border-gray-200 dark:border-neutral-800': !errors.name,
            },
            "text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12"
          )}
          placeholder="Enter name of Nft"
          autoComplete="off"
          {...(errors.name && { 'aria-invalid': true })}
          {...register('name', {
            required: true,
            minLength: 3,
            maxLength: 30,
          })}
        />
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.name ? `visible` : `hidden`}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500">
              {errors.name?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">Name is required.</motion.div>
              )}
              {errors.name?.type === 'minLength' && (
                <motion.div variants={childVariants} role="alert">Min length of name is 3 characters.</motion.div>
              )}
              {errors.name?.type === 'maxLength' && (
                <motion.div variants={childVariants} role="alert">Max length of name is 30 characters.</motion.div>
              )}
            </span>
          </motion.div>
        </motion.div>
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
          )}
        />
      </div>
    </div>
  );
};

export default SelectStep1;