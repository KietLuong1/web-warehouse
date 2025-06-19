import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteInventory } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteInventory(options) {
    const { mutate: onDeleteInventory, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteInventory(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteInventory,
        isDeleting,
        isSuccess,
        error
    };
}
