import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById } from './api';
export function useProductDetail(options) {
    const { data: rawData, isPending: isLoadingDetail, isSuccess, error, refetch: getProductDetail } = useQuery({
        queryKey: ['products', { ...options }],
        queryFn: () => getProductById({ id: options.id }),
        ...options
    });
    const data = rawData;
    const queryClient = useQueryClient();
    const handleInvalidateDetail = () => queryClient.invalidateQueries({ queryKey: ['products', { id: options.id }] });
    const { product } = data || {};
    return {
        product,
        isLoadingDetail,
        isSuccess,
        error,
        getProductDetail,
        handleInvalidateDetail
    };
}
