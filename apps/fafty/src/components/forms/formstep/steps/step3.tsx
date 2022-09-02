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
  COMMENTS_MODERATION_OPTIONS,
  COMMENTS_ORDER_OPTIONS,
} from '../constants';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownSIcon } from '@remixicons/react/line';
import { ContextProps } from '../context';

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
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      ...stepData?.step3?.state,
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
      setStep3Answered(true);
    }
  }, [formFields, isValid, setStep3Answered]);

  const storeData = () => {
    setStepData({
      step3: {
        solved: true,
        state: getValues(),
      },
    });
  };

  const selectedOrderComments = useMemo(() => {
    return COMMENTS_ORDER_OPTIONS.find(
      ({ value }) => value === formFields.comments_order
    );
  }, [formFields.comments_order]);

  return (
    <>
      <div>
        <div className="mb-5 relative">
          <label
            htmlFor="item-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3"
          >
            Comments moderation
          </label>
          <Controller
            name="comments_moderation"
            control={control}
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
                            'rounded-full w-4 h-4 mr-2.5 border border-white',
                            {
                              'flex items-center justify-center': checked,
                            }
                          )}
                        >
                          <AnimatePresence>
                            {checked && (
                              <motion.div
                                className="flex rounded w-2 h-2 bg-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                        <span className="text-sm w-10 text-gray-200 whitespace-nowrap">
                          {commentsOption.title}
                        </span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="item-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3"
          >
            Order by
          </label>
          <Controller
            name="comments_order"
            control={control}
            render={({ field }) => (
              <Listbox {...field} as="div">
                <div className="relative mt-1">
                  <Listbox.Button className="flex w-40 px-5 py-2.5 items-center border text-sm border-gray-200 rounded-xl justify-between">
                    {selectedOrderComments?.title}
                    <ArrowDownSIcon className="h-4 w-4 fill-gray-200 flex-shrink-0" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-2 z-10 w-32 overflow-hidden p-2 rounded-lg text-gray-500 dark:text-gray-500 bg-white dark:bg-neutral-800 ">
                    {COMMENTS_ORDER_OPTIONS.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className="w-32"
                        value={option.value}
                      >
                        {({ active, selected }) => (
                          <li className="cursor-pointer focus:outline-none text-sm flex items-center p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
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
                className={`${
                  formFields.allow_ratings ? 'bg-blue-600' : 'bg-gray-600'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    formFields.allow_ratings ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            )}
          />
        </div>
      </div>
      {!step3Answered && (
        <div>
          <p>
            When all answers are correct the next step button will be enabled!
          </p>
        </div>
      )}
    </>
  );
};

export default SelectStep3;
