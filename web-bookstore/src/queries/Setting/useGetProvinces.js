import { useQuery } from '@tanstack/react-query';
import { fetchListProvince } from './api';
export function useProvinces() {
    const { data, isLoading, error, refetch: onGetListProvinces } = useQuery({ queryKey: ['provinces'], queryFn: fetchListProvince });
    const { data: provinces } = data || {};
    return {
        provinces,
        isLoading,
        error,
        onGetListProvinces
    };
}
