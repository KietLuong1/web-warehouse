import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { createLocation } from './api'
import { LocationPayload } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateLocation(options?: UseMutationOptions<any, Error, LocationPayload>) {
  const {
    mutate: onCreateLocation,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createLocation,
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onCreateLocation,
    isPending,
    isSuccess,
    error
  }
}
