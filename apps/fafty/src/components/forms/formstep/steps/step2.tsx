import {
  useEffect,
  useContext,
  Suspense,
  lazy,
  useLayoutEffect,
  Context,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ContextProps } from '../context';

const SelectBlockchain = lazy(
  () => import('../../components/selectBlockchain')
);
const SelectCollection = lazy(
  () => import('../../components/selectCollection')
);

const CounterInput = lazy(
  () => import('../../components/counterInput')
);

const SelectStep2 = ({ Context }: { Context: Context<ContextProps> }) => {
  /**
   * Context Store
   */
  const { step2Answered, setStep2Answered, stepData, setStepData } =
    useContext<ContextProps>(Context);

  /**
   * React-Hook-Form hook
   */
  const {
    control,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      blockchain: stepData?.step2?.state?.blockchain || 'dfinity',
      collection_token: stepData?.step2?.state?.collection_token || 'none',
      supply_units: stepData?.step2?.state?.supply_units || 1,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formFields = watch();

  /**
   * Load data from context store on component mount and save data to context store on component unmount
   */
  useEffect(() => {
    if (isValid) {
      setStep2Answered(true);

      return () => {
        storeData();
      };
    }
  }, [isValid]);

  /**
   * Monitor User Input
   */
  // useEffect(() => {
  //   console.log(isValid);
  //   if (isValid) {
  //     setStep2Answered(true);
  //   }
  // }, [formFields, isValid, setStep2Answered]);

  const storeData = () => {
    if (isValid) {
      setStepData({
        step2: {
          solved: true,
          state: getValues(),
        },
      });
    }
  };

  console.log('values', getValues());

  return (
    <div className="flex flex-col">
      <h4 className="font-bold">Assosiation</h4>
      <div className="mb-5 mt-1 relative">
        
        <div className="flex justify-center">
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
              render={({ field }) => (
                <CounterInput {...field} current={field.value} />
              )}
            />
          </div>
        </div>
        <span className="text-red-500">
          {errors.supply_units?.type === 'required' && (
            <span role="alert">Units for supply is required.</span>
          )}
          {errors.supply_units?.type === 'min' && (
            <span role="alert">Minimum 1 unit.</span>
          )}
        </span>
      </div>
      <div className="my-3">
        <label
          htmlFor=""
          className="text-sm font-medium"
        >
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
            <SelectBlockchain {...field} current={field.value} />
          )}
        />
      </div>
      <label
        htmlFor=""
        className="text-sm font-bold"
      >
        Choose Collection
      </label>
      <p className="text-xs font-medium">
        This is the collection where your item will appear.
      </p>
      <Controller
        name="collection_token"
        control={control}
        defaultValue={formFields.collection_token}
        render={({ field }) => (
            <SelectCollection {...field} current={field.value} />
        )}
      />
    </div>
  );
};

export default SelectStep2;
