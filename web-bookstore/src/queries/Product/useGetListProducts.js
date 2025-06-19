/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchListProducts } from './api';
export function useGetListProducts(initialParams = { page: 1, size: 10 }, options) {
    const [params, setParams] = useState(initialParams);
    const { data, error, isFetching, refetch: onGetAllListProducts } = useQuery({
        queryKey: ['products', params],
        queryFn: () => fetchListProducts(params),
        ...options
    });
    const queryClient = useQueryClient();
    const { products, totalElements, totalPages, pageSize, currentPage } = data || {};
    const handleInvalidateListProducts = () => queryClient.invalidateQueries({ queryKey: ['products'] });
    return {
        products: Array.isArray(products) ? products : [],
        totalElements,
        totalPages,
        error,
        isFetching,
        onGetAllListProducts,
        handleInvalidateListProducts,
        pageSize,
        currentPage,
        setParams
    };
}
