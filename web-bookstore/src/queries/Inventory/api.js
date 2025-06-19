import { inventory } from '../../configs/services/http/index';
export const fetchListInventory = async (params = { page: 1, size: 10 }) => {
    try {
        const response = await inventory.get('/inventory/all', { params });
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch list of inventories:', error);
        throw error;
    }
};
export const getInventoryById = async ({ id }) => {
    try {
        const response = await inventory.get(`/inventory/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to get record:', error);
        throw error;
    }
};
export const createInventory = async (body) => {
    try {
        const response = await inventory.post(`/inventory/create`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to create record:', error);
        throw error;
    }
};
export const updateInventory = async (body, id) => {
    try {
        const response = await inventory.put(`/inventory/update/${id}`, body);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update record:', error);
        throw error;
    }
};
export const deleteInventory = async (body) => {
    const { id } = body;
    try {
        const response = await inventory.delete(`/inventory/delete/${id}`, {});
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete record:', error);
        throw error;
    }
};
