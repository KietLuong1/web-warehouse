import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteSupplier } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteSupplier(options) {
    const { mutate: onDeleteSupplier, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteSupplier(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteSupplier,
        isDeleting,
        isSuccess,
        error
    };
}
