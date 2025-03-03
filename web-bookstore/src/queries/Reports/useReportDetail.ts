import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReportTypes } from './types'
import { getReportById } from './api'

export function useGetReportDetail(options: UseMutationOptions<ReportTypes> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getReportDetail
  } = useQuery<ReportTypes>({
    queryKey: ['reports', options.id],
    queryFn: () => getReportById({ id: options.id }),
    ...options
  })

  const queryClient = useQueryClient()

  const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['reports', options.id] })

  return {
    data,
    isLoadingDetail,
    isSuccess,
    error,
    getReportDetail,
    handleInvalidateDetail
  }
}
