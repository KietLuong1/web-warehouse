import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLocationById } from './api'
import { WarehouseDTO } from './types'

export interface WarehouseDetailResponse {
  status: number
  message: string
  warehouse: WarehouseDTO
  timestamp: string
}

export function useLocationDetail(options: UseMutationOptions<WarehouseDetailResponse> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getLocationDetail
  } = useQuery<WarehouseDetailResponse>({
    queryKey: ['warehouses', { ...options }],
    queryFn: () => getLocationById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()
  const warehouse = data?.warehouse || {}

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['warehouses', { id: options.id }] })
  return {
    warehouse,
    isLoadingDetail,
    isSuccess,
    error,
    getLocationDetail,
    handleInvalidateDetail
  }
}
