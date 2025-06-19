import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccountById } from './api';
export function useGetAccountDetail(userId, options) {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getAccountById(userId),
        enabled: !!userId,
        ...options
    });
    return {
        ...query,
        refetch: query.refetch,
        invalidate: () => queryClient.invalidateQueries({ queryKey: ['user', userId] })
    };
}
