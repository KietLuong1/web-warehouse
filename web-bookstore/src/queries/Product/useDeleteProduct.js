import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteProduct } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteProduct(options) {
    const { mutate: onDeleteProduct, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteProduct(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteProduct,
        isDeleting,
        isSuccess,
        error
    };
}
