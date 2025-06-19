import { productAxiosInstance } from '../../configs/services/http/index';
export const fetchListProducts = async (params = { page: 1, size: 10 }) => {
    try {
        const response = await productAxiosInstance.get(`/products/all`, { params });
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch list products:', error);
        throw error;
    }
};
export const getProductById = async ({ id }) => {
    try {
        const response = await productAxiosInstance.get(`/products/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to get product:', error);
        throw error;
    }
};
export const createProduct = async (body) => {
    try {
        const response = await productAxiosInstance.post(`/products/add`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to create product:', error);
        throw error;
    }
};
export const updateProduct = async (body, id) => {
    try {
        const response = await productAxiosInstance.put(`/products/${id}`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update product:', error);
        throw error;
    }
};
export const deleteProduct = async (body) => {
    const { id } = body;
    try {
        const response = await productAxiosInstance.delete(`/products/delete/${id}`, {});
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete product:', error);
        throw error;
    }
};
