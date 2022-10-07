import {
  useState,
  useEffect,
  useContext,
  ChangeEventHandler,
  Suspense,
  useLayoutEffect,
  useMemo,
  Fragment,
  Context,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
import { Switch, RadioGroup, Listbox } from '@headlessui/react';
import {
  childVariants,
  COMMENTS_MODERATION_OPTIONS,
  COMMENTS_ORDER_OPTIONS,
  variants,
} from '../constants';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownSIcon } from '@remixicons/react/line';
import { ContextProps } from '../context';
import { TagsSelect } from '../../common/tagsSelect';
import { useComponentDidUpdate } from '@fafty-frontend/usehooks';

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

const SelectStep3 = ({ Context }: { Context: Context<ContextProps> }) => {
  /**
   * Context Store
   */
  const { step3Answered, setStep3Answered, stepData, setStepData } =
    useContext<ContextProps>(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...stepData?.step3?.state,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  /**
   *  Local State
   */
  const formFields = watch();

  useComponentDidUpdate(
    (prev) => {
      if (
        prev.allow_ratings !== formFields.allow_ratings ||
        prev.tags.length !== formFields.tags.length ||
        prev.comments_order !== formFields.comments_order ||
        prev.comments_moderation !== formFields.comments_moderation
      ) {
        storeData();
      }
    },
    { ...formFields }
  );

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
      setStep3Answered(true);
    } else {
      setStep3Answered(false);
    }
  }, [formFields, isValid, setStep3Answered]);

  useEffect(() => {
    storeData();
  }, [isValid]);

  const storeData = async () => {
    const isValidStore = await trigger();

    setStepData({
      step3: {
        solved: isValidStore,
        state: getValues(),
        error: !isValidStore,
      },
    });
  };

  const selectedOrderComments = useMemo(() => {
    return COMMENTS_ORDER_OPTIONS.find(
      ({ value }) => value === formFields.comments_order
    );
  }, [formFields.comments_order]);

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Add-ons</h4>
      <div className="mb-5 mt-1 relative">
        <label htmlFor="item-name" className="block text-sm font-medium mb-3">
          Comments moderation
        </label>
        <Controller
          name="comments_moderation"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field}>
              {COMMENTS_MODERATION_OPTIONS.map((commentsOption) => (
                <RadioGroup.Option
                  value={commentsOption.value}
                  key={commentsOption.value}
                >
                  {({ checked }) => (
                    <div className="flex mb-2.5 items-center cursor-pointer">
                      <div
                        className={classNames(
                          {
                            'flex items-center justify-center': checked,
                          },
                          'rounded-full w-4 h-4 mr-2.5 border border-blue-700 dark:border-gray-200'
                        )}
                      >
                        <AnimatePresence>
                          {checked && (
                            <motion.div
                              className="flex rounded w-2 h-2 bg-blue-700 dark:bg-gray-200"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="text-sm w-10 whitespace-nowrap">
                        {commentsOption.title}
                      </span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          )}
        />
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.comments_moderation ? `visible` : `hidden`}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500">
              {errors.comments_moderation?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">
                  Comments moderation is required.
                </motion.div>
              )}
            </span>
          </motion.div>
        </motion.div>
      </div>
      <div className="mb-5 relative">
        <label htmlFor="item-name" className="block text-sm font-medium mb-3">
          Order by
        </label>
        <Controller
          name="comments_order"
          control={control}
          render={({ field }) => (
            <Listbox {...field} as="div">
              <div className="relative inline-block mt-1">
                <Listbox.Button className="flex w-40 px-5 py-2.5 items-center border text-sm border-stone-700 dark:border-gray-200 rounded-lg justify-between">
                  {selectedOrderComments?.title}
                  <ArrowDownSIcon className="h-4 w-4 fill-stone-700 dark:fill-gray-200 flex-shrink-0" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 p-2 w-full right-0 origin-top-right rounded-lg text-gray-500 dark:text-gray-500 bg-white dark:bg-neutral-800 overflow-hidden shadow-lg">
                  {COMMENTS_ORDER_OPTIONS.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className=""
                      value={option.value}
                    >
                      {({ active, selected }) => (
                        <li
                          className={classNames(
                            {
                              'bg-neutral-200 dark:bg-neutral-800':
                                selected || active,
                            },
                            'cursor-pointer focus:outline-none text-sm flex items-center p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700'
                          )}
                        >
                          {option.title}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          )}
        />
      </div>
      <div className="mb-5 relative">
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3"
        >
          Allow ratings
        </label>
        <Controller
          name="allow_ratings"
          control={control}
          defaultValue={formFields.allow_ratings}
          render={({ field }) => (
            <Switch
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              checked={field.value}
              onChange={(value: boolean) => setValue('allow_ratings', value)}
              className={classNames(
                {
                  'bg-blue-600': formFields.allow_ratings,
                  'bg-gray-600': !formFields.allow_ratings,
                },
                'relative inline-flex h-6 w-11 items-center rounded-full'
              )}
            >
              <span
                className={classNames(
                  {
                    'translate-x-6': formFields.allow_ratings,
                    'translate-x-1': !formFields.allow_ratings,
                  },
                  'inline-block h-4 w-4 transform rounded-full bg-white'
                )}
              />
            </Switch>
          )}
        />
      </div>
      <div className="mb-5 relative">
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3"
        >
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          defaultValue={formFields.tags}
          rules={{ required: true }}
          render={({ field }) => <TagsSelect {...field} />}
        />
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.tags ? `visible` : `hidden`}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500 ">
              {errors.tags?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">
                  At least one tag is required.
                </motion.div>
              )}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectStep3;
