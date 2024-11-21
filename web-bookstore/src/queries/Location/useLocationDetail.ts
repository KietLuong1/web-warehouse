import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { LocationTypes } from './types'
import { getLocationById } from './api'

export function useLocationDetail(options: UseMutationOptions<LocationTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getLocationDetail
  } = useQuery<LocationTypes>({
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
