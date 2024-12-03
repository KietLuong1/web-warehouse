import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateProduct } from './api'
import { ProductTypes } from './types'

export function useUpdateProduct(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: ProductTypes; id: string }>
) {
  const {
    mutate: onUpdateProduct,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: ProductTypes; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateProduct(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateProduct,
    isPending,
    isSuccess,
    error
  }
}
