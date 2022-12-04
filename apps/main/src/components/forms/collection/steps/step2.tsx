import { motion } from 'framer-motion'
import { useEffect, useContext, useLayoutEffect, Context } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DragAndDropAssets from '../../common/dragAndDropAssets'
import { childVariants, variants } from '../constants'
import {
  CollectionFormContextType,
  CollectionFormStep2Type
} from '@fafty/shared/types'

const SelectStep2 = ({
  Context
}: {
  Context: Context<CollectionFormContextType>
}) => {
  /**
   * Context Store
   */
  const { setStep2Answered, stepData, setStepData } =
    useContext<CollectionFormContextType>(Context)

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
      assets: stepData?.step2?.state?.assets || []
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true
  } as never)

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
    console.log('formFields.assets ', formFields.assets)
  }, [formFields, isValid, setStep2Answered])

  const storeData = async () => {
    const isValidStore = await trigger()

    setStepData({
      step2: {
        solved: isValidStore,
        state: getValues() as CollectionFormStep2Type,
        error: !isValidStore
      }
    })
  }

  return (
    <div className="col-span-2">
      <div className="flex flex-col">
        <h4 className="font-bold">Assets</h4>
        <label htmlFor="" className="text-sm font-bold">
          Add Assets to this collection
        </label>
        <p className="text-xs font-medium">This is th..........</p>
        <Controller
          name="assets"
          control={control}
          defaultValue={formFields.assets}
          rules={{ required: true }}
          render={({ field }) => (
            <DragAndDropAssets
              onDragStart={() => console.log('onDragStart')}
              onDragEnd={() => console.log('onDragEnd')}
              hasError={errors.assets?.type === 'required'}
              {...field}
              initial={field.value}
            />
          )}
        />
        <motion.div
          initial={'hidden'}
          variants={variants}
          animate={errors.assets ? 'visible' : 'hidden'}
        >
          <motion.div variants={childVariants} className="min-h-[24px]">
            <span className="text-red-500">
              {errors.assets?.type === 'required' && (
                <motion.div variants={childVariants} role="alert">
                  Assets choose is required.
                </motion.div>
              )}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SelectStep2
