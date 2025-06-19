import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateInventory } from './api';
export function useUpdateInventory(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateInventory, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateInventory(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateInventory,
        isPending,
        isSuccess,
        error
    };
}
