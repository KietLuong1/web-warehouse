import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteReport } from './api'
import { ReportTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteReport(options?: UseMutationOptions<any, Error, ReportTypes>) {
  const {
    mutate: onDeleteReport,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, ReportTypes>({
    mutationFn: (data: ReportTypes) => deleteReport(data),
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
