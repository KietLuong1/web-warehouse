import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { createAccount } from './api'
import { UserDto, AccountTypes } from './types'
import { Toastify } from '../../components/Toastify'

export function useCreateAccount(options?: UseMutationOptions<AccountTypes, Error, UserDto>) {
  return useMutation({
    mutationFn: createAccount,
    onError: () => Toastify('error', 'Failed to create account'),
    onSuccess: () => Toastify('success', 'Account created successfully'),
    ...options
  })
}
