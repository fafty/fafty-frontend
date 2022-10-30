import {
  useEffect,
  useContext,
  ChangeEventHandler,
  Suspense,
  useLayoutEffect,
  Context,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { childVariants, variants } from '../constants';
import classNames from 'classnames';
import { EditorState } from 'lexical';
import { ContextProps, Step1Props } from '../types';
import { useComponentDidUpdate } from '@fafty-frontend/usehooks';

interface EditorProps {
  isAutocomplete?: boolean;
  maxCharacters?: null | number;
  isRichText?: boolean;
  showTreeView?: boolean;
  initialEditorState: null | string | EditorState;
  placeholder?: string;
  name: string;
  hasError: boolean;
  onChange: ChangeEventHandler;
  namespace: string;
  loading?: boolean;
}

const Editor = dynamic<EditorProps>(
  () => import('@fafty-frontend/text/editor').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorPlaceholder header={true} />,
  }
);

const SelectStep1 = ({ Context }: { Context: Context<ContextProps> }) => {
  const [isMounted, setIsMounted] = useState(false);
  /**
   * Context Store
   */
  const { setStep1Answered, stepData, setStepData } =
    useContext<ContextProps>(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      ...stepData?.step1?.state,
    },
  });

  /**
   *  Local State
   */
  const formFields = watch();

  useComponentDidUpdate(
    (prevProps) => {
      if (!prevProps?.cover?.id && stepData?.cover?.id) {
        reset({
          name: stepData.step1.state.name,
        });
      }
    },
    {
      cover: stepData?.cover,
    }
  );

  /**
   * Load data from context store on component mount and save data to context store on component unmount
   */
  useLayoutEffect(() => {
    return () => {
      storeData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Monitor User Input
   */
  useEffect(() => {
    if (isValid) {
      setStep1Answered(true);
    } else {
      setStep1Answered(false);
    }
  }, [formFields, isValid, setStep1Answered]);

  const storeData = async () => {
    const isValidForm = await trigger();

    setStepData({
      step1: {
        state: getValues() as Step1Props,
        solved: isValidForm,
        error: !isValidForm,
      },
    });
  };

  useEffect(() => {
    if (stepData?.cover?.id && isMounted) {
      setStepData({
        step1: {
          state: getValues() as Step1Props,
          solved: isValid,
          error: !isValid,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

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
        <Controller
          name="name"
          control={control}
          defaultValue={formFields.name}
          rules={{ required: true, minLength: 3, maxLength: 30 }}
          render={({ field }) => (
            <input
              type="text"
              id="item-name"
              className={classNames(
                {
                  'border-red-500': errors.name,
                  'border-gray-200 dark:border-neutral-800': !errors.name,
                },
                'text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12'
              )}
              placeholder="Enter name"
              {...(errors.name && { 'aria-invalid': true })}
              autoComplete="off"
              {...field}
            />
          )}
        />
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.name ? `visible` : `hidden`}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500">
              {errors.name?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">
                  Name is required.
                </motion.div>
              )}
              {errors.name?.type === 'minLength' && (
                <motion.div variants={childVariants} role="alert">
                  Min length of name is 3 characters.
                </motion.div>
              )}
              {errors.name?.type === 'maxLength' && (
                <motion.div variants={childVariants} role="alert">
                  Max length of name is 30 characters.
                </motion.div>
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
    </div>
  );
};

export default SelectStep1;
