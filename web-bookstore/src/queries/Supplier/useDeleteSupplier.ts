import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteSupplier } from './api'
import { SupplierResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteSupplier(options?: UseMutationOptions<any, Error, SupplierResponse>) {
  const {
    mutate: onDeleteSupplier,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, SupplierResponse>({
    mutationFn: (data: SupplierResponse) => deleteSupplier(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteSupplier,
    isDeleting,
    isSuccess,
    error
  }
}
