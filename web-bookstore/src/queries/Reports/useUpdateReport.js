import { useMutation } from '@tanstack/react-query';
import { Toastify } from '../../components/Toastify';
import { updateReport } from './api';
export function useUpdateReport(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
options) {
    const { mutate: onUpdateReport, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ data, id }) => {
            return updateReport(data, id);
        },
        onError: () => {
            Toastify('error', 'Something went wrong. Please try again');
        },
        ...options
    });
    return {
        onUpdateReport,
        isPending,
        isSuccess,
        error
    };
}
