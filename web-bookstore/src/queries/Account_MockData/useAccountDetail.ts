import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccountById } from './api'
import { AccountResponse } from './types'

export function useGetAccountDetail(options: UseMutationOptions<AccountResponse> & { userId: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getAccountDetail
  } = useQuery<AccountResponse>({
    queryKey: ['account', { ...options }],
    queryFn: () => getAccountById({ userId: options.userId }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['account', { id: options.userId }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getAccountDetail,
    handleInvalidateDetail
  }
}
