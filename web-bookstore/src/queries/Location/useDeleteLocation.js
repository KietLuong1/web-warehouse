import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteLocation } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteLocation(options) {
    const { mutate: onDeleteLocation, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteLocation(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteLocation,
        isDeleting,
        isSuccess,
        error
    };
}
