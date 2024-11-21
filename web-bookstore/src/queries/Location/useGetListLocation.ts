import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListLocation } from './api'
import { LocationTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListLocation(options?: UseMutationOptions<any, Error, LocationTypes>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListLocation
  } = useQuery({
    queryKey: ['location'],
    queryFn: fetchListLocation,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListLocation = () => queryClient.invalidateQueries({ queryKey: ['location'] })
  return { data, error, isFetching, onGetAllListLocation, handleInvalidateListLocation }
}
