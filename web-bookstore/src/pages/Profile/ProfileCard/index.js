import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CameraOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Stack } from '@mui/material';
import { Avatar, Button, Card, Space, Typography, Upload } from 'antd';
import './styles.scss';
const { Title, Text } = Typography;
export default function ProfileCard({ name = 'John Doe', sub = 'Software Engineer', avatarUrl }) {
    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            // Handle avatar upload logic
            console.log('Avatar uploaded', info.file);
        }
    };
    return (_jsxs(Card, { className: 'card-container', bordered: true, children: [_jsx(Stack, { className: 'card-container__background' }), _jsxs(Space, { direction: 'vertical', align: 'center', size: 'large', style: { zIndex: 2, position: 'relative' }, children: [_jsx(Upload, { name: 'avatar', listType: 'picture-circle', className: 'avatar-uploader', showUploadList: false, action: '/api/upload', onChange: handleAvatarUpload, children: _jsxs(Space, { style: {
                                position: 'relative',
                                cursor: 'pointer'
                            }, children: [_jsx(Avatar, { size: 90, src: 'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png', icon: _jsx(UserOutlined, {}), className: 'card-container__avatar' }), _jsx(Space, { className: 'card-container__camera', children: _jsx(CameraOutlined, { style: { color: 'white', fontSize: 16 } }) })] }) }), _jsxs(Space, { direction: 'vertical', align: 'center', children: [_jsx(Title, { level: 4, style: { margin: 0, marginBottom: 4 }, children: name }), _jsx(Text, { type: 'secondary', children: sub })] }), _jsx(Button, { type: 'primary', block: true, icon: _jsx(EditOutlined, {}), style: {
                            height: 44,
                            borderRadius: 8
                        }, children: "View Public Profile" })] })] }));
}
