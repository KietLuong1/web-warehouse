import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteProduct } from './api'
import { ProductResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteProduct(options?: UseMutationOptions<any, Error, ProductResponse>) {
  const {
    mutate: onDeleteProduct,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, ProductResponse>({
    mutationFn: (data: ProductResponse) => deleteProduct(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteProduct,
    isDeleting,
    isSuccess,
    error
  }
}
