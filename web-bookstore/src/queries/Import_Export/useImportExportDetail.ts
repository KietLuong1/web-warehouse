import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ImportExports } from './types'
import { getImportExportById } from './api'

export function useImportExportDetail(options?: UseMutationOptions<ImportExports> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getImportExportDetail
  } = useQuery<ImportExports>({
    queryKey: ['imports', { ...options }],
    queryFn: () => getImportExportById({ id: options?.id }),
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['imports', { id: options?.id }] })
  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getImportExportDetail,
    handleInvalidateDetail
  }
}
