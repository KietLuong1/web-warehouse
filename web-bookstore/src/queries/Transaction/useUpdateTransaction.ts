import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { updateTransaction } from './api'
import { TransactionPayload, TransactionTypes } from './types'

export function useUpdateTransaction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: TransactionPayload; id: string }>
) {
  const {
    mutate: onUpdateTransaction,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: TransactionTypes; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateTransaction(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onUpdateTransaction,
    isPending,
    isSuccess,
    error
  }
}
