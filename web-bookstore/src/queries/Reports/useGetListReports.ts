import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReportTypes } from './types'
import { fetchListReport } from './api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListReport(options?: UseMutationOptions<any, Error, ReportTypes>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListReport
  } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchListReport,
    ...options
  })
  const queryClient = useQueryClient()

  const handleInvalidateListReport = () => queryClient.invalidateQueries({ queryKey: ['reports'] })
  return { data, error, isFetching, onGetAllListReport, handleInvalidateListReport }
}
