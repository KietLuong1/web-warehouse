import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListInventory } from './api'
import { InventoryResponse } from './types'
import { ApiInventoryListResponse } from '../types'

export function useGetListInventory(
  options?: UseQueryOptions<ApiInventoryListResponse<InventoryResponse>, Error, InventoryResponse[]>
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListInventory
  } = useQuery<ApiInventoryListResponse<InventoryResponse>, Error, InventoryResponse[]>({
    queryKey: ['inventory'],
    queryFn: fetchListInventory,
    select: (response) => response.data.inventories, 
    ...options
  })

  const queryClient = useQueryClient()

  const inventories = data || []

  const handleInvalidateListInventory = () => queryClient.invalidateQueries({ queryKey: ['inventory'] })

  return { inventories, error, isFetching, onGetAllListInventory, handleInvalidateListInventory }
}
