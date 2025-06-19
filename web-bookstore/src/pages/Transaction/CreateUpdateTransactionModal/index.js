import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, Stack } from '@mui/material';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toastify } from '../../../components/Toastify';
import { TransactionKey } from '../../../queries';
import { useCreateTransaction } from '../../../queries/Transaction/useCreateTransaction';
import { useGetListTransactions } from '../../../queries/Transaction/useGetListTransactions';
import { useTransactionDetail } from '../../../queries/Transaction/useTransactionDetail';
import { useUpdateTransaction } from '../../../queries/Transaction/useUpdateTransaction';
import { TransactionInitValues, TransactionValidationSchema } from './helpers';
import './styles.scss';
export const CreateUpdateTransactionModal = ({ transactionId, onCloseModal, isEdit = false }) => {
    const { handleInvalidateListTransactions } = useGetListTransactions();
    const { onCreateTransaction, isPending: isCreatingLoading } = useCreateTransaction({
        onSuccess: () => {
            Toastify('success', 'Record has been added successfully!');
            handleInvalidateListTransactions();
            reset(TransactionInitValues);
            onCloseModal();
        }
    });
    const { onUpdateTransaction, isPending: isUpdating } = useUpdateTransaction({
        onSuccess: () => {
            Toastify(`success`, `Record has been updated successfully.`);
            handleInvalidateListTransactions();
            handleInvalidateDetail();
            onCloseModal();
        }
    });
    const { transaction: detailData, handleInvalidateDetail } = useTransactionDetail({
        id: transactionId ?? ''
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: TransactionInitValues,
        mode: 'onBlur',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        resolver: yupResolver(TransactionValidationSchema)
    });
    useEffect(() => {
        if (isEdit && detailData) {
            reset({
                transactionType: detailData.transactionType,
                totalPrice: detailData.totalPrice,
                totalProducts: detailData.totalProducts,
                status: detailData.status,
                description: detailData.description || '',
                createdAt: detailData.createdAt,
                product: {
                    ...TransactionInitValues.product,
                    ...detailData.product
                }
            });
        }
    }, [detailData, isEdit, reset]);
    const handleCancel = () => {
        if (!isEdit) {
            reset(TransactionInitValues);
        }
        onCloseModal();
    };
    const onSubmit = (data) => {
        if (isEdit) {
            if (!transactionId) {
                Toastify('error', 'An ID is missing for update operation.');
                return;
            }
            onUpdateTransaction({
                data,
                id: transactionId
            });
        }
        else {
            const result = {
                ...data
            };
            onCreateTransaction(result);
        }
    };
    return (_jsx(Form, { layout: 'vertical', onFinish: handleSubmit(onSubmit), children: _jsxs(Grid2, { container: true, children: [_jsx(Grid2, { size: 12, children: _jsx(Controller, { name: TransactionKey.TRANSACTION_TYPE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Transaction Type', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Transaction Type' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: 'product.name', control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Product Name', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Product Name' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: TransactionKey.TOTAL_PRICE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Total Price', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Total Price' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: TransactionKey.TOTAL_PRODUCTS, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Total Products', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Total Products' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: TransactionKey.STATUS, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Status', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsxs("select", { ...field, className: `status-dropdown ${error ? 'error' : ''}`, children: [_jsx("option", { value: 'PENDING', children: "Pending" }), _jsx("option", { value: 'PROCESSING', children: "Processing" }), _jsx("option", { value: 'COMPLETED', children: "Completed" })] }) })) }) }), _jsx(Grid2, { size: 12, children: _jsxs(Stack, { display: 'flex', justifyContent: 'flex-end', direction: 'row', children: [_jsx(Button, { disabled: isCreatingLoading || isUpdating, variant: 'outlined', color: 'error', onClick: handleCancel, children: "Cancel" }), _jsx(Button, { type: 'submit', variant: 'contained', size: 'large', color: 'primary', style: { marginLeft: '16px' }, children: "Save" })] }) })] }) }));
};
