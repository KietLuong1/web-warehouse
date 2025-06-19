import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { createReport } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCreateReport(options) {
    const { mutate: onCreateReport, isPending, isSuccess, error } = useMutation({
        mutationFn: createReport,
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onCreateReport,
        isPending,
        isSuccess,
        error
    };
}
