import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createLocation } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateLocation(options) {
    const { mutate: onCreateLocation, isPending, isSuccess, error } = useMutation({
        mutationFn: createLocation,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateLocation,
        isPending,
        isSuccess,
        error
    };
}
