/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiCategoryListResponse } from '../types'
import { fetchListCategories } from './api'
import { CategoryDTO } from './types'

export function useGetListCategories(options?: UseMutationOptions<any, Error, ApiCategoryListResponse<CategoryDTO>>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListCategories
  } = useQuery<any, Error, ApiCategoryListResponse<CategoryDTO>>({
    queryKey: ['categories'],
    queryFn: fetchListCategories,
    ...options
  })
  const queryClient = useQueryClient()

  const { categories } = data || {}

  const handleInvalidateListCategories = () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  return { categories, error, isFetching, onGetAllListCategories, handleInvalidateListCategories }
}
