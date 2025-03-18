import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateInventory } from './api'
import { InventoryPayload } from './types'

export function useUpdateInventory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: InventoryPayload; id: string }>
) {
  const {
    mutate: onUpdateInventory,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: InventoryPayload; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateInventory(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateInventory,
    isPending,
    isSuccess,
    error
  }
}
