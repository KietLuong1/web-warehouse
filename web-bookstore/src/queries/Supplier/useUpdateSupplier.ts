import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateSupplier } from './api'
import { SupplierPayload } from './types'

export function useUpdateSupplier(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: SupplierPayload; id: string }>
) {
  const {
    mutate: onUpdateSupplier,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: SupplierPayload; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateSupplier(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateSupplier,
    isPending,
    isSuccess,
    error
  }
}
