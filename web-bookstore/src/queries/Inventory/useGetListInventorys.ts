import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListInventory } from './api'
import { InventoryResponse } from './types'
import { PaginationParams, PaginationResponseType } from '../types'
import { useState } from 'react'

export function useGetListInventory(
  initialParams: PaginationParams = { page: 1, size: 10 },
  options?: UseQueryOptions<PaginationResponseType<InventoryResponse>, Error>
) {
  const [params, setParams] = useState<PaginationParams>(initialParams)
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListInventory
  } = useQuery<PaginationResponseType<InventoryResponse>, Error>({
    queryKey: ['inventory', params],
    queryFn: () => fetchListInventory(params),
    ...options
  })

  const queryClient = useQueryClient()
  const handleInvalidateListInventory = () => queryClient.invalidateQueries({ queryKey: ['inventory'] })

  const { totalElements, totalPages, pageSize, currentPage } = data || {}

  return {
    data,
    error,
    isFetching,
    onGetAllListInventory,
    handleInvalidateListInventory,
    setParams,
    totalElements,
    totalPages,
    pageSize,
    currentPage
  }
}
