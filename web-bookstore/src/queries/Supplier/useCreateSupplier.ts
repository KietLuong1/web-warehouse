import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { createSupplier } from './api'
import { SupplierTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateSupplier(options?: UseMutationOptions<any, Error, SupplierTypes>) {
  const {
    mutate: onCreateSupplier,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createSupplier,
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onCreateSupplier,
    isPending,
    isSuccess,
    error
  }
}
