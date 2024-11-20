import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { createTransaction } from './api'
import { TransactionTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateTransaction(options?: UseMutationOptions<any, Error, TransactionTypes>) {
  const {
    mutate: onCreateTransaction,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createTransaction,
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onCreateTransaction,
    isPending,
    isSuccess,
    error
  }
}
