import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateProduct } from './api';
export function useUpdateProduct(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateProduct, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateProduct(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateProduct,
        isPending,
        isSuccess,
        error
    };
}
