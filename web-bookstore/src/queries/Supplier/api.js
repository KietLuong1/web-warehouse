import { productAxiosInstance } from '../../configs/services/http/index';
export const fetchListSuppliers = async () => {
    try {
        const response = await productAxiosInstance.get(`/suppliers`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch list suppliers:', error);
        throw error;
    }
};
export const getSupplierById = async ({ id }) => {
    try {
        const response = await productAxiosInstance.get(`/suppliers/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to get supplier:', error);
        throw error;
    }
};
export const createSupplier = async (body) => {
    try {
        const response = await productAxiosInstance.post(`/suppliers`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to create supplier:', error);
        throw error;
    }
};
export const updateSupplier = async (body, id) => {
    try {
        const response = await productAxiosInstance.put(`/suppliers/${id}`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update supplier:', error);
        throw error;
    }
};
export const deleteSupplier = async (body) => {
    const { supplierId } = body;
    try {
        const response = await productAxiosInstance.delete(`/suppliers/${supplierId}`, {});
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete supplier:', error);
        throw error;
    }
};
