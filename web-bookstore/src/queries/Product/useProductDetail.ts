import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductById } from './api'
import { ProductDTO } from './types'

// Define the API response structure
export interface ProductDetailResponse {
  status: number
  message: string
  product: ProductDTO
  timestamp: string
}

export function useProductDetail(options: UseMutationOptions<ProductDetailResponse> & { id: string }) {
  const {
    data: rawData,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getProductDetail
  } = useQuery<ProductDetailResponse>({
    queryKey: ['products', { ...options }],
    queryFn: () => getProductById({ id: options.id }),
    ...options
  })

  const data = rawData

  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['products', { id: options.id }] })
  const { product } = data || {}
  return {
    product,
    isLoadingDetail,
    isSuccess,
    error,
    getProductDetail,
    handleInvalidateDetail
  }
}
