import { axiosInstance, productAxiosInstance } from '../../configs/services/http/index';
export const fetchListTransactions = async (params = { page: 1, size: 10 }) => {
    try {
        const response = await productAxiosInstance.get(`/transactions/all`, { params });
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch list imports:', error);
        throw error;
    }
};
export const getTransactionById = async ({ id }) => {
    try {
        const response = await productAxiosInstance.get(`/transactions/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to get record:', error);
        throw error;
    }
};
export const createTransaction = async (body) => {
    try {
        const response = await axiosInstance.post(`/imports`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to create record:', error);
        throw error;
    }
};
export const updateTransaction = async (body, id) => {
    try {
        const response = await productAxiosInstance.put(`/transactions/${id}`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update record:', error);
        throw error;
    }
};
export const deleteTransaction = async (body) => {
    const { id } = body;
    try {
        const response = await axiosInstance.delete(`/imports/${id}`, {});
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete record:', error);
        throw error;
    }
};
export const searchTransactionsByProductName = async (params = { page: 1, size: 10, keyword: '' }) => {
    try {
        const queryParams = {
            keyword: params.keyword || '',
            page: params.page || 1,
            size: params.size || 10
        };
        const searchParams = new URLSearchParams();
        searchParams.append('keyword', queryParams.keyword);
        searchParams.append('page', queryParams.page.toString());
        searchParams.append('size', queryParams.size.toString());
        const response = await productAxiosInstance.get(`/transactions/search`, {
            params: queryParams
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof Error && 'response' in error) {
            const axiosError = error;
            console.error('Error details:', axiosError.response?.data);
            console.error('Error status:', axiosError.response?.status);
        }
        throw error;
    }
};
