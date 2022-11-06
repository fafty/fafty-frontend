import {
  useEffect,
  useContext,
  ChangeEventHandler,
  Suspense,
  useLayoutEffect,
  Context,
  useState,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EditorPlaceholder } from '@fafty/shared/ui'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { childVariants, variants } from '../constants'
import classNames from 'classnames'
import { EditorState } from 'lexical'
import { ContextProps, Step1Props } from '../types'
import { useComponentDidUpdate } from '@fafty/usehooks'

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
  () => import('@fafty/text/editor').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorPlaceholder header={true} />,
  }
)

const SelectStep1 = ({ Context }: { Context: Context<ContextProps> }) => {
  const [isMounted, setIsMounted] = useState(false)
  /**
   * Context Store
   */
  const { setStep1Answered, stepData, setStepData } =
    useContext<ContextProps>(Context)

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
    // shouldFocusError: true,
    defaultValues: {
      ...stepData?.step1?.state,
    },
  } as never)

  /**
   *  Local State
   */
  const formFields = watch()

  useComponentDidUpdate(
    (prevProps) => {
      if (!prevProps?.media?.id && stepData?.media?.id) {
        reset({
          name: stepData.step1.state.name,
        })
      }
    },
    {
      media: stepData?.media,
    }
  )

  /**
   * Load data from context store on component mount and save data to context store on component unmount
   */
  useLayoutEffect(() => {
    return () => {
      storeData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  /**
   * Monitor User Input
   */
  useEffect(() => {
    if (isValid) {
      setStep1Answered(true)
    } else {
      setStep1Answered(false)
    }
  }, [formFields, isValid, setStep1Answered])

  const storeData = async () => {
    const isValidForm = await trigger()

    setStepData({
      step1: {
        state: getValues() as Step1Props,
        solved: isValidForm,
        error: !isValidForm,
      },
    })
  }

  useEffect(() => {
    if (stepData?.media?.id && isMounted) {
      setStepData({
        step1: {
          state: getValues() as Step1Props,
          solved: isValid,
          error: !isValid,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Infomation</h4>
      <div className="relative mb-5 mt-1">
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
                'mt-1 h-12 w-full rounded-md border p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:bg-neutral-900/90 dark:text-gray-100',
                {
                  'border-red-500': errors.name,
                  'border-gray-200 dark:border-neutral-800': !errors.name,
                }
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
          animate={errors.name ? 'visible' : 'hidden'}
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
      <div className="my-3">
        <div className="mb-2 flex-row">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Unlockable Content
          </div>
          <div className="block truncate text-xs text-gray-400">
            Include unlockable content that can only be revealed by the owner of
            the item.
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
  )
}

export default SelectStep1
