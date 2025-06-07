import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { updateAccount } from './api'
import { UserDto, AccountTypes } from './types'
import { Toastify } from '../../components/Toastify'

export function useUpdateAccount(options?: UseMutationOptions<AccountTypes, Error, UserDto>) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: updateAccount,
    onError: () => Toastify('error', 'Failed to update account'),
    onSuccess: (data, variables, context) => {
      Toastify('success', 'Account updated successfully')
      qc.invalidateQueries({ queryKey: ['users'] })
      if (options?.onSuccess) options.onSuccess(data, variables, context)
    },
    ...options
  })
}
