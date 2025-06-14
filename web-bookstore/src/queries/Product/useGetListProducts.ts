/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListProducts } from './api'
import { ProductDTO } from './types'
import { ApiListResponse } from '../types'

export function useGetListProducts(options?: UseMutationOptions<any, Error, ApiListResponse<ProductDTO>>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListProducts
  } = useQuery<any, Error, ApiListResponse<ProductDTO>>({
    queryKey: ['products'],
    queryFn: fetchListProducts,
    ...options
  })
  const queryClient = useQueryClient()

  const { products } = data || {}

  const handleInvalidateListProducts = () => queryClient.invalidateQueries({ queryKey: ['products'] })
  return { products, error, isFetching, onGetAllListProducts, handleInvalidateListProducts }
}
