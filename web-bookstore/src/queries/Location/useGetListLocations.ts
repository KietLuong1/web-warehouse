import { useQuery } from '@tanstack/react-query'
import fetchListLocations from './api'

export const useGetListLocations = () => {
  return useQuery({
    queryKey: ['location'],
    queryFn: fetchListLocations
  })
}
