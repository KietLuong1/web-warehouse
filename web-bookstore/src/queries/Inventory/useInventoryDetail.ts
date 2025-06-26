import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { InventoryResponse } from './types'
import { getInventoryById } from './api'
import { ApiInventoryResponse } from '../types'

export function useInventoryDetail(
  options: { id: string } & Omit<UseQueryOptions<ApiInventoryResponse<InventoryResponse>>, 'queryKey' | 'queryFn'>
) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getInventoryDetail
  } = useQuery<ApiInventoryResponse<InventoryResponse>>({
    queryKey: ['inventory', options.id],
    queryFn: () => getInventoryById({ id: options.id }),
    enabled: !!options.id,
    ...options
  })
  const queryClient = useQueryClient()
  const { inventory } = data?.dataList || {}

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['inventory', options.id] })
  return {
    inventory,
    isLoadingDetail,
    isSuccess,
    error,
    getInventoryDetail,
    handleInvalidateDetail
  }
}
