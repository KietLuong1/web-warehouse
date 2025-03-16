import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getReportById } from './api'
import { ReportResponse } from './types'

export function useGetReportDetail(options: UseMutationOptions<ReportResponse> & { id: string }) {
  const {
    data,
    isPending: isLoadingDetail,
    isSuccess,
    error,
    refetch: getReportDetail
  } = useQuery<ReportResponse>({
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
