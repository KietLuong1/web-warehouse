import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccountById } from './api'
import { AccountTypes } from './types'

export function useGetAccountDetail(options: UseMutationOptions<AccountTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getAccountDetail
  } = useQuery<AccountTypes>({
    queryKey: ['account', { ...options }],
    queryFn: () => getAccountById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['account', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getAccountDetail,
    handleInvalidateDetail
  }
}
