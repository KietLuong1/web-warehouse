import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Input, Row, Select, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { fetchDistrictsByProvince, fetchWardsByDistrict } from '../../../queries/Setting/api';
import { useProvinces } from '../../../queries/Setting/useGetProvinces';
const { TabPane } = Tabs;
const { Option } = Select;
export default function SettingsCard(props) {
    const [form] = Form.useForm();
    const { provinces } = useProvinces();
    const [districts, setDistricts] = useState(null);
    const [wards, setWards] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const data = await fetchDistrictsByProvince(Number(selectedProvince));
                    setDistricts(data);
                }
                catch (err) {
                    console.error('Error fetching districts:', err);
                    setDistricts(null);
                }
                setSelectedDistrict('');
                setSelectedWard('');
                setWards(null);
            }
        };
        fetchDistricts();
    }, [selectedProvince]);
    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const data = await fetchWardsByDistrict(Number(selectedDistrict));
                    setWards(data);
                }
                catch (err) {
                    console.error('Error fetching wards:', err);
                    setWards(null);
                }
                setSelectedWard('');
            }
        };
        fetchWards();
    }, [selectedDistrict]);
    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        form.setFieldsValue({ district: undefined, ward: undefined });
    };
    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        form.setFieldsValue({ ward: undefined });
    };
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const onFinish = (values) => {
        console.log('Submitted values:', values);
        // Add your update logic here
    };
    return (_jsx(Card, { bordered: true, style: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }, children: _jsxs(Form, { form: form, layout: 'vertical', onFinish: onFinish, initialValues: {
                firstName: props.firstName,
                lastName: props.lastName,
                midName: props.midName,
                gender: props.gender,
                phone: props.phone,
                email: props.email
            }, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { md: 24, children: _jsx(Typography, { style: { fontWeight: 'bold', fontSize: 20 }, children: "General Information" }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'firstName', label: 'First Name', rules: [{ required: true, message: 'Please input your first name' }], children: _jsx(Input, { placeholder: 'Enter first name', disabled: !isEditing }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'lastName', label: 'Last Name', rules: [{ required: true, message: 'Please input your last name' }], children: _jsx(Input, { placeholder: 'Enter last name', disabled: !isEditing }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'midName', label: 'Middle Name', children: _jsx(Input, { placeholder: 'Enter middle name', disabled: !isEditing }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'gender', label: 'Gender', rules: [{ required: true, message: 'Please select your gender' }], children: _jsxs(Select, { placeholder: 'Select gender', disabled: !isEditing, children: [_jsx(Option, { value: 'male', children: "Male" }), _jsx(Option, { value: 'female', children: "Female" })] }) }) }), _jsx(Col, { xs: 24, md: 16, children: _jsx(Form.Item, { name: 'email', label: 'Email Address', rules: [
                                    { required: true, message: 'Please input your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ], children: _jsx(Input, { placeholder: 'Enter email address', disabled: !isEditing }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'phone', label: 'Phone Number', rules: [{ required: true, message: 'Please input your phone number' }], children: _jsx(Input, { addonBefore: '+84', placeholder: 'Enter phone number', disabled: !isEditing }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'dateOfBirth', label: 'Date of Birth', rules: [{ required: true, message: 'Please input your date of birth' }], children: _jsx(Input, { type: 'date', placeholder: 'Enter your date of birth' }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { md: 24, children: _jsx(Typography, { style: { fontWeight: 'bold', fontSize: 20 }, children: "Address Information" }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'province', label: 'Province', rules: [{ required: true, message: 'Please select a province' }], children: _jsx(Select, { placeholder: 'Select province', onChange: handleProvinceChange, children: provinces?.map((prov) => (_jsx(Option, { value: prov.id, children: prov.name }, prov.id))) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'district', label: 'District', rules: [{ required: true, message: 'Please select a district' }], children: _jsx(Select, { placeholder: 'Select district', onChange: handleDistrictChange, disabled: !selectedProvince, children: districts?.data.map((dist) => (_jsx(Option, { value: dist.id, children: dist.name }, dist.id))) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'ward', label: 'Ward', rules: [{ required: true, message: 'Please select a ward' }], children: _jsx(Select, { placeholder: 'Select ward', disabled: !selectedDistrict, children: wards?.data.map((ward) => (_jsx(Option, { value: ward.id, children: ward.name }, ward.id))) }) }) }), _jsx(Col, { xs: 24, md: 16, children: _jsx(Form.Item, { name: 'address', label: 'Address', rules: [{ required: true, message: 'Please input your address' }], children: _jsx(Input, { type: 'text', placeholder: 'Enter your address' }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { name: 'No', label: 'No.', children: _jsx(Input, { placeholder: 'No.' }) }) })] }), _jsx(Col, { xs: 24, style: { textAlign: 'right' }, children: _jsx(Form.Item, { children: _jsx(Button, { type: 'primary', onClick: toggleEdit, children: isEditing ? 'Save All' : 'Edit' }) }) })] }) }));
}
