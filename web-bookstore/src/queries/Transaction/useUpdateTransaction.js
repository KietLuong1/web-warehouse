import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateTransaction } from './api';
export function useUpdateTransaction(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateTransaction, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateTransaction(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateTransaction,
        isPending,
        isSuccess,
        error
    };
}
