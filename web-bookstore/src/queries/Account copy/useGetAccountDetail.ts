import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { getAccountById } from './api'
import { AccountTypes } from './types'

export function useGetAccountDetail(userId: number, options?: UseQueryOptions<AccountTypes, Error>) {
  const queryClient = useQueryClient()

  const query = useQuery<AccountTypes, Error>({
    queryKey: ['user', userId],
    queryFn: () => getAccountById(userId),
    enabled: !!userId,
    ...options
  })

  return {
    ...query,
    refetch: query.refetch,
    invalidate: () => queryClient.invalidateQueries({ queryKey: ['user', userId] })
  }
}
