import {
  useEffect,
  useState,
  useContext,
  useCallback,
  Suspense,
  useMemo
} from 'react'
import Context from './context'
import { UploaderPlaceholder } from '@fafty/shared/ui'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import { ReactComponent as CompleteIllustration } from '../../../assets/complete.svg'
import {
  UploaderPropsType,
  FileType,
  CollectionFormMainPropsType
} from '@fafty/shared/types'
import StepsBar from '../common/stepsBar'

const Uploader = dynamic<UploaderPropsType>(
  () => import('@fafty/uploader').then((mod) => mod.Uploader),
  { ssr: false, loading: () => <UploaderPlaceholder /> }
)

/**
 * @name FormCollection - Form to create or edit a collection
 * @description Form to create or edit a collection with 4 steps
 * @param {Props} props
 * @param {boolean} props.submitting - Submitting state.
 * @param {AssetMedia} props.defaultCover - Default cover for collection.
 * @param {() => void} props.onSubmit - Callback function to submit the form.
 * @returns {JSX.Element}
 * @category Components / Forms
 * @example
 * <FormCollection submitting={submitting} onSubmit={onSubmit} />
 */
const FormCollection = ({
  onSubmit,
  submitting,
  defaultCover
}: CollectionFormMainPropsType): JSX.Element => {
  /*
   * Form Store
   */
  const {
    // step1Answered,
    // step2Answered,
    // step3Answered,
    step4Answered,
    finished,
    stepData: data,
    setStepData,
    setFinished,
    clearState
  } = useContext(Context)

  /*
   * Local Store
   */
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const allowSkip = false

  const [components, setComponent] = useState({})
  const [view, setView] = useState<JSX.Element | null>(null)

  const isDisabledNextStep = useMemo(() => {
    return (
      data?.step1.error ||
      data?.step2.error ||
      data?.step3.error ||
      data?.step4.error
    )
  }, [data])

  const loadComponent = useCallback(async () => {
    const StepView = `step${activeStep + 1}`
    if (!components[StepView as keyof typeof components]) {
      const { default: View } = await import(`./steps/${StepView}`)

      const Component = <View Context={Context} />

      setComponent({ ...components, [StepView]: Component })
      setView(Component)
    } else {
      setView(components[StepView as keyof typeof components])
    }
  }, [activeStep, components, setComponent])

  const [onlyUploader, setOnlyUploader] = useState(!data?.cover?.id)

  /*
   * Load Dynamic Content
   */
  useEffect(() => {
    loadComponent()
  }, [activeStep, loadComponent])

  useEffect(() => {
    if (!data?.cover?.id) {
      setActiveStep(0)
      setOnlyUploader(true)
    }
  }, [data?.cover?.id])

  /*
   * Step Management
   */
  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const submitData = useCallback(() => {
    data &&
      onSubmit({
        cover: data.cover,
        ...data.step1.state,
        ...data.step2.state,
        ...data.step3.state
      }).finally(() => {
        setFinished?.(true)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setFinished])

  const handleNext = (activeStep: number, steps: number) => {
    if (activeStepNumeric === 4 && step4Answered) {
      return submitData()
    }

    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const onChangeFile = useCallback(
    (values: FileType | FileType[]) => {
      if (!data?.cover?.id) {
        const currentFile = Array.isArray(values) ? values[0] : values

        if (setStepData) {
          setStepData({
            cover: currentFile,
            step1: {
              state: {
                name: '',
                description: null
              },
              solved: true,
              error: false
            }
          })
        }
      } else if (!values && clearState) {
        clearState()
      }
    },
    [data, setStepData, clearState]
  )

  const StepsList = [
    {
      name: "Information's",
      active: activeStep === 0,
      completed: data?.step1.solved,
      optional: false,
      skipped: isStepSkipped(0),
      error: data?.step1.error
    },
    {
      name: 'Assets',
      active: activeStep === 1,
      completed: data?.step2.solved,
      optional: true,
      skipped: isStepSkipped(1),
      error: data?.step2.error
    },
    {
      name: 'Add-ons',
      active: activeStep === 2,
      completed: data?.step3.solved,
      optional: false,
      skipped: isStepSkipped(2),
      error: data?.step3.error
    },
    {
      name: 'Check cover',
      active: activeStep === 3,
      completed: data?.step4.solved,
      optional: false,
      skipped: isStepSkipped(3),
      error: data?.step4.error
    }
  ]

  const activeStepNumeric = activeStep + 1

  // const buttonNextDisabled = useMemo(() => {
  //   if (activeStepNumeric === 4) {
  //     return !(
  //       step1Answered &&
  //       step2Answered &&
  //       step3Answered &&
  //       step4Answered
  //     );
  //   }

  //   if (activeStepNumeric === 2) {
  //     return !step2Answered;
  //   }

  //   return !step1Answered;
  // }, [
  //   step1Answered,
  //   step2Answered,
  //   step3Answered,
  //   step4Answered,
  //   activeStepNumeric,
  // ]);

  if (finished) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          variants={{
            initial: {
              height: 'auto'
            },
            animate: {
              height: 'auto',
              transition: {
                when: 'beforeChildren'
              }
            },
            exit: {
              height: 'auto',
              transition: {
                when: 'afterChildren'
              }
            }
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
                opacity: 0
              },
              animate: {
                opacity: 1
              },
              exit: {
                opacity: 0
              }
            }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-5 justify-center">
              <CompleteIllustration width={300} height={300} />
            </div>
            <div className="text-lg font-bold">
              Congratulations! Your Collection is{' '}
              {defaultCover?.file_id ? 'updated!' : 'uploaded!'}
            </div>
            {/* //TODO: response of backend store on context for display results on this page */}
            {/* <div className="mt-4">
              <Link
                href={`/collection/[slug]`}
                as={`/collection/${encodeURIComponent(item.slug as string)}`}
              >
                <a className="relative inline-block text-center border border-transparent rounded-md py-2 px-4 mr-4 font-medium text-white bg-blue-600 hover:bg-blue-700 ">
                  View your collection
                </a>
              </Link>
            </div> */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <>
      <div className="flex h-[calc(65vh_-_5px)] w-full flex-1 flex-col">
        {!onlyUploader && (
          <div className="z-1 sticky top-0 mx-auto flex w-full bg-slate-50 shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
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
              'grid-cols-[minmax(300px,_1fr)_300px] md:grid': !onlyUploader,
              'relative flex flex-1 flex-row': onlyUploader
            },
            'h-full gap-x-4 overflow-y-auto'
          )}
        >
          {!onlyUploader && (
            <AnimatePresence mode="wait">
              <motion.div
                variants={{
                  initial: {
                    height: 'auto'
                  },
                  animate: {
                    height: 'auto',
                    transition: {
                      when: 'beforeChildren'
                    }
                  },
                  exit: {
                    height: 'auto',
                    transition: {
                      when: 'afterChildren'
                    }
                  }
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                key={activeStep}
                className={classNames({
                  'md:col-span-2': activeStepNumeric == 2
                })}
              >
                <motion.div
                  variants={{
                    initial: {
                      opacity: 0
                    },
                    animate: {
                      opacity: 1
                    },
                    exit: {
                      opacity: 0
                    }
                  }}
                  className=""
                >
                  {activeStep <= 3 && (
                    <div className="p-2">
                      <Suspense fallback="Loading Form View..">{view}</Suspense>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
          <motion.div
            initial={'visible'}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                // scale: 1,
                transition: {
                  // when: 'afterChildren',
                  duration: 0.3,
                  delay: 0.3
                }
              },
              hidden: {
                opacity: 0,
                x: '110%',
                // scale: 0.7,
                transition: {
                  // when: 'beforeChildren',
                  duration: 0.3
                  // delay: 0.2,
                }
              }
            }}
            animate={activeStepNumeric !== 2 ? 'visible' : 'hidden'}
            className={classNames(
              'sticky top-5 mx-auto flex h-full w-full flex-1',
              {
                'max-h-[20rem] max-w-[20rem]': !onlyUploader
              }
            )}
          >
            <motion.div
              initial={'visible'}
              variants={{
                visible: {
                  display: 'block',
                  transition: {
                    duration: 0.3
                    // delay: 0.3,
                  }
                },
                hidden: {
                  display: 'none',
                  transition: {
                    duration: 0.3,
                    delay: 0.4
                  }
                }
              }}
              animate={activeStepNumeric !== 2 ? 'visible' : 'hidden'}
              className="flex flex-1 justify-center"
            >
              <Uploader
                existingFiles={
                  defaultCover
                    ? [
                        {
                          id: defaultCover.file_id,
                          file_id: defaultCover.file_id,
                          src: defaultCover.src,
                          mime_type: defaultCover.mime_type,
                          type: defaultCover.type,
                          filename: defaultCover.filename,
                          storage: defaultCover.storage,
                          size: defaultCover.size,
                          position: 0
                        }
                      ]
                    : undefined
                }
                hasError={false}
                onChange={onChangeFile}
                OnGeneratedThumbnail={() => {
                  setOnlyUploader(false)
                }}
              />
            </motion.div>
          </motion.div>
        </div>
        {!onlyUploader && (
          <div className="sticky bottom-0 flex justify-end border-t border-gray-100 bg-slate-50 pt-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex gap-x-2">
              {!submitting && activeStep > 0 && (
                <>
                  <button
                    disabled={activeStep === 0 || isDisabledNextStep}
                    onClick={handleBack}
                    className="inline-flex items-center rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow hover:bg-gray-400"
                  >
                    Back
                  </button>
                </>
              )}
              <div />
              {!submitting && isStepOptional(activeStep) && (
                <>
                  {allowSkip && (
                    <button
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow hover:bg-blue-500"
                      onClick={handleSkip}
                    >
                      Skip
                    </button>
                  )}
                </>
              )}
              {submitting ? (
                <button
                  type="button"
                  className="inline-flex cursor-not-allowed items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:bg-blue-500"
                  disabled
                >
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow hover:bg-blue-500"
                  disabled={isDisabledNextStep} //buttonNextDisabled
                  onClick={() => handleNext(activeStep, 2)}
                >
                  {activeStepNumeric === 4 ? 'Save' : 'Next'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FormCollection
