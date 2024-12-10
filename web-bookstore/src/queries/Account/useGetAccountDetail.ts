import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccountById } from './api'
import { AccountTypes } from './types'

export function useGetAccountDetail(options: UseMutationOptions<AccountTypes> & { userId: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getAccountDetail
  } = useQuery<AccountTypes>({
    queryKey: ['user', { ...options }],
    queryFn: () => getAccountById({ userId: options.userId }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['user', { id: options.userId }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getAccountDetail,
    handleInvalidateDetail
  }
}
