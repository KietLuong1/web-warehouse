import { useState, useEffect, useCallback } from 'react';
import warehouseService from './services/warehouse.service';
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await warehouseService.getAllProducts();
            setProducts(response.data.products || []);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);
    const searchProducts = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            const response = await warehouseService.searchProducts(searchTerm);
            setProducts(response.data.products || []);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Search failed';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    const createProduct = async (formData) => {
        await warehouseService.createProduct(formData);
        await loadProducts(); // Refresh the list
    };
    const updateProduct = async (formData) => {
        await warehouseService.updateProduct(formData);
        await loadProducts(); // Refresh the list
    };
    const deleteProduct = async (productId) => {
        await warehouseService.deleteProduct(productId);
        await loadProducts();
    };
    return {
        products,
        loading,
        error,
        refresh: loadProducts,
        searchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
};
