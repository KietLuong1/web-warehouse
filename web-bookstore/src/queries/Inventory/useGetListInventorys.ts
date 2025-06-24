import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PaginationResponseType, SearchParams } from '../types'
import { fetchListInventory, searchInventoryByName } from './api'
import { InventoryResponse } from './types'

export function useGetListInventory(
  initialParams: SearchParams = { page: 1, size: 10, keyword: '' },
  options?: UseQueryOptions<PaginationResponseType<InventoryResponse>, Error>
) {
  const [params, setParams] = useState<SearchParams>(initialParams)
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListInventory
  } = useQuery<PaginationResponseType<InventoryResponse>, Error>({
    queryKey: ['inventory', params.page, params.size, params.keyword?.trim() || ''],
    queryFn: () => {
      if (params.keyword && params.keyword.trim() !== '') {
        return searchInventoryByName(params)
      }
      return fetchListInventory({ page: params.page, size: params.size })
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
