import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { Toastify } from '../../../components/Toastify';
import { AccountKey } from '../../../queries';
import { useChangePassword } from '../../../queries/Account/useChangePassword';
import { useUpdateAccount } from '../../../queries/Account/useUpdateAccount';
const SettingsCard = ({ account }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateAccount, isPending: updatingProfile } = useUpdateAccount();
    const { mutateAsync: changePassword, isPending: changingPwd } = useChangePassword();
    useEffect(() => {
        form.setFieldsValue({
            [AccountKey.NAME]: account.name,
            [AccountKey.USERNAME]: account.username,
            [AccountKey.EMAIL]: account.email,
            [AccountKey.ROLE]: account.role
        });
    }, [account, form]);
    const onFinish = async (values) => {
        try {
            // 1) Profile update (omit password entirely)
            await updateAccount({
                userId: account.userId,
                name: values.name,
                username: values.username,
                email: values.email,
                role: account.role
            });
            // 2) Change password if they filled it
            if (values.newPassword || values.repeatPassword) {
                if (!values.newPassword || !values.repeatPassword) {
                    Toastify('error', 'Please fill both password fields');
                    return;
                }
                if (values.newPassword !== values.repeatPassword) {
                    Toastify('error', 'Passwords must match');
                    return;
                }
                await changePassword({
                    email: account.email,
                    payload: {
                        password: values.newPassword,
                        repeatPassword: values.repeatPassword
                    }
                });
            }
        }
        catch (e) {
            // Hooks already toastify on error
            console.error(e);
        }
    };
    return (_jsx(Card, { bordered: true, style: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }, children: _jsxs(Form, { form: form, layout: 'vertical', onFinish: onFinish, initialValues: {}, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { md: 24, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: _jsx(Typography, { style: { fontWeight: 'bold', fontSize: 20 }, children: "General Information" }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: 'User Id', children: _jsx(Input, { value: account.userId, disabled: true }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: AccountKey.NAME, label: 'Full Name', rules: [{ required: true, message: 'Please input your full name' }], children: _jsx(Input, { placeholder: 'Enter your full name' }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: AccountKey.USERNAME, label: 'Username', rules: [{ required: true, message: 'Please input your username' }], children: _jsx(Input, { placeholder: 'Enter your username' }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: AccountKey.ROLE, label: 'Role', children: _jsx(Input, { disabled: true }) }) }), _jsx(Col, { xs: 24, md: 16, children: _jsx(Form.Item, { name: AccountKey.EMAIL, label: 'Email Address', rules: [
                                    { required: true, message: 'Please input your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ], children: _jsx(Input, { placeholder: 'Enter your email address' }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { md: 24, children: _jsx(Typography, { style: { fontWeight: 'bold', fontSize: 20 }, children: "Change Password" }) }), _jsx(Col, { xs: 24, md: 24, children: _jsx(Form.Item, { name: 'currentPassword', label: 'Current Password', children: _jsx(Input.Password, { placeholder: 'Enter your current password' }) }) }), _jsx(Col, { xs: 24, md: 24, children: _jsx(Form.Item, { name: 'newPassword', label: 'Repeat New Password', children: _jsx(Input.Password, { placeholder: 'Enter your new password' }) }) }), _jsx(Col, { xs: 24, md: 24, children: _jsx(Form.Item, { name: 'repeatPassword', label: 'Repeat Password', children: _jsx(Input.Password, { placeholder: 'Enter your repeat password' }) }) })] }), _jsx(Col, { xs: 24, style: { textAlign: 'right' }, children: _jsx(Form.Item, { children: _jsx(Button, { type: 'primary', htmlType: 'submit', loading: updatingProfile || changingPwd, children: "Save Changes" }) }) })] }) }));
};
export default SettingsCard;
