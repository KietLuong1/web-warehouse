/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ApiListResponse } from '../types'
import { fetchListProducts } from './api'
import { ProductDTO } from './types'

export interface PaginationParams {
  page?: number
  size?: number
}

export function useGetListProducts(
  initialParams: PaginationParams = { page: 1, size: 10 },
  options?: UseMutationOptions<any, Error, ApiListResponse<ProductDTO>>
) {
  const [params, setParams] = useState<PaginationParams>(initialParams)

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListProducts
  } = useQuery<any, Error, ApiListResponse<ProductDTO>>({
    queryKey: ['products', params],
    queryFn: () => fetchListProducts(params),
    ...options
  })
  const queryClient = useQueryClient()

  const { products, totalElements, totalPages, pageSize, currentPage } = data || {}

  const handleInvalidateListProducts = () => queryClient.invalidateQueries({ queryKey: ['products'] })
  return {
    products: Array.isArray(products) ? products : [],
    totalElements,
    totalPages,
    error,
    isFetching,
    onGetAllListProducts,
    handleInvalidateListProducts,
    pageSize,
    currentPage,
    setParams
  }
}
