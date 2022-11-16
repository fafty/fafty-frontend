import { useEffect, useContext, useLayoutEffect, useMemo, Context } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Switch, RadioGroup, Listbox } from '@headlessui/react'
import {
  childVariants,
  COMMENTS_MODERATION_OPTIONS,
  COMMENTS_ORDER_OPTIONS,
  variants
} from '../constants'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownSIcon } from '@remixicons/react/line'
import TagsSelect from '../../common/tagsSelect'
import { useComponentDidUpdate } from '@fafty/usehooks'
import { ContextProps } from '../types'

const SelectStep3 = ({ Context }: { Context: Context<ContextProps> }) => {
  /**
   * Context Store
   */
  const { setStep3Answered, stepData, setStepData } =
    useContext<ContextProps>(Context)

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...stepData?.step3?.state
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true
  })

  /**
   *  Local State
   */
  const formFields = watch()

  useComponentDidUpdate(
    (prev) => {
      if (
        prev.allow_ratings !== formFields.allow_ratings ||
        prev.tags.length !== formFields.tags.length ||
        prev.comments_order !== formFields.comments_order ||
        prev.comments_moderation !== formFields.comments_moderation
      ) {
        storeData()
      }
    },
    { ...formFields }
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

  /**
   * Monitor User Input
   */
  useEffect(() => {
    if (isValid) {
      setStep3Answered(true)
    } else {
      setStep3Answered(false)
    }
  }, [formFields, isValid, setStep3Answered])

  useEffect(() => {
    storeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  const storeData = async () => {
    const isValidStore = await trigger()

    setStepData({
      step3: {
        solved: isValidStore,
        state: getValues(),
        error: !isValidStore
      }
    })
  }

  const selectedOrderComments = useMemo(() => {
    return COMMENTS_ORDER_OPTIONS.find(
      ({ value }) => value === formFields.comments_order
    )
  }, [formFields.comments_order])

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Add-ons</h4>
      <div className="grid grid-cols-2">
        <div className="relative mb-5 mt-1">
          <label htmlFor="item-name" className="mb-2 block text-sm font-medium">
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
                      <div className="mb-2 flex cursor-pointer items-center">
                        <div
                          className={classNames(
                            {
                              'flex items-center justify-center': checked
                            },
                            'mr-2.5 h-4 w-4 rounded-full border border-blue-700 dark:border-gray-200'
                          )}
                        >
                          <AnimatePresence>
                            {checked && (
                              <motion.div
                                className="flex h-2 w-2 rounded bg-blue-700 dark:bg-gray-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                        <span className="w-10 whitespace-nowrap text-sm">
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
            animate={errors.comments_moderation ? 'visible' : 'hidden'}
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
        <div className="relative mb-5">
          <label htmlFor="item-name" className="mb-2 block text-sm font-medium">
            Order by
          </label>
          <Controller
            name="comments_order"
            control={control}
            render={({ field }) => (
              <Listbox {...field} as="div">
                <div className="relative mt-1 flex w-full">
                  <Listbox.Button className="flex w-full items-center justify-between rounded-md border border-blue-600 px-5 py-2.5 text-sm">
                    {selectedOrderComments?.title}
                    <ArrowDownSIcon className="h-4 w-4 flex-shrink-0 fill-stone-700 dark:fill-gray-200" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute top-full right-0 left-0 z-10 overflow-hidden rounded-lg bg-white p-2 text-gray-500 dark:bg-neutral-800 dark:text-gray-500 ">
                    {COMMENTS_ORDER_OPTIONS.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className=""
                        value={option.value}
                      >
                        {({ active, selected }) => (
                          <div
                            className={classNames(
                              {
                                'bg-neutral-200 dark:bg-neutral-800':
                                  selected || active
                              },
                              'm-2 flex cursor-pointer items-center p-2 text-sm text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700'
                            )}
                          >
                            {option.title}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
        </div>
      </div>
      <div className="relative mb-5">
        <label
          htmlFor="item-name"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-100"
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
                  'bg-gray-600': !formFields.allow_ratings
                },
                'relative inline-flex h-6 w-11 items-center rounded-full'
              )}
            >
              <span
                className={classNames(
                  {
                    'translate-x-6': formFields.allow_ratings,
                    'translate-x-1': !formFields.allow_ratings
                  },
                  'inline-block h-4 w-4 transform rounded-full bg-white'
                )}
              />
            </Switch>
          )}
        />
      </div>
      <div className="relative mb-5">
        <label
          htmlFor="item-name"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-100"
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
          animate={errors.tags ? 'visible' : 'hidden'}
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
  )
}

export default SelectStep3
