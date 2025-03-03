import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ReportTypes } from './types'
import { fetchListReport } from './api'

export function useGetListReport() {
  const queryClient = useQueryClient()

  const {
    data = [],
    error,
    isFetching,
    refetch: onGetAllListReport
  } = useQuery<ReportTypes[]>({
    queryKey: ['reports'],
    queryFn: fetchListReport
  })

  const handleInvalidateListReport = () => queryClient.invalidateQueries({ queryKey: ['reports'] })

  return { reportList: data, error, isFetching, onGetAllListReport, handleInvalidateListReport }
}
