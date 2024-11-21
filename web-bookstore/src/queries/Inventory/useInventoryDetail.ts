import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { InventoryTypes } from './types'
import { getInventoryById } from './api'

export function useInventoryDetail(options: UseMutationOptions<InventoryTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getInventoryDetail
  } = useQuery<InventoryTypes>({
    queryKey: ['inventory', { ...options }],
    queryFn: () => getInventoryById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['inventory', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getInventoryDetail,
    handleInvalidateDetail
  }
}
