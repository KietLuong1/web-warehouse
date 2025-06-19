import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createInventory } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateInventory(options) {
    const { mutate: onCreateInventory, isPending, isSuccess, error } = useMutation({
        mutationFn: createInventory,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateInventory,
        isPending,
        isSuccess,
        error
    };
}
