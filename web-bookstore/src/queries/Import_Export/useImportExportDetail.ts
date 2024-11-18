import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ImportExportTypes } from './types'
import { getImportExportById } from './api'

export function useImportExportDetail(options: UseMutationOptions<ImportExportTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getImportExportDetail
  } = useQuery<ImportExportTypes>({
    queryKey: ['imports', { ...options }],
    queryFn: () => getImportExportById({ id: options.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['imports', { id: options.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getImportExportDetail,
    handleInvalidateDetail
  }
}
