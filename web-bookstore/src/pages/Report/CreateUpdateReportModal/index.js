import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Grid2, Stack } from '@mui/material';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toastify } from '../../../components/Toastify';
import { ReportKey } from '../../../queries/Reports';
import { useCreateReport } from '../../../queries/Reports/useCreateReport';
import { useGetListReport } from '../../../queries/Reports/useGetListReports';
import { useGetReportDetail } from '../../../queries/Reports/useReportDetail';
import { useUpdateReport } from '../../../queries/Reports/useUpdateReport';
import { ReportInitValues } from './helpers';
export const CreateUpdateReportModal = ({ id, onCloseModal, isEdit = false }) => {
    const { handleInvalidateListReport } = useGetListReport();
    const { onCreateReport, isPending: isCreatingLoading } = useCreateReport({
        onSuccess: () => {
            Toastify('success', 'Record has been added successfully!');
            handleInvalidateListReport();
            reset(ReportInitValues);
            onCloseModal();
        }
    });
    const { onUpdateReport, isPending: isUpdating } = useUpdateReport({
        onSuccess: () => {
            Toastify(`success`, `Record has been updated successfully.`);
            handleInvalidateListReport();
            handleInvalidateDetail();
            onCloseModal();
        }
    });
    const { data: detailData, handleInvalidateDetail } = useGetReportDetail({
        id: id ?? ''
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {},
        mode: 'onChange',
        shouldFocusError: true,
        reValidateMode: 'onChange'
    });
    useEffect(() => {
        if (isEdit) {
            if (detailData && !Array.isArray(detailData)) {
                reset(detailData);
            }
        }
    }, [detailData, isEdit, reset]);
    const handleCancel = () => {
        if (!isEdit) {
            reset(ReportInitValues);
        }
        onCloseModal();
    };
    const onSubmit = (data) => {
        if (isEdit) {
            if (!id) {
                Toastify('error', 'An ID is missing for update operation.');
                return;
            }
            onUpdateReport({ data, id: id });
        }
        else {
            onCreateReport(data);
        }
    };
    return (_jsx(Form, { layout: 'vertical', onFinish: handleSubmit(onSubmit), children: _jsxs(Grid2, { container: true, children: [_jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.ID, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'ID', required: true, children: _jsx(Input, { ...field, placeholder: 'Enter ID', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.NAME, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Product Name', required: true, children: _jsx(Input, { ...field, placeholder: 'Enter Product Name', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.INVENTORY, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Inventory', required: true, children: _jsx(Input, { ...field, placeholder: 'Enter Quantity', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.PRICE, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Price', required: true, children: _jsx(Input, { ...field, placeholder: 'Enter Price', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.SUPPLIER, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Supplier', required: true, children: _jsx(Input, { ...field, placeholder: 'Enter Supplier', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsx(Controller, { name: ReportKey.DESCRIPTION, control: control, render: ({ field, fieldState: { error } }) => (_jsx(Form.Item, { label: 'Description', required: true, children: _jsx(Input.TextArea, { ...field, placeholder: 'Enter Description', "aria-errormessage": error?.message }) })) }) }), _jsx(Grid2, { size: 12, children: _jsxs(Stack, { display: 'flex', justifyContent: 'flex-end', direction: 'row', children: [_jsx(Button, { disabled: isCreatingLoading || isUpdating, variant: 'outlined', color: 'error', onClick: handleCancel, children: "Cancel" }), _jsx(Button, { type: 'submit', variant: 'contained', size: 'large', color: 'primary', style: { marginLeft: '16px' }, children: "Save" })] }) })] }) }));
};
