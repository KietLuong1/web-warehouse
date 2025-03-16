import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListAccount } from './api'
import { AccountResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListAccount(options?: UseMutationOptions<any, Error, AccountResponse>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListAccount
  } = useQuery({
    queryKey: ['account'],
    queryFn: fetchListAccount,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListAccount = () => queryClient.invalidateQueries({ queryKey: ['account'] })
  return { data, error, isFetching, onGetAllListAccount, handleInvalidateListAccount }
}
