/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ApiListResponse } from '../types'
import { fetchListProducts, ProductSearchParams } from './api'
import { ProductDTO } from './types'

export function useGetListProducts(
  initialParams: ProductSearchParams = { page: 1, size: 10, keyword: '' },
  options?: UseMutationOptions<any, Error, ApiListResponse<ProductDTO>>
) {
  const [params, setParams] = useState<ProductSearchParams>(initialParams)

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListProducts
  } = useQuery<any, Error, ApiListResponse<ProductDTO>>({
    queryKey: [
      'products',
      params.page,
      params.size,
      params.keyword?.trim() || '',
      params.categoryId || '' || '',
      params.warehouseId || ''
    ],
    queryFn: () => {
      return fetchListProducts(params)
    },
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
