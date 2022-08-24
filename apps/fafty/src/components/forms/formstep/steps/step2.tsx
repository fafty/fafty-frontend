import {
    useState,
    useEffect,
    useContext,
    useCallback,
    ChangeEventHandler,
    Suspense,
    lazy,
    useLayoutEffect
  } from 'react';
  import { Controller, useForm } from 'react-hook-form';
  import { EditorPlaceholder } from '@fafty-frontend/shared/ui';
  import classNames from 'classnames';
  import dynamic from 'next/dynamic';
  import { motion } from 'framer-motion';
  import { ContextProps, Step2Props } from '../context';
  
  const SelectBlockchain = lazy(() => import('../../components/selectBlockchain'));
  const SelectCollection = lazy(() => import('../../components/selectCollection'));

  
  const SelectStep2 = ({ Context }: { Context: ContextProps }) => {
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
        blockchain_name: 'dfinity',
        collection_token: 'none',
        supply_units: 1
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
    });
  
    /**
     *  Local State
     */
    // const [loading, setLoading] = useState(false);
    // const [adult_content, setAdultContent] = useState(false);
  
  
    const formFields = watch();
  
    const implementStoredData = useCallback(() => {
      if (step2Answered && stepData) {
        console.log('implementStoredData2', stepData);
        const {
          step2: {
            state: { supply_units, blockchain_name, collection_token },
          },
        } = stepData;
        setValue('supply_units', supply_units, {
          shouldValidate: false
        });
        setValue('blockchain_name', blockchain_name, {
          shouldValidate: false
        });
        setValue('collection_token', collection_token, {
          shouldValidate: false
        });
      }
     
    }, [stepData, setValue, step2Answered]);
  
    /**
     * Load data from context store on component mount and save data to context store on component unmount
     */
     useLayoutEffect(() => {
      implementStoredData();
      return () => {
        console.log('useEffect step2Answered', step2Answered);
        storeData();
      };
    }, []);
  
    /**
     * Monitor User Input
     */
    useEffect(() => {
      // Did user provide a solution? Then enable next button
      // if (isValid) {
      //   setStep2Answered(true);
      //   if (step2Answered === false) {
      //     setStep2Answered(true);
      //   }
      // } else {
      //   if (step2Answered) {
      //     setStep2Answered(false);
      //   }
      // }
      if (isValid) {
        setStep2Answered(true);
      }
    }, [formFields, isValid, setStep2Answered]);
  
    const storeData = () => {
      if (step2Answered) {
        const collected = {
          step2: {
            solved: true,
            state: getValues(),
          }
        };
        const result = {
          ...stepData,
          ...collected
        };
        setStepData(result);
        console.log('Store Step 2', collected);
        console.log('after store data', stepData);
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
  