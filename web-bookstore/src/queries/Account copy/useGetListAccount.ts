import { useState } from 'react'
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { fetchListAccount } from './api'
import { AccountApiResponse, AccountTypes, QueryParams } from './types'

export function useGetListAccount(
  initialParams: QueryParams = { pageNumber: 0, pageSize: 10 },
) {
  const [params, setParams] = useState<QueryParams>(initialParams)
  const queryClient = useQueryClient()

  const { data, isFetching, error } = useQuery<AccountApiResponse, Error>({
    queryKey: ['users', params],
    queryFn: () => fetchListAccount(params),
    staleTime: Infinity,
  });

  // if data is undefined (first load), show an empty page with our initial pageSize:
  const {
    userDtos  = [],
    pageNumber = params.pageNumber!,
    pageSize   = params.pageSize!,
    totalPages = 0,
    isLast     = false
  } = data ?? {};

  return {
    accounts: userDtos as AccountTypes[],
    pageNumber,
    pageSize,
    totalPages,
    last: isLast,
    isFetching,
    error,
    setParams,
    invalidate: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  };
}
