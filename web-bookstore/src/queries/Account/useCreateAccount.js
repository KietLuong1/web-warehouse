import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from './api';
import { Toastify } from '../../components/Toastify';
export function useCreateAccount(options) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createAccount,
        onError: () => Toastify('error', 'Failed to create account'),
        onSuccess: (data, variables, context) => {
            Toastify('success', 'Account created successfully');
            qc.invalidateQueries({ queryKey: ['users'] });
            if (options?.onSuccess)
                options.onSuccess(data, variables, context);
        },
        ...options
    });
}
