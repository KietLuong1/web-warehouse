import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTransactionById } from './api';
export function useTransactionDetail(options) {
    const { data, isPending: isLoadingDetail, isSuccess, error, refetch: getTransactionDetail } = useQuery({
        queryKey: ['transactions', { ...options }],
        queryFn: () => getTransactionById({ id: options.id }),
        ...options
    });
    const queryClient = useQueryClient();
    const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['transactions', { id: options.id }] });
    const { transaction } = data || {};
    return {
        transaction,
        isLoadingDetail,
        isSuccess,
        error,
        getTransactionDetail,
        handleInvalidateDetail
    };
}
