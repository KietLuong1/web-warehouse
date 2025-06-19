import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListInventory } from './api';
import { useState } from 'react';
export function useGetListInventory(initialParams = { page: 1, size: 10 }, options) {
    const [params, setParams] = useState(initialParams);
    const { data, error, isFetching, refetch: onGetAllListInventory } = useQuery({
        queryKey: ['inventory', params],
        queryFn: () => fetchListInventory(params),
        ...options
    });
    const queryClient = useQueryClient();
    const handleInvalidateListInventory = () => queryClient.invalidateQueries({ queryKey: ['inventory'] });
    const { totalElements, totalPages, pageSize, currentPage } = data || {};
    return {
        data,
        error,
        isFetching,
        onGetAllListInventory,
        handleInvalidateListInventory,
        setParams,
        totalElements,
        totalPages,
        pageSize,
        currentPage
    };
}
