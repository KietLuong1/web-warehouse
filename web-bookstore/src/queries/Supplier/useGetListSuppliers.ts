/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { ApiListSupplierResponse } from '../types'
import { fetchListSuppliers, SupplierSearchParams } from './api'
import { SupplierDTO } from './types'

export function useGetListSuppliers(
  initialParams: SupplierSearchParams = { page: 1, size: 10, keyword: '' },
  options?: UseQueryOptions<any, Error, ApiListSupplierResponse<SupplierDTO>>
) {
  const [params, setParams] = useState<SupplierSearchParams>(initialParams)

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListSuppliers
  } = useQuery<any, Error, ApiListSupplierResponse<SupplierDTO>>({
    queryKey: ['suppliers', params.page, params.size, params.keyword?.trim() || ''],
    queryFn: () => {
      return fetchListSuppliers(params)
    },
    ...options
  })
  const queryClient = useQueryClient()

  const { suppliers, totalElements, totalPages, pageSize, currentPage } = data || {}

  const handleInvalidateListSuppliers = () => queryClient.invalidateQueries({ queryKey: ['suppliers'] })
  return {
    suppliers: Array.isArray(suppliers) ? suppliers : [],
    totalElements,
    totalPages,
    pageSize,
    currentPage,
    setParams,
    error,
    isFetching,
    onGetAllListSuppliers,
    handleInvalidateListSuppliers
  }
}
