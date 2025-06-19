import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, Stack } from '@mui/material';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toastify } from '../../../components/Toastify';
import { ProductKey } from '../../../queries';
import { useCreateProduct } from '../../../queries/Product/useCreateProduct';
import { useGetListProducts } from '../../../queries/Product/useGetListProducts';
import { useProductDetail } from '../../../queries/Product/useProductDetail';
import { useUpdateProduct } from '../../../queries/Product/useUpdateProduct';
import { useGetListCategories } from '../../../queries/Setting/useGetListCategories';
import { ProductInitValues, ProductValidationSchema } from './helpers';
import './styles.scss';
export const CreateUpdateProductModal = ({ productId, onCloseModal, isEdit = false }) => {
    const { categories, isFetching: categoriesLoading } = useGetListCategories();
    const { handleInvalidateListProducts } = useGetListProducts();
    const { onCreateProduct, isPending: isCreatingLoading } = useCreateProduct({
        onSuccess: () => {
            Toastify('success', 'Product has been added successfully!');
            handleInvalidateListProducts();
            reset(ProductInitValues);
            onCloseModal();
        },
        onError: (error) => {
            console.error('Create product error details:', {
                error,
                status: error?.status || error?.response?.status,
                message: error?.message || error?.response?.data?.message,
                data: error?.response?.data,
                fullResponse: error?.response
            });
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create product';
            Toastify('error', errorMessage);
            if (error?.status === 500 || error?.response?.status === 500) {
                setTimeout(() => {
                    alert(`Server Error: ${errorMessage}`);
                }, 2000);
            }
        }
    });
    const { onUpdateProduct, isPending: isUpdating } = useUpdateProduct({
        onSuccess: () => {
            Toastify(`success`, `Product has been updated successfully.`);
            handleInvalidateListProducts();
            handleInvalidateDetail();
            onCloseModal();
        },
        onError: (error) => {
            console.error('Update product error details:', {
                error,
                status: error?.status || error?.response?.status,
                message: error?.message || error?.response?.data?.message,
                data: error?.response?.data,
                fullResponse: error?.response
            });
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update product';
            Toastify('error', errorMessage);
        }
    });
    const { product: detailData, handleInvalidateDetail } = useProductDetail({
        id: productId ?? ''
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: ProductInitValues,
        mode: 'onBlur',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        resolver: yupResolver(ProductValidationSchema)
    });
    useEffect(() => {
        if (!isEdit) {
            reset(ProductInitValues);
        }
    }, [isEdit, reset]);
    useEffect(() => {
        if (isEdit && detailData) {
            reset({
                [ProductKey.CATEGORY_ID]: detailData.categoryId || '',
                [ProductKey.NAME]: detailData.name || '',
                [ProductKey.SKU]: detailData.sku || '',
                [ProductKey.PRICE]: detailData.price || 0,
                [ProductKey.STOCK_QUANTITY]: detailData.stockQuantity || 0,
                [ProductKey.DESCRIPTION]: detailData.description || ''
            });
        }
    }, [detailData, isEdit, reset]);
    const handleCancel = () => {
        reset(ProductInitValues);
        onCloseModal();
    };
    const onSubmit = (data) => {
        if (!data.categoryId) {
            Toastify('error', 'Please select a category');
            return;
        }
        if (!data.name || !data.sku) {
            Toastify('error', 'Please fill in all required fields');
            return;
        }
        const cleanedData = {
            ...data,
            price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
            stockQuantity: typeof data.stockQuantity === 'string' ? parseInt(data.stockQuantity) : data.stockQuantity
        };
        if (isEdit) {
            if (!productId) {
                Toastify('error', 'An ID is missing for update operation.');
                return;
            }
            onUpdateProduct({
                data: cleanedData,
                id: productId
            });
        }
        else {
            onCreateProduct(cleanedData);
        }
    };
    return (_jsxs(Form, { layout: 'vertical', onFinish: handleSubmit(onSubmit), children: [_jsxs(Grid2, { container: true, spacing: 1, children: [_jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ProductKey.NAME, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Product Name', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Product Name' }) })) }) }), _jsx(Grid2, { size: 6, children: _jsx(Controller, { name: ProductKey.CATEGORY_ID, control: control, render: ({ field, fieldState: { error } }) => {
                                return (_jsx(Form.Item, { label: 'Category', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsxs("div", { className: 'select-wrapper', children: [_jsxs("select", { value: field.value || '', onChange: (e) => field.onChange(e.target.value), onBlur: field.onBlur, className: `custom-select ${error ? 'error' : ''}`, children: [_jsx("option", { value: '', children: "Select Category" }), Array.isArray(categories) &&
                                                        categories.map((category) => (_jsx("option", { value: category.id, children: category.name }, category.id)))] }), field.value && (_jsx("button", { type: 'button', className: 'clear-button', onClick: () => field.onChange(''), title: 'Clear selection', children: "\u2715" }))] }) }));
                            } }) }), _jsx(Grid2, { size: 6, children: _jsx(Controller, { name: ProductKey.SKU, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'SKU', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Product SKU' }) })) }) }), _jsx(Grid2, { size: 6, children: _jsx(Controller, { name: ProductKey.PRICE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Price', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Product Price', prefix: '$' }) })) }) }), _jsx(Grid2, { size: 6, children: _jsx(Controller, { name: ProductKey.STOCK_QUANTITY, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Stock Quantity', validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Stock Quantity' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ProductKey.DESCRIPTION, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Description', validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input.TextArea, { ...field, placeholder: 'Enter Product Description', rows: 3 }) })) }) })] }), _jsx(Grid2, { size: 12, children: _jsxs(Stack, { display: 'flex', justifyContent: 'flex-end', direction: 'row', spacing: 2, children: [_jsx(Button, { disabled: isCreatingLoading || isUpdating, variant: 'outlined', color: 'error', onClick: handleCancel, children: "Cancel" }), _jsx(Button, { type: 'submit', variant: 'contained', size: 'large', color: 'primary', disabled: isCreatingLoading || isUpdating || categoriesLoading, children: isEdit ? 'Update' : 'Create' })] }) })] }));
};
