import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createSupplier } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateSupplier(options) {
    const { mutate: onCreateSupplier, isPending, isSuccess, error } = useMutation({
        mutationFn: createSupplier,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateSupplier,
        isPending,
        isSuccess,
        error
    };
}
