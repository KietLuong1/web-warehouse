import { Toastify } from '../../../components/Toastify';
export async function responseWrapper(func, [...args] = []) {
    return new Promise(async (res, rej) => {
        try {
            const response = (await func(...args)) || {};
            if (response.ok)
                res(response.data);
            if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
                Toastify('error', 'Connection timeout. Please check your network and try again.');
            }
            rej(response.data);
        }
        catch (err) {
            rej(err);
        }
    });
}
