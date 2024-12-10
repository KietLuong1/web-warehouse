import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { updateAccount } from './api'
import { AccountPayLoad } from './types'

export function useUpdateAccount(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, Error, AccountPayLoad>
) {
  const {
    mutate: onUpdateAccount,
    isPending,
    isSuccess,
    error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useMutation<any, Error, AccountPayLoad>({
    mutationFn: (data: AccountPayLoad) => {
      return updateAccount(data)
    },

    ...options
  })

  return {
    onUpdateAccount,
    isPending,
    isSuccess,
    error
  }
}
