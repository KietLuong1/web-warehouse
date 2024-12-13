import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { fetchListAccount } from './api'
import { AccountTypes, ApiResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListAccount(options?: UseQueryOptions<ApiResponse<AccountTypes>, Error>) {
  const [params, setParams] = useState<ApiResponse<AccountTypes>>()
  console.log('params', params)
  const {
    data = {},
    error,
    isFetching,
    refetch: onGetAllListAccount
  } = useQuery<ApiResponse<AccountTypes>>({
    queryKey: ['users', params],
    queryFn: () => fetchListAccount(params),
    enabled: !isEmpty(params),
    ...options
  })

  const queryClient = useQueryClient()

  const handleInvalidateListAccount = () => queryClient.invalidateQueries({ queryKey: ['users'] })

  const { userDtos = [], pageSize, pageNumber, totalPages, totalElements } = data || {}

  return {
    error,
    isFetching,
    setParams,
    onGetAllListAccount,
    handleInvalidateListAccount,
    userDtos,
    pageNumber,
    totalPages,
    pageSize,
    totalElements
  }
}
