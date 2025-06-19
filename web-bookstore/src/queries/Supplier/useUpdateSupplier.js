import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateSupplier } from './api';
export function useUpdateSupplier(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateSupplier, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateSupplier(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateSupplier,
        isPending,
        isSuccess,
        error
    };
}
