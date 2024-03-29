import { motion } from 'framer-motion'
import { useEffect, useContext, lazy, useLayoutEffect, Context } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { childVariants, variants } from '../constants'
import { AssetFormContextType } from '@fafty/shared/types'

const SelectBlockchain = lazy(() => import('../../common/selectBlockchain'))
const SelectCollection = lazy(() => import('../../common/selectCollection'))

const CounterInput = lazy(() => import('../../common/counterInput'))

const SelectStep2 = ({
  Context
}: {
  Context: Context<AssetFormContextType>
}) => {
  /**
   * Context Store
   */
  const { setStep2Answered, stepData, setStepData } =
    useContext<AssetFormContextType>(Context)

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    watch,
    getValues,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      blockchain: stepData?.step2?.state?.blockchain || 'dfinity',
      collection_token: stepData?.step2?.state?.collection_token,
      supply_units: stepData?.step2?.state?.supply_units || 1
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true
  })

  const formFields = watch()
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
    storeData()

    if (isValid) {
      setStep2Answered(true)

      return () => {
        storeData()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  /**
   * Monitor User Input
   */
  useEffect(() => {
    if (isValid) {
      setStep2Answered(true)
    } else {
      setStep2Answered(false)
    }
  }, [formFields, isValid, setStep2Answered])

  const storeData = async () => {
    const isValidStore = await trigger()

    setStepData({
      step2: {
        solved: isValidStore,
        state: getValues(),
        error: !isValidStore
      }
    })
  }

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Association</h4>
      <div className="relative mb-5 mt-1">
        <div className="justify-left flex">
          <div className="flex flex-col">
            <label
              htmlFor="item-supply-units"
              className="block text-sm font-medium"
            >
              Supply
            </label>
            <Controller
              name="supply_units"
              control={control}
              defaultValue={formFields.supply_units}
              rules={{ required: true, min: 1, max: 100 }}
              render={({ field }) => (
                <CounterInput
                  {...field}
                  initial={field.value}
                  hasError={errors.supply_units as unknown as boolean}
                />
              )}
            />
          </div>
        </div>
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.supply_units ? 'visible' : 'hidden'}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500 ">
              {errors.supply_units?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">
                  Name is required.
                </motion.div>
              )}
              {errors.supply_units?.type === 'min' && (
                <motion.div variants={childVariants} role="alert">
                  Minimum 1 unit.
                </motion.div>
              )}
              {errors.supply_units?.type === 'max' && (
                <motion.div variants={childVariants} role="alert">
                  Maximum 100 unit.
                </motion.div>
              )}
            </span>
          </motion.div>
        </motion.div>
      </div>
      <div className="my-3">
        <label htmlFor="" className="text-sm font-medium">
          Choose Blockchain
        </label>
        <p className="text-xs font-medium">
          This is the collection where your item will appear.
        </p>
        <Controller
          name="blockchain"
          control={control}
          defaultValue={formFields.blockchain}
          render={({ field }) => (
            <SelectBlockchain {...field} initial={field.value} />
          )}
        />
      </div>
      <label htmlFor="" className="text-sm font-bold">
        Choose Collection
      </label>
      <p className="text-xs font-medium">
        This is the collection where your item will appear.
      </p>
      <Controller
        name="collection_token"
        control={control}
        defaultValue={formFields.collection_token}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectCollection {...field} initial={field.value} />
        )}
      />
      <motion.div
        initial={'hidden'}
        variants={variants}
        animate={errors.collection_token ? 'visible' : 'hidden'}
      >
        <motion.div variants={childVariants} className="min-h-[24px]">
          <span className="text-red-500">
            {errors.collection_token?.type === 'required' && (
              <motion.div variants={childVariants} role="alert">
                Collection choose is required.
              </motion.div>
            )}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SelectStep2
