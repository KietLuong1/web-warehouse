import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, MenuItem, Select, Stack } from '@mui/material';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toastify } from '../../../components/Toastify';
import { LocationKey } from '../../../queries';
import { useCreateLocation } from '../../../queries/Location/useCreateLocation';
import { useGetListLocation } from '../../../queries/Location/useGetListLocation';
import { useLocationDetail } from '../../../queries/Location/useLocationDetail';
import { useUpdateLocation } from '../../../queries/Location/useUpdateLocation';
import { LocationInitValues, LocationValidationSchema } from './helpers';
export const CreateUpdateLocationModal = ({ locationId: locationId, onCloseModal, isEdit = false }) => {
    const { handleInvalidateListLocation } = useGetListLocation();
    const { onCreateLocation, isPending: isCreatingLoading } = useCreateLocation({
        onSuccess: () => {
            Toastify('success', 'Location has been added successfully!');
            handleInvalidateListLocation();
            reset(LocationInitValues);
            onCloseModal();
        }
    });
    const { onUpdateLocation, isPending: isUpdating } = useUpdateLocation({
        onSuccess: () => {
            Toastify(`success`, `Location has been updated successfully.`);
            handleInvalidateListLocation();
            handleInvalidateDetail();
            onCloseModal();
        }
    });
    const { data: detailData, handleInvalidateDetail } = useLocationDetail({
        id: locationId ?? ''
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: LocationInitValues,
        mode: 'onBlur',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        resolver: yupResolver(LocationValidationSchema)
    });
    useEffect(() => {
        if (isEdit && detailData) {
            reset(detailData);
        }
    }, [detailData, isEdit, reset]);
    const handleCancel = () => {
        if (!isEdit) {
            reset(LocationInitValues);
        }
        onCloseModal();
    };
    const onSubmit = (data) => {
        if (isEdit) {
            if (!locationId) {
                Toastify('error', 'An ID is missing for update operation.');
                return;
            }
            onUpdateLocation({ data, id: locationId });
        }
        else {
            const result = {
                ...data
            };
            onCreateLocation(result);
        }
    };
    return (_jsx(Form, { layout: 'vertical', onFinish: handleSubmit(onSubmit), children: _jsxs(Grid2, { container: true, children: [_jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.CODE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Code ID', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Code' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.ZONE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Zone Name', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Zone Name' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.SHELF, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Shelf', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Shelf' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.RACK, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Rack', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Rack' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.CAPACITY, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Capacity', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, type: 'number', placeholder: 'Enter Capacity' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.STATUS, control: control, render: ({ field, fieldState: { error } }) => (_jsxs(Form.Item, { label: 'Status', required: true, children: [_jsxs(Select, { ...field, error: !!error, displayEmpty: true, style: { width: '100%' }, renderValue: (selected) => {
                                        if (!selected) {
                                            return _jsx("p", { children: "Select Status" });
                                        }
                                        return selected;
                                    }, children: [_jsx(MenuItem, { value: 'In progress', children: "In Progress" }), _jsx(MenuItem, { value: 'Active', children: "Active" }), _jsx(MenuItem, { value: 'Inactive', children: "Inactive" }), _jsx(MenuItem, { value: 'Closed', children: "Closed" })] }), error && _jsx("p", { style: { color: 'red' }, children: error.message })] })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: LocationKey.DESCRIPTION, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Description', required: true, validateStatus: error ? 'error' : undefined, help: error?.message, children: _jsx(Input, { ...field, placeholder: 'Enter Description' }) })) }) }), _jsx(Grid2, { size: 12, children: _jsxs(Stack, { display: 'flex', justifyContent: 'flex-end', direction: 'row', children: [_jsx(Button, { disabled: isCreatingLoading || isUpdating, variant: 'outlined', color: 'error', onClick: handleCancel, children: "Cancel" }), _jsx(Button, { type: 'submit', variant: 'contained', size: 'large', color: 'primary', style: { marginLeft: '16px' }, children: "Save" })] }) })] }) }));
};
