import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useCallback,
  Suspense,
  CSSProperties,
  useMemo,
} from 'react';
import Context from './context';
import { UploaderPlaceholder } from '@fafty-frontend/shared/ui';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import api from '../../../api';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactComponent as CompleteIlustation } from '../../../assets/complete.svg';
import Link from 'next/link';

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
  OnGenetatedThumbnail: () => void;
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
    step3Answered,
    step1Errored,
    step2Errored,
    step3Errored,
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

  const submitData = useCallback(async () => {
    try {
      await api.post('nft', {
        nft: {
          asset: data?.asset,
          ...data?.step1.state,
          ...data?.step2.state,
          ...data?.step3.state,
        },
      });

      setFinished?.(true);
    } catch (e) {
      console.log(e);
    }
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
              adult_content: false,
            },
            solved: false,
            error: false,
          },
        });
      }
    },
    [setStepData]
  );

  interface StepbarProps {
    name: string;
    active?: boolean;
    completed?: boolean;
    optional?: boolean;
    skipped?: boolean;
    error?: boolean;
  }

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

  const StepsBar = ({ steps }: { steps: StepbarProps[] }) => {
    return (
      <div className="w-full pb-4">
        {/* {JSON.stringify(data)} */}
        <div className="flex justify-center w-full">
          {steps.map((step, index) => (
            <div className="w-1/4" key={index}>
              <div
                className={classNames(
                  {
                    'text-blue-600': activeStep === index,
                  },
                  'text-xs text-center font-bold'
                )}
              >
                {step.name}
              </div>
              <div className="relative mt-2">
                {index !== 0 && (
                  <div
                    className="absolute flex align-center items-center align-middle content-center"
                    style={{
                      width: 'calc(100% - 1.5rem - 1rem)',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                      <div
                        className={classNames(
                          {
                            'bg-blue-600': activeStep >= index,
                            'bg-gray-200': activeStep < index,
                          },
                          "w-full h-[2px] rounded"
                        )}
                      ></div>
                    </div>
                  </div>
                )}
                <div
                  onClick={() => setActiveStep(index)}
                  className={classNames(
                    {
                      'bg-blue-700': !step.error,
                      'bg-red-600': step.error
                    },
                    "w-6 h-6 mx-auto cursor-pointer text-white rounded-full text-lg  flex items-center"
                  )}
                >
                  {step.completed && (
                    <CheckIcon strokeWidth={2} className="w-4 h-4 mx-auto" />
                  )}
                  {step.error && (
                    <ExclamationCircleIcon
                      strokeWidth={2}
                      className="w-5 h-5 mx-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
              Congratulations! Your nft is uploaded!
            </div>
            <div className="mt-4">
              <Link href="/nft">
                <a className="relative inline-block text-center bg-blue-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-blue-700 mr-4">
                  View your nft
                </a>
              </Link>
              <Link href="/nft/create">
                <a className="relative inline-block text-center bg-blue-600 border border-transparent rounded-md py-2 px-4 font-medium text-white hover:bg-blue-700">
                  Continue with created Nft for publish
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
            <StepsBar steps={StepsList} />
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
                    <Fragment>
                      <div className="p-2">
                        <Suspense fallback="Loading Form View..">
                          {view}
                        </Suspense>
                      </div>
                    </Fragment>
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
              {activeStep > 0 && (
                <>
                  <button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-500 hover:bg-gray-400"
                  >
                    Back
                  </button>
                </>
              )}
              <div />
              {isStepOptional(activeStep) && (
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
              <button
                className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-600 hover:bg-blue-500"
                disabled={buttonNextDisabled}
                onClick={() => handleNext(activeStep, 2)}
              >
                {activeStepNumeric === 3 ? 'Save' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectStepper;
