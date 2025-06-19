import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { deleteReport } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteReport(options) {
    const { mutate: onDeleteReport, isPending: isDeleting, isSuccess, error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = useMutation({
        mutationFn: (data) => deleteReport(data),
        onError: () => {
            Toastify('error', 'Something went wrong please try again!');
        },
        ...options
    });
    return {
        onDeleteReport,
        isDeleting,
        isSuccess,
        error
    };
}
