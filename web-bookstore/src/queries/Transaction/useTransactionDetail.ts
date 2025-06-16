import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTransactionById } from './api'
import { TransactionDTO } from './types'

export interface TransactionDetailResponse {
  status: number
  message: string
  transaction: TransactionDTO
  timestamp: string
}
export function useTransactionDetail(options: UseMutationOptions<TransactionDetailResponse> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getTransactionDetail
  } = useQuery<TransactionDetailResponse>({
    queryKey: ['transactions', { ...options }],
    queryFn: () => getTransactionById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['transactions', { id: options.id }] })

  const { transaction } = data || {}
  return {
    transaction,
    isLoadingDetail,
    isSuccess,
    error,
    getTransactionDetail,
    handleInvalidateDetail
  }
}
