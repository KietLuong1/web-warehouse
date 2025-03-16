import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { deleteTransaction } from './api'
import { TransactionPayload, TransactionTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteTransaction(options?: UseMutationOptions<any, Error, TransactionPayload>) {
  const {
    mutate: onDeleteTransaction,
    isPending: isDeleting,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, TransactionTypes>({
    mutationFn: (data: TransactionTypes) => deleteTransaction(data),
    onError: () => {
      Toastify('error', 'Something went wrong please try again!')
    },
    ...options
  })

  return {
    onDeleteTransaction,
    isDeleting,
    isSuccess,
    error
  }
}
