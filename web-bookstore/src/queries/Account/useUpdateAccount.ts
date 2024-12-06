import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateAccount } from './api';
import { AccountTypes } from './types';

export function useUpdateAccount(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, unknown, { data: AccountTypes; id: string }>
) {
  const {
    mutate: onUpdateAccount,
    isPending,
    isSuccess,
    error
  } = useMutation<Error, unknown, { data: AccountTypes; id: string }>({
    mutationFn: ({ data, id }) => {
      return updateAccount(data, id)
    },
    onError: () => {
      Toastify('error', 'Something went wrong. Please try again')
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
