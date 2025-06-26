import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSupplierById } from './api'
import { SupplierDTO } from './types'

export interface SupplierResponse {
  status: number
  message: string
  supplier: SupplierDTO
  timestamp: string
}


export function useSupplierDetail(options: UseMutationOptions<SupplierResponse> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getSupplierDetail
  } = useQuery<SupplierResponse, Error>({
    queryKey: ['suppliers', { ...options }],
    queryFn: () => getSupplierById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['suppliers', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getSupplierDetail,
    handleInvalidateDetail
  }
}
