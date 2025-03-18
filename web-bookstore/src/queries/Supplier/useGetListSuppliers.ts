import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListSuppliers } from './api'
import { SupplierResponse } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListSuppliers(options?: UseMutationOptions<any, Error, SupplierResponse>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListSuppliers
  } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchListSuppliers,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListSuppliers = () => queryClient.invalidateQueries({ queryKey: ['suppliers'] })
  return { data, error, isFetching, onGetAllListSuppliers, handleInvalidateListSuppliers }
}
