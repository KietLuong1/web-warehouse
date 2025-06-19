import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSupplierById } from './api';
export function useSupplierDetail(options) {
    const { data, isPending: isLoadingDetail, isSuccess, error, refetch: getSupplierDetail } = useQuery({
        queryKey: ['suppliers', { ...options }],
        queryFn: () => getSupplierById({ id: options.id }),
        ...options
    });
    const queryClient = useQueryClient();
    const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['suppliers', { id: options.id }] });
    return {
        data,
        isLoadingDetail,
        isSuccess,
        error,
        getSupplierDetail,
        handleInvalidateDetail
    };
}
