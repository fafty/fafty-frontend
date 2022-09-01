import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
  Suspense,
  CSSProperties,
} from 'react';
import Context from './context';
import { UploaderPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

interface ExistingFileProps {
  id: string;
  file_id: string;
  type: string;
  storage: string;
  position: number;
  size: number;
  filename: string;
  mime_type: string;
  src: string;
}

// interface FileProps {
//   id: string;
//   file_id?: string;
//   type: string;
//   position: number;
//   attachment?: {
//     id: string;
//     storage: string;
//     metadata: {
//       size: number;
//       filename: string;
//       mime_type: string;
//     };
//   };
//   meta?: {
//     existing: boolean;
//   };
// }

interface FileProps {
  id: string;
  storage: string;
  metadata: {
    size: number;
    filename: string;
    mime_type: string;
  };
}

interface UploaderProps {
  hasError?: boolean;
  loading?: boolean;
  type?: string;
  existingFiles?: ExistingFileProps[];
  allowedFileTypes?: string[];
  style?: CSSProperties;
  presignEndpoint?: string;
  onChange: (value: FileProps | FileProps[]) => void;
}

const Uploader = dynamic<UploaderProps>(
  () => import('@fafty-frontend/uploader').then((mod) => mod.Uploader),
  {
    ssr: false,
    loading: () => <UploaderPlaceholder />,
  }
);

const SelectStepper = (): JSX.Element => {
  /*
   * Form Store
   */
  const {
    step1Answered,
    step2Answered,
    finished,
    stepData: data,
    setStepData,
  } = useContext(Context);

  const [solutionProvided, setSolutionProvided] = useState(false);
  /*
   * Local Store
   */
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const allowSkip = false;

  const [components, setComponent] = useState({});
  const [view, setView] = useState<JSX.Element | null>(null);

  /*
   * Monitor Form Progress
   */
  useEffect(() => {
    // console.log('Monitor Form Progress - step1Answered', step1Answered);
    setSolutionProvided(false);
    if (activeStep === 0 && step1Answered) {
      setSolutionProvided(true);
      // console.log('Monitor Form Progress - setSolutionProvided true ');
    }
    if (activeStep === 1 && step2Answered) {
      setSolutionProvided(true);
    }
    if (activeStep === 2 - 1 && finished) {
      setSolutionProvided(true);
    }
  }, [activeStep, step1Answered, step2Answered, finished]);

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

  /*
   * Load Dynamic Content
   */
  useEffect(() => {
    loadComponent();
  }, [activeStep, loadComponent]);

  useEffect(() => {
    if (!data?.asset?.id) {
      setActiveStep(0);
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

  const handleNext = (activeStep: number, steps: number | any[]) => {
    if (activeStepNumeric === 2 && finished) {
      alert('Finished! You can now submit your form');
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

      if (setStepData) {
        setStepData({
          asset: currentFile,
          step1: {
            solved: false,
            state: {
              name: currentFile?.metadata?.filename || '',
              description: null,
              unlockable_content: null,
              adult_content: false,
            },
          },
        });
      }
    },
    [setStepData]
  );

  const activeStepNumeric = activeStep + 1;

  return (
    <>
      <div
        className={classNames('mt-4 lg:mt-0 lg:row-span-3', {
          'lg:col-[-2_/2]': !data?.asset?.id,
          'lg:col-1': !!data?.asset?.id,
        })}
      >
        <div className="rounded-lg border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow ">
          <div className="sticky top-[80px] mx-auto h-[500px]">
            <Uploader hasError={false} onChange={onChangeFile} />
          </div>
        </div>
      </div>

      {!!data?.asset?.id && (
        <div className="py-10 lg:pl-4 lg:pt-6 lg:pb-16 lg:col-start-2 lg:col-span-2 lg:border-l lg:border-gray-200 dark:lg:border-neutral-700 lg:pr-8">
          <div>Create NFT</div>
          <div className="box mt-1 p-1">
            <div className="mt-3  mb-10 alignitemscenter">
              <div className="flex flex-row">
                <div className="flex uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight">
                  Step: {activeStep + 1} of 3
                </div>
                <div className="flex ml-auto items-center md:w-64">
                  <div className="w-full bg-white rounded-full mr-2">
                    <div
                      className="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                      style={{ width: `${activeStepNumeric * (100 / 3)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs w-10 text-gray-600 whitespace-nowrap">
                    {(activeStepNumeric * (100 / 3)).toFixed(2)} %
                  </span>
                </div>
              </div>
            </div>
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
                className="text-lg font-light"
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
                >
                  {/* Active Step  */}
                  {activeStep <= 2 ? (
                    <Fragment>
                      <Suspense fallback="Loading Form View..">{view}</Suspense>
                      <div className="flex pt-2">
                        {activeStep > 0 && (
                          <>
                            <button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className="mr-1"
                            >
                              Back
                            </button>
                          </>
                        )}
                        <div />
                        {isStepOptional(activeStep) && (
                          <>
                            {allowSkip && (
                              <button className="mr-1" onClick={handleSkip}>
                                Skip
                              </button>
                            )}
                          </>
                        )}
                        <button
                          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400"
                          disabled={!solutionProvided}
                          onClick={() => handleNext(activeStep, 2)}
                        >
                          {activeStepNumeric === 3 ? 'Save' : 'Next'}
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <></>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectStepper;
