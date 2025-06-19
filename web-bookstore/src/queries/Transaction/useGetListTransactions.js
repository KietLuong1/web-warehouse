/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchListTransactions, searchTransactionsByProductName } from './api';
export function useGetListTransactions(initialParams = { page: 1, size: 10, keyword: '' }, options) {
    const [params, setParams] = useState(initialParams);
    const { data, error, isFetching, refetch: onGetAllListTransactions } = useQuery({
        queryKey: ['transactions', params.page, params.size, params.keyword?.trim() || ''],
        queryFn: () => {
            if (params.keyword && params.keyword.trim() !== '') {
                return searchTransactionsByProductName(params);
            }
            return fetchListTransactions({ page: params.page, size: params.size });
        },
        ...options
    });
    const queryClient = useQueryClient();
    const { transactions, totalElements, totalPages, pageSize } = data || {};
    const handleInvalidateListTransactions = () => queryClient.invalidateQueries({ queryKey: ['transactions'] });
    return {
        totalElements,
        totalPages,
        pageSize,
        transactions: Array.isArray(transactions) ? transactions : [],
        error,
        isFetching,
        onGetAllListTransactions,
        handleInvalidateListTransactions,
        setParams
    };
}
