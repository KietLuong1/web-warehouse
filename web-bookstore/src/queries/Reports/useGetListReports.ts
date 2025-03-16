import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchListReport } from './api'
import { ReportResponse } from './types'

export function useGetListReport() {
  const queryClient = useQueryClient()

  const {
    data = [],
    error,
    isFetching,
    refetch: onGetAllListReport
  } = useQuery<ReportResponse[]>({
    queryKey: ['reports'],
    queryFn: fetchListReport
  })

  const handleInvalidateListReport = () => queryClient.invalidateQueries({ queryKey: ['reports'] })

  return { reportList: data, error, isFetching, onGetAllListReport, handleInvalidateListReport }
}
