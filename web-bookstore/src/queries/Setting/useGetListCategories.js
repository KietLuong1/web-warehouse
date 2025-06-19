/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListCategories } from './api';
export function useGetListCategories(options) {
    const { data, error, isFetching, refetch: onGetAllListCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchListCategories,
        ...options
    });
    const queryClient = useQueryClient();
    const { categories } = data || {};
    const handleInvalidateListCategories = () => queryClient.invalidateQueries({ queryKey: ['categories'] });
    return { categories, error, isFetching, onGetAllListCategories, handleInvalidateListCategories };
}
