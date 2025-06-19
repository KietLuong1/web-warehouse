import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListSuppliers } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListSuppliers(options) {
    const { data, error, isFetching, refetch: onGetAllListSuppliers } = useQuery({
        queryKey: ['suppliers'],
        queryFn: fetchListSuppliers,
        ...options
    });
    const queryClient = useQueryClient();
    const handleInvalidateListSuppliers = () => queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    return { data, error, isFetching, onGetAllListSuppliers, handleInvalidateListSuppliers };
}
