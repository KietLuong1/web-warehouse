import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { changePassword, ChangePasswordPayload } from './api'
import { Toastify } from '../../components/Toastify'

export function useChangePassword(
  options?: UseMutationOptions<void, Error, { email: string; payload: ChangePasswordPayload }>
) {
  return useMutation({
    mutationFn: ({ email, payload }) => changePassword(email, payload),
    onError: () => Toastify('error', 'Failed to change password'),
    onSuccess: () => Toastify('success', 'Password changed successfully'),
    ...options
  })
}
