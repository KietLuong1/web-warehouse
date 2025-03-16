import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateReport } from './api';
import { ReportPayload } from './types';

export function useUpdateReport(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: ReportPayload; id: string }>
) {
  const {
    mutate: onUpdateReport,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: ReportPayload; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateReport(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateReport,
    isPending,
    isSuccess,
    error
  }
}
