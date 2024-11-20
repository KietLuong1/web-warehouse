import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { TransactionTypes } from './types'
import { getTransactionById } from './api'

export function useTransactionDetail(options: UseMutationOptions<TransactionTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getTransactionDetail
  } = useQuery<TransactionTypes>({
    queryKey: ['imports', { ...options }],
    queryFn: () => getTransactionById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['imports', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getTransactionDetail,
    handleInvalidateDetail
  }
}
