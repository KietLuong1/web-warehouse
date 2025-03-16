import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateLocation } from './api'
import { LocationPayload } from './types'

export function useUpdateLocation(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: LocationPayload; id: string }>
) {
  const {
    mutate: onUpdateLocation,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: LocationPayload; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateLocation(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateLocation,
    isPending,
    isSuccess,
    error
  }
}
