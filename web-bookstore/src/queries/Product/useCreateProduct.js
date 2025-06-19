import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createProduct } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateProduct(options) {
    const { mutate: onCreateProduct, isPending, isSuccess, error } = useMutation({
        mutationFn: createProduct,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateProduct,
        isPending,
        isSuccess,
        error
    };
}
