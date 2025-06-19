import { useMutation } from '@tanstack/react-query';
import { changePassword } from './api';
import { Toastify } from '../../components/Toastify';
export function useChangePassword(options) {
    return useMutation({
        mutationFn: ({ email, payload }) => changePassword(email, payload),
        onError: () => Toastify('error', 'Failed to change password'),
        onSuccess: () => Toastify('success', 'Password changed successfully'),
        ...options
    });
}
