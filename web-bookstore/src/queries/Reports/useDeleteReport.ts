import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteReport } from './api'
import { ReportPayload } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteReport(options?: UseMutationOptions<any, Error, ReportPayload>) {
  const {
    mutate: onDeleteReport,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, ReportPayload>({
    mutationFn: (data: ReportPayload) => deleteReport(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteReport,
    isDeleting,
    isSuccess,
    error
  }
}
