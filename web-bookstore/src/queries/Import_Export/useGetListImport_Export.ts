import { useQuery } from '@tanstack/react-query'
import fetchListImports from './api'

export const useGetListImport = () => {
  return useQuery({
    queryKey: ['imports'],
    queryFn: fetchListImports
  })
}
