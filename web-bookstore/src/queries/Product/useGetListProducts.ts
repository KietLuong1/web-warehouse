import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListProducts } from './api'
import { ProductTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListProducts(options?: UseMutationOptions<any, Error, ProductTypes>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListProducts
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchListProducts,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListProducts = () => queryClient.invalidateQueries({ queryKey: ['products'] })
  return { data, error, isFetching, onGetAllListProducts, handleInvalidateListProducts }
}