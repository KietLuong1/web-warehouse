import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListImports } from './api'
import { ImportExportTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListImport(options?: UseMutationOptions<any, Error, ImportExportTypes>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListImport
  } = useQuery({
    queryKey: ['imports'],
    queryFn: fetchListImports,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListImport = () => queryClient.invalidateQueries({ queryKey: ['imports'] })
  return { data, error, isFetching, onGetAllListImport, handleInvalidateListImport }
}
