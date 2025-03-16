import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLocationById } from './api'
import { LocationResponse } from './types'

export function useLocationDetail(options: UseMutationOptions<LocationResponse> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getLocationDetail
  } = useQuery<LocationResponse>({
    queryKey: ['location', { ...options }],
    queryFn: () => getLocationById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['location', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getLocationDetail,
    handleInvalidateDetail
  }
}
