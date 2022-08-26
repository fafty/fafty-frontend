import {
    useEffect,
    useContext,
    Suspense,
    lazy,
    useLayoutEffect,
    Context
  } from 'react';
  import { Controller, useForm } from 'react-hook-form';
  import { motion } from 'framer-motion';
  import { ContextProps } from '../context';
  
  const SelectBlockchain = lazy(() => import('../../components/selectBlockchain'));
  const SelectCollection = lazy(() => import('../../components/selectCollection'));

  
  const SelectStep2 = ({ Context }: { Context: Context<ContextProps> }) => {
    /**
     * Context Store
     */
     const {
      step2Answered,
      setStep2Answered,
      stepData,
      setStepData
    } = useContext<ContextProps>(Context);
  
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
      defaultValues: {
        blockchain_name: stepData?.step2?.state?.blockchain_name || 'dfinity',
        collection_token: stepData?.step2?.state?.collection_token ||  'none',
        supply_units: stepData?.step2?.state?.supply_units || 1
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
    });  
  
    const formFields = watch();

  
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
        setStep2Answered(true);
      }
    }, [formFields, isValid, setStep2Answered]);
  
    const storeData = () => {
      if (step2Answered) {
        setStepData({
          step2: {
            solved: true,
            state: getValues(),
          }
        });
      };
    };
  
    return (
      <>
        <div>
          <motion.div className="mb-5 relative">
            <label
              htmlFor="item-supply-units"
              className="block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              Supply
            </label>
            <input
              type="number"
              id="item-supply-units"
              className={`${
                errors.supply_units
                  ? 'border-red-500'
                  : 'border-gray-200 dark:border-neutral-800'
              } text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12`}
              placeholder="Enter of supply units"
              defaultValue={formFields.supply_units}
              min="1"
              {...(errors.supply_units && { 'aria-invalid': true })}
              {...register('supply_units', {
                required: true,
                min: 1,
              })}
            />
            <span className="text-red-500">
              {errors.supply_units?.type === 'required' && (
                <span role="alert">Units for supply is required.</span>
              )}
              {errors.supply_units?.type === 'min' && (
                <span role="alert">Minimum 1 unit.</span>
              )}
            </span>
          </motion.div>
            <Controller
              name="blockchain_name"
              control={control}
              defaultValue={formFields.blockchain_name}
              render={({ field }) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <SelectBlockchain {...field} current={field.value} />
                </Suspense>
              )}
            />
          <label
            htmlFor=""
            className="text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Collections
          </label>
            <Controller
              name="collection_token"
              control={control}
              defaultValue={formFields.collection_token}
              render={({ field }) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <SelectCollection {...field} current={field.value} />
                </Suspense>
              )}
            />
        </div>
  
        {!step2Answered && (
          <div>
            <p>
              When all answers are correct the next step button will be enabled!
            </p>
          </div>
        )}
      </>
    );
  };
  
  export default SelectStep2;
  