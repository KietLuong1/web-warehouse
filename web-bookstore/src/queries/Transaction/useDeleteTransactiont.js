import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteTransaction } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteTransaction(options) {
    const { mutate: onDeleteTransaction, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteTransaction(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteTransaction,
        isDeleting,
        isSuccess,
        error
    };
}
