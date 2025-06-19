import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './styles.scss';
import Image from 'material-ui-image';
import { IMAGES } from '../../configs/images';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { Toastify } from '../../components/Toastify';
import { Controller, useForm } from 'react-hook-form';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { useAuthentication } from '../../context/AuthenticationContext';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { loginApi } from '../../queries/Login/api';
const Login = () => {
    const { login } = useAuthentication();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    });
    const onSubmit = async (data) => {
        try {
            const response = await loginApi({
                email: data.email,
                password: data.password,
                remember: data.remember
            });
            const { accessToken, refreshToken, userRole, userId } = response;
            if (accessToken && refreshToken) {
                login({ accessToken, refreshToken, userId, userRole });
                const storage = data.remember ? localStorage : sessionStorage;
                storage.setItem('userRole', userRole);
                storage.setItem('userId', userId.toString());
                Toastify('success', 'Login successfully');
                navigate('/dashboard');
            }
            else {
                Toastify('error', 'Invalid credentials');
            }
        }
        catch (error) {
            Toastify('error', 'An error occurred during login');
            console.error('Login error:', error);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (_jsx(Container, { maxWidth: 'xs', className: 'login-container', children: _jsxs(Box, { className: 'login-container_box', children: [_jsxs(Stack, { className: 'img-container', sx: { flexDirection: 'row' }, children: [_jsx(Image, { src: IMAGES.logo, style: {
                                display: 'block',
                                paddingTop: '2px',
                                backgroundColor: 'transparent'
                            }, imageStyle: {
                                height: '45px',
                                width: 'auto',
                                position: 'relative',
                                borderRadius: '30%'
                            }, disableSpinner: true, disableTransition: true }), _jsx(Stack, { children: _jsx(Typography, { color: '#009DC3', fontWeight: 700, variant: 'h5', fontFamily: 'Poppins', children: "WMS" }) })] }), _jsx(Typography, { fontWeight: 600, variant: 'h4', fontFamily: 'Poppins', marginBottom: 3, children: "Sign in" }), _jsxs(Form, { layout: 'vertical', initialValues: { remember: true }, onFinish: handleSubmit(onSubmit), autoComplete: 'off', children: [_jsx(Form.Item, { required: true, label: 'Email', validateStatus: errors.email ? 'error' : '', help: errors.email ? _jsx("span", { style: { textAlign: 'left', display: 'block' }, children: errors.email.message }) : null, children: _jsx(Controller, { name: 'email', control: control, rules: { required: 'Please input your email!' }, render: ({ field }) => _jsx(Input, { ...field, placeholder: 'Email' }) }) }), _jsx(Form.Item, { required: true, label: 'Password', validateStatus: errors.password ? 'error' : '', help: errors.password ? (_jsx("span", { style: { textAlign: 'left', display: 'block' }, children: errors.password.message })) : null, children: _jsx(Controller, { name: 'password', control: control, rules: { required: 'Please input your password!' }, render: ({ field }) => _jsx(Input.Password, { ...field, placeholder: 'Password' }) }) }), _jsx(Form.Item, { children: _jsx(Controller, { name: 'remember', control: control, render: ({ field }) => (_jsxs(Stack, { direction: 'row', justifyContent: 'space-between', alignItems: 'center', sx: { width: '100%' }, children: [_jsx(Checkbox, { ...field, checked: field.value, children: "Remember me" }), _jsx(Link, { href: '#', variant: 'body2', color: 'textSecondary', sx: {
                                                fontWeight: 500,
                                                '&:hover': {
                                                    color: '#006882'
                                                }
                                            }, onClick: handleClickOpen, children: "Forgot password?" }), _jsx(ForgotPassword, { open: open, handleClose: handleClose })] })) }) }), _jsx(Form.Item, { label: null, children: _jsx(Button, { type: 'primary', htmlType: 'submit', children: "Submit" }) })] })] }) }));
};
export default Login;
