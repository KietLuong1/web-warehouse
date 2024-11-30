import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { SupplierTypes } from './types'
import { getSupplierById } from './api'

export function useSupplierDetail(options: UseMutationOptions<SupplierTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getSupplierDetail
  } = useQuery<SupplierTypes>({
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
