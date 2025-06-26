/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PaginationResponseType } from '../types'
import { fetchListLocation, LocationSearchParams } from './api'
import { WarehouseDTO } from './types'

export function useGetListLocation(
  initialParams: LocationSearchParams = { page: 1, size: 10, keyword: '' },
  options?: UseMutationOptions<any, Error, PaginationResponseType<WarehouseDTO>>
) {
  const [params, setParams] = useState<LocationSearchParams>(initialParams)

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListLocation
  } = useQuery<any, Error, PaginationResponseType<WarehouseDTO>>({
    queryKey: ['warehouses', params.page, params.size, params.keyword?.trim() || ''],
    queryFn: () => {
      return fetchListLocation(params)
    },
    ...options
  })
  const queryClient = useQueryClient()
  const { totalElements, totalPages, pageSize, currentPage } = data || {}

  const handleInvalidateListLocation = () => {
    console.log('🔄 Invalidating warehouses queries...')
    return queryClient.invalidateQueries({ queryKey: ['warehouses'] })
  }
  return {
    data,
    totalElements,
    totalPages,
    pageSize,
    currentPage,
    setParams,
    error,
    isFetching,
    onGetAllListLocation,
    handleInvalidateListLocation
  }
}
