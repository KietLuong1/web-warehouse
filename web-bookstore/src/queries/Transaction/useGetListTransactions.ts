/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListTransactions } from './api'
import { TransactionDTO } from './types'
import { ApiTransactionsListResponse } from '../types'

export function useGetListTransactions(
  options?: UseMutationOptions<any, Error, ApiTransactionsListResponse<TransactionDTO>>
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListTransactions
  } = useQuery<any, Error, ApiTransactionsListResponse<TransactionDTO>>({
    queryKey: ['transactions'],
    queryFn: fetchListTransactions,
    ...options
  })
  const queryClient = useQueryClient()
  const { transactions } = data || {}

  const handleInvalidateListTransactions = () => queryClient.invalidateQueries({ queryKey: ['transactions'] })
  return { 
    transactions: Array.isArray(transactions) ? transactions : [], 
    error, 
    isFetching, 
    onGetAllListTransactions, 
    handleInvalidateListTransactions 
  }
}
