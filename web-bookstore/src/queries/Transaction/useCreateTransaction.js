import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createTransaction } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateTransaction(options) {
    const { mutate: onCreateTransaction, isPending, isSuccess, error } = useMutation({
        mutationFn: createTransaction,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateTransaction,
        isPending,
        isSuccess,
        error
    };
}
