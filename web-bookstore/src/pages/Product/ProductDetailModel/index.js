import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { Modal } from 'antd';
import { useGetListCategories } from '../../../queries/Setting/useGetListCategories';
export const ProductDetailModal = ({ isVisible, onClose, productData }) => {
    const { categories } = useGetListCategories();
    if (!productData)
        return null;
    const getCategoryName = (categoryId) => {
        if (!categories || !Array.isArray(categories))
            return categoryId;
        const category = categories.find((cat) => cat.id === categoryId);
        return category?.name || categoryId;
    };
    const formatDate = (dateString) => {
        if (!dateString)
            return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        catch (error) {
            return dateString;
        }
    };
    return (_jsx(Modal, { title: _jsx(Typography, { variant: 'h6', children: "Product Details" }), open: isVisible, onCancel: onClose, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '12px', backgroundColor: 'transparent' } }, children: _jsx(Stack, { spacing: 2, children: _jsxs(Box, { children: [_jsx(Divider, { sx: { my: 1 } }), _jsxs(Grid, { container: true, spacing: 2, children: [productData.name && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Name" }), _jsx(Typography, { variant: 'body1', children: productData.name })] })), productData.categoryId && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Category" }), _jsx(Typography, { variant: 'body1', children: getCategoryName(productData.categoryId) })] })), productData.price && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Price" }), _jsxs(Typography, { variant: 'body1', children: ["$", productData.price] })] })), productData.sku && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Sku" }), _jsx(Typography, { variant: 'body1', children: productData.sku })] })), productData.createdAt && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Create Date" }), _jsx(Typography, { variant: 'body1', children: formatDate(productData.createdAt) })] })), productData.expiryDate && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Expired Date" }), _jsx(Typography, { variant: 'body1', children: formatDate(productData.expiryDate) })] })), productData.stockQuantity && (_jsxs(Grid, { item: true, xs: 6, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Stock Quantity" }), _jsx(Typography, { variant: 'body1', children: productData.stockQuantity })] })), productData.description && (_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: 'body2', color: 'text.secondary', children: "Description" }), _jsx(Typography, { variant: 'body1', children: productData.description })] }))] })] }) }) }));
};
