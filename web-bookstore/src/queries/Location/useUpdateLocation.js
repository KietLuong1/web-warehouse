import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateLocation } from './api';
export function useUpdateLocation(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateLocation, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateLocation(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateLocation,
        isPending,
        isSuccess,
        error
    };
}
