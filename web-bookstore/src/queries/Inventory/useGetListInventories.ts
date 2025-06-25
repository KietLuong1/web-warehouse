import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { PaginationResponseType } from '../types'
import { fetchListInventory, InventorySearchParams } from './api'
import { InventoryResponse } from './types'

export function useGetListInventory(
  initialParams: InventorySearchParams = { page: 1, size: 10, keyword: '' },
  options?: UseQueryOptions<PaginationResponseType<InventoryResponse>, Error>
) {
  const [params, setParams] = useState<InventorySearchParams>(initialParams)
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListInventory
  } = useQuery<PaginationResponseType<InventoryResponse>, Error>({
    queryKey: ['inventory', params.page, params.size, params.keyword?.trim() || '', params.warehouseId || ''],
    queryFn: () => {
      return fetchListInventory(params)
    },
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
