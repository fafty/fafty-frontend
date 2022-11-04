import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError } from 'axios'

type useAsyncParams<D, P> = (params?: P) => Promise<D>;

type RequestParams<D, P> = {
  callback: useAsyncParams<D, P>;
  mapper?: (data: D, prev?: D) => D;
  withMount?: boolean;
};

function useAsync<D, P>({
  callback,
  mapper,
  withMount = false,
}: RequestParams<D, P>) {
  const [data, setData] = useState<D>()
  const [errorMessage, setErrorMessage] = useState('')
  const [state, setState] = useState({
    isSuccess: false,
    isError: false,
    isLoading: false,
  })

  const getData = useCallback(
    async (params?: P) => {
      setState((prev) => ({
        ...prev,
        isSuccess: false,
        isError: false,
        isLoading: true,
      }))

      try {
        const data = await callback(params)

        setState((prev) => ({
          ...prev,
          isSuccess: true,
          isLoading: false,
        }))

        if (mapper) {
          return setData((prev) => mapper(data, prev))
        }

        setData(data)

        return data
      } catch (error) {
        if (error instanceof AxiosError || error instanceof Error) {
          if (!axios.isCancel(error)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - AxiosError has a message property but it's not in the type
            setErrorMessage(error?.message)
            setState((prev) => ({
              ...prev,
              isError: true,
              isLoading: false,
            }))
          }
        }

        return undefined
      }
    },
    [callback, mapper]
  )

  useEffect(() => {
    if (withMount) {
      getData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withMount])

  const call = async (params?: P) => {
    if (!state.isLoading) {
      return await getData(params)
    }

    return
  }

  const clearAsyncData = () => {
    setState({
      isSuccess: false,
      isError: false,
      isLoading: false,
    })

    setErrorMessage('')

    setData(undefined)
  }

  return {
    data,
    call,
    errorMessage,
    clearAsyncData,
    ...state,
  }
}

export default useAsync