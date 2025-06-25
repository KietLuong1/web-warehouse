/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ApiTransactionsListResponse } from '../types'
import { fetchListTransactions, TransactionSearchParams } from './api'
import { TransactionDTO } from './types'

export function useGetListTransactions(
  initialParams: TransactionSearchParams = { page: 1, size: 10, filter: '' },
  options?: UseMutationOptions<any, Error, ApiTransactionsListResponse<TransactionDTO>>
) {
  const [params, setParams] = useState<TransactionSearchParams>(initialParams)

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListTransactions
  } = useQuery<any, Error, ApiTransactionsListResponse<TransactionDTO>>({
    queryKey: [
      'transactions',
      params.page,
      params.size,
      params.filter?.trim() || '',
      params.status || '',
      params.transactionType || ''
    ],
    queryFn: () => fetchListTransactions(params),
    ...options
  })

  const queryClient = useQueryClient()
  const { transactions, totalElements, totalPages, pageSize } = data || {}
  const handleInvalidateListTransactions = () => queryClient.invalidateQueries({ queryKey: ['transactions'] })

  return {
    totalElements,
    totalPages,
    pageSize,
    transactions: Array.isArray(transactions) ? transactions : [],
    error,
    isFetching,
    onGetAllListTransactions,
    handleInvalidateListTransactions,
    setParams
  }
}
