import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchListAccount } from './api'
import { AccountApiResponse, AccountTypes, QueryParams } from './types'

export function useGetListAccount(initialParams: QueryParams = { page: 1, size: 10 }) {
  const [params, setParams] = useState<QueryParams>(initialParams)
  const queryClient = useQueryClient()

  const { data, isFetching, error } = useQuery<AccountApiResponse, Error>({
    queryKey: ['users', params],
    queryFn: () => fetchListAccount(params),
    staleTime: Infinity
  })

  // if data is undefined (first load), show an empty page with our initial pageSize:
  const { userDtos = [], page = params.page!, size = params.size!, totalPages = 0, totalElements = 0 } = data ?? {}

  return {
    accounts: userDtos as AccountTypes[],
    page: page - 1,
    size,
    totalPages,
    totalElements,
    // last: isLast,
    isFetching,
    error,
    setParams,
    invalidate: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  }
}
