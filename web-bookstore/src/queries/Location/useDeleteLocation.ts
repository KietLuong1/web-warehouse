import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteLocation } from './api'
import { LocationResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteLocation(options?: UseMutationOptions<any, Error, LocationResponse>) {
  const {
    mutate: onDeleteLocation,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, LocationResponse>({
    mutationFn: (data: LocationResponse) => deleteLocation(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteLocation,
    isDeleting,
    isSuccess,
    error
  }
}
