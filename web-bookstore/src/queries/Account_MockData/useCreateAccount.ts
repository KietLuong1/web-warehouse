import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { Toastify } from '../../components/Toastify'
import { createAccount } from './api'
import { AccountTypes } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateAccount(options?: UseMutationOptions<any, Error, AccountTypes>) {
  const {
    mutate: onCreateAccount,
    isPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: createAccount,
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
    },
    ...options
  })

  return {
    onCreateAccount,
    isPending,
    isSuccess,
    error
  }
}
