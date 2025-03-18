import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteInventory } from './api'
import { InventoryResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteInventory(options?: UseMutationOptions<any, Error, InventoryResponse>) {
  const {
    mutate: onDeleteInventory,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, InventoryResponse>({
    mutationFn: (data: InventoryResponse) => deleteInventory(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteInventory,
    isDeleting,
    isSuccess,
    error
  }
}
