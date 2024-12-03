import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductTypes } from './types'
import { getProductById } from './api'

export function useProductDetail(options: UseMutationOptions<ProductTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getProductDetail
  } = useQuery<ProductTypes>({
    queryKey: ['products', { ...options }],
    queryFn: () => getProductById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['products', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getProductDetail,
    handleInvalidateDetail
  }
}
