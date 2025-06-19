import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccount } from './api';
import { Toastify } from '../../components/Toastify';
export function useUpdateAccount(options) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updateAccount,
        onError: () => Toastify('error', 'Failed to update account'),
        onSuccess: (data, variables, context) => {
            Toastify('success', 'Account updated successfully');
            qc.invalidateQueries({ queryKey: ['users'] });
            if (options?.onSuccess)
                options.onSuccess(data, variables, context);
        },
        ...options
    });
}
