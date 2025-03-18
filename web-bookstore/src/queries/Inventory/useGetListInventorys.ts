import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListInventory } from './api'
import { InventoryResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListInventory(options?: UseMutationOptions<any, Error, InventoryResponse>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListInventory
  } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchListInventory,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListInventory = () => queryClient.invalidateQueries({ queryKey: ['inventory'] })
  return { data, error, isFetching, onGetAllListInventory, handleInvalidateListInventory }
}
