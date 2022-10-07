import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  Suspense,
  useMemo,
} from 'react';
import Context from './context';
import { UploaderPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { ReactComponent as CompleteIlustation } from '../../../assets/complete.svg';
import Link from 'next/link';
import { FileProps, Props, UploaderProps } from './types';
import StepsBar from '../common/stepsBar';

const Uploader = dynamic<UploaderProps>(
  () => import('@fafty-frontend/uploader').then((mod) => mod.Uploader),
  { ssr: false, loading: () => <UploaderPlaceholder /> }
);

const FormAsset = ({ baseData, onSubmit, submiting }: Props): JSX.Element => {
  /*
   * Form Store
   */
  const {
    step1Answered,
    step2Answered,
    step3Answered,
    finished,
    stepData: data,
    setStepData,
    setFinished,
  } = useContext(Context);

  /*
   * Local Store
   */
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const allowSkip = false;

  const [components, setComponent] = useState({});
  const [view, setView] = useState<JSX.Element | null>(null);

  const isDisabledNextStep = useMemo(() => {
    return data?.step1.error || data?.step2.error || data?.step3.error;
  }, [data]);

  const loadComponent = useCallback(async () => {
    const StepView = `step${activeStep + 1}`;
    if (!components[StepView as keyof typeof components]) {
      const { default: View } = await import(`./steps/${StepView}`);

      const Component = <View Context={Context} />;

      setComponent({ ...components, [StepView]: Component });
      setView(Component);
    } else {
      setView(components[StepView as keyof typeof components]);
    }
  }, [activeStep, components, setComponent]);

  const [onlyUploader, setOnlyUploader] = useState(true);
  /*
   * Load Dynamic Content
   */
  useEffect(() => {
    loadComponent();
  }, [activeStep, loadComponent]);

  useEffect(() => {
    if (!data?.asset?.id) {
      setActiveStep(0);
      setOnlyUploader(true);
    }
  }, [data?.asset?.id]);

  /*
   * Step Management
   */
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const submitData = useCallback(() => {
    data &&
      onSubmit({
        asset: data.asset,
        ...data.step1.state,
        ...data.step2.state,
        ...data.step3.state,
      }).then((e) => {
        setFinished?.(true);
      });
  }, [data]);

  const handleNext = (activeStep: number, steps: number | any[]) => {
    if (activeStepNumeric === 3 && step3Answered) {
      return submitData();
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const onChangeFile = useCallback(
    (values: FileProps | FileProps[]) => {
      const currentFile = Array.isArray(values) ? values[0] : values;
      const formattedFileName = (currentFile?.metadata?.filename || '')
        .replace(/[-_%]/g, '')
        .replace(/(.*)\.(.*?)$/, '$1')
        .replace(/^ +| +$|( ) +/g, '$1');

      if (setStepData) {
        setStepData({
          asset: currentFile,
          step1: {
            state: {
              name: formattedFileName,
              description: null,
              unlockable_content: null,
              sensitive_content: false,
            },
            solved: false,
            error: false,
          },
        });
      }
    },
    [setStepData]
  );

  console.log(data?.step1.error);

  const StepsList = [
    {
      name: 'Informations',
      active: activeStep === 0,
      completed: data?.step1.solved,
      optional: false,
      skipped: isStepSkipped(0),
      error: data?.step1.error,
    },
    {
      name: 'Assosiation',
      active: activeStep === 1,
      completed: data?.step1.solved,
      optional: true,
      skipped: isStepSkipped(1),
      error: data?.step2.error,
    },
    {
      name: 'Add-ons',
      active: activeStep === 2,
      completed: data?.step1.solved,
      optional: false,
      skipped: isStepSkipped(2),
      error: data?.step3.error,
    },
  ];

  const activeStepNumeric = activeStep + 1;

  const buttonNextDisabled = useMemo(() => {
    if (activeStepNumeric === 3) {
      return !(step1Answered && step2Answered && step3Answered);
    }

    if (activeStepNumeric === 2) {
      return !step2Answered;
    }

    return !step1Answered;
  }, [step1Answered, step2Answered, step3Answered, activeStepNumeric]);

  if (finished) {
    return (
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          variants={{
            initial: {
              height: 'auto',
            },
            animate: {
              height: 'auto',
              transition: {
                when: 'beforeChildren',
              },
            },
            exit: {
              height: 'auto',
              transition: {
                when: 'afterChildren',
              },
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          key={activeStep}
          className="flex flex-1 justify-center"
        >
          <motion.div
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            }}
            className="flex flex-col justify-center items-center"
          >
            <div className="justify-center mb-5">
              <CompleteIlustation width={300} height={300} />
            </div>
            <div className="text-lg font-bold">
              Congratulations! Your asset is uploaded!
            </div>
            <div className="mt-4">
              <Link href="/nft">
                <a className="relative inline-block text-center bg-blue-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-blue-700 mr-4">
                  View your asset
                </a>
              </Link>
              <Link href="/nft/create">
                <a className="relative inline-block text-center bg-blue-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-blue-700">
                  Continue with created asset for publish Nft
                </a>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col w-full h-[calc(65vh_-_5px)]">
        {!onlyUploader && (
          <div className="flex mx-auto w-full sticky top-0 z-1 bg-slate-50 dark:bg-neutral-800 shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)]">
            <StepsBar
              active={activeStep}
              steps={StepsList}
              setActive={setActiveStep}
              disabled={!!isDisabledNextStep}
            />
          </div>
        )}
        <div
          className={classNames(
            {
              'md:grid grid-cols-[minmax(300px,_1fr)_300px]': !onlyUploader,
              'relative flex flex-1 flex-row': onlyUploader,
            },
            'gap-x-4 h-auto overflow-y-auto'
          )}
        >
          {!onlyUploader && (
            <AnimatePresence exitBeforeEnter={true}>
              <motion.div
                variants={{
                  initial: {
                    height: 'auto',
                  },
                  animate: {
                    height: 'auto',
                    transition: {
                      when: 'beforeChildren',
                    },
                  },
                  exit: {
                    height: 'auto',
                    transition: {
                      when: 'afterChildren',
                    },
                  },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                key={activeStep}
                className=""
              >
                <motion.div
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    animate: {
                      opacity: 1,
                    },
                    exit: {
                      opacity: 0,
                    },
                  }}
                  className=""
                >
                  {activeStep <= 2 && (
                    <div className="p-2">
                      <Suspense fallback="Loading Form View..">{view}</Suspense>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
          <div
            className={classNames(
              {
                'w-full': onlyUploader,
                'max-w-[20rem] max-h-[20rem]': !onlyUploader,
              },
              'flex flex-1 sticky top-5 mx-auto h-full'
            )}
          >
            <Uploader
              hasError={false}
              onChange={onChangeFile}
              OnGenetatedThumbnail={() => {
                setOnlyUploader(false);
              }}
            />
          </div>
        </div>
        {!onlyUploader && (
          <div className="flex justify-end sticky bottom-0 pt-4 bg-slate-50 dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700">
            <div className="flex gap-x-2">
              {!submiting && activeStep > 0 && (
                <>
                  <button
                    disabled={activeStep === 0 || isDisabledNextStep}
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-500 hover:bg-gray-400"
                  >
                    Back
                  </button>
                </>
              )}
              <div />
              {!submiting && isStepOptional(activeStep) && (
                <>
                  {allowSkip && (
                    <button
                      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-600 hover:bg-blue-500"
                      onClick={handleSkip}
                    >
                      Skip
                    </button>
                  )}
                </>
              )}
              {submiting ? (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-600 hover:bg-blue-500 transition ease-in-out duration-150 cursor-not-allowed"
                  disabled
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-600 hover:bg-blue-500"
                  disabled={buttonNextDisabled || isDisabledNextStep}
                  onClick={() => handleNext(activeStep, 2)}
                >
                  {activeStepNumeric === 3 ? 'Save' : 'Next'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormAsset;
