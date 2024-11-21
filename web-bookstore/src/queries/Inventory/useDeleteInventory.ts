import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteInventory } from './api'
import { InventoryTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteInventory(options?: UseMutationOptions<any, Error, InventoryTypes>) {
  const {
    mutate: onDeleteInventory,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, InventoryTypes>({
    mutationFn: (data: InventoryTypes) => deleteInventory(data),
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
