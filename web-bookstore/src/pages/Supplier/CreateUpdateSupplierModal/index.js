import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, Stack } from '@mui/material';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toastify } from '../../../components/Toastify';
import { SupplierKey } from '../../../queries';
import { useCreateSupplier } from '../../../queries/Supplier/useCreateSupplier';
import { useGetListSuppliers } from '../../../queries/Supplier/useGetListSuppliers';
import { useSupplierDetail } from '../../../queries/Supplier/useSupplierDetail';
import { useUpdateSupplier } from '../../../queries/Supplier/useUpdateSupplier';
import { SupplierInitValues, SupplierValidationSchema } from './helpers';
export const CreateUpdateSupplierModal = ({ supplierId, onCloseModal, isEdit = false }) => {
    const { handleInvalidateListSuppliers } = useGetListSuppliers();
    const { onCreateSupplier, isPending: isCreatingLoading } = useCreateSupplier({
        onSuccess: () => {
            Toastify('success', 'Supplier has been added successfully!');
            handleInvalidateListSuppliers();
            reset(SupplierInitValues);
            onCloseModal();
        }
    });
    const { onUpdateSupplier, isPending: isUpdating } = useUpdateSupplier({
        onSuccess: () => {
            Toastify(`success`, `Supplier has been updated successfully.`);
            handleInvalidateListSuppliers();
            handleInvalidateDetail();
            onCloseModal();
        }
    });
    const { data: detailData, handleInvalidateDetail } = useSupplierDetail({
        id: supplierId ?? ''
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: SupplierInitValues,
        mode: 'onBlur',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        resolver: yupResolver(SupplierValidationSchema)
    });
    useEffect(() => {
        if (isEdit && detailData) {
            reset({
                ...detailData,
                [SupplierKey.CREATE_AT]: detailData.create_at ? dayjs(detailData.create_at).format('YYYY-MM-DD') : undefined
            });
        }
    }, [detailData, isEdit, reset]);
    const handleCancel = () => {
        if (!isEdit) {
            reset(SupplierInitValues);
        }
        onCloseModal();
    };
    const onSubmit = (data) => {
        if (isEdit) {
            if (!supplierId) {
                Toastify('error', 'An ID is missing for update operation.');
                return;
            }
            onUpdateSupplier({ data, id: supplierId });
        }
        else {
            const result = {
                ...data,
                [SupplierKey.CREATE_AT]: data[SupplierKey.CREATE_AT]
                    ? dayjs(data[SupplierKey.CREATE_AT]).format('YYYY-MM-DD')
                    : ''
            };
            onCreateSupplier(result);
        }
    };
    return (_jsxs(Form, { layout: 'vertical', onFinish: handleSubmit(onSubmit), children: [_jsxs(Grid2, { container: true, children: [_jsx(Grid2, { size: 12, children: _jsx(Controller, { name: SupplierKey.NAME, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Name', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Supplier Name' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: SupplierKey.EMAIL, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Email', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Supplier Email' }) })) }) })] }), _jsxs(Grid2, { container: true, spacing: 2, size: 12, children: [_jsx(Grid2, { size: 8, children: _jsx(Controller, { name: SupplierKey.PHONE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Phone', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Supplier Phone' }) })) }) }), _jsx(Grid2, { size: 4, children: _jsx(Controller, { name: SupplierKey.CREATE_AT, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Create Date', validateStatus: error ? 'error' : '', help: error?.message, required: true, children: _jsx(DatePicker, { ...field, value: field.value ? dayjs(field.value) : null, onChange: (date) => field.onChange(date), format: 'YYYY-MM-DD', placeholder: 'Enter Create Date' }) })) }) })] }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: SupplierKey.ADDRESS, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Address', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Supplier Address' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsxs(Stack, { display: 'flex', justifyContent: 'flex-end', direction: 'row', children: [_jsx(Button, { disabled: isCreatingLoading || isUpdating, variant: 'outlined', color: 'error', onClick: handleCancel, children: "Cancel" }), _jsx(Button, { type: 'submit', variant: 'contained', size: 'large', color: 'primary', style: { marginLeft: '16px' }, children: "Save" })] }) })] }));
};
