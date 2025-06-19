import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListLocation } from './api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetListLocation(options) {
    const { data, error, isFetching, refetch: onGetAllListLocation } = useQuery({
        queryKey: ['location'],
        queryFn: fetchListLocation,
        ...options
    });
    const queryClient = useQueryClient();
    const handleInvalidateListLocation = () => queryClient.invalidateQueries({ queryKey: ['location'] });
    return { data, error, isFetching, onGetAllListLocation, handleInvalidateListLocation };
}
