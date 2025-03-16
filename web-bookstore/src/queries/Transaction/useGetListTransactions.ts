import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListTransactions } from './api'
import { TransactionResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListTransactions(options?: UseMutationOptions<any, Error, TransactionResponse>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListTransactions
  } = useQuery({
    queryKey: ['imports'],
    queryFn: fetchListTransactions,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListTransactions = () => queryClient.invalidateQueries({ queryKey: ['imports'] })
  return { data, error, isFetching, onGetAllListTransactions, handleInvalidateListTransactions }
}
