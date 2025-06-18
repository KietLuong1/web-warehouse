/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListTransactions } from './api'
import { TransactionDTO } from './types'
import { ApiTransactionsListResponse, PaginationParams } from '../types'
import { useState } from 'react'

export function useGetListTransactions(
  initialParams: PaginationParams = { page: 1, size: 10 },
  options?: UseMutationOptions<any, Error, ApiTransactionsListResponse<TransactionDTO>>
) {
  const [params, setParams] = useState<PaginationParams>(initialParams)
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListTransactions
  } = useQuery<any, Error, ApiTransactionsListResponse<TransactionDTO>>({
    queryKey: ['transactions', params],
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
    setParams,
    transactions: Array.isArray(transactions) ? transactions : [],
    error,
    isFetching,
    onGetAllListTransactions,
    handleInvalidateListTransactions
  }
}
