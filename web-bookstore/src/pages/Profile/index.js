import { jsx as _jsx } from "react/jsx-runtime";
import Grid from '@mui/material/Grid';
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail';
import SettingsCard from './SettingCard';
import { Spin } from 'antd';
const Profile = () => {
    const userId = Number(localStorage.getItem('userId') || 0);
    const { data: account, isFetching } = useGetAccountDetail(userId, {
        enabled: !!userId,
        queryKey: ['user', userId]
    });
    if (isFetching) {
        return _jsx(Spin, { tip: 'Loading profile\u2026' });
    }
    if (!account) {
        return _jsx("div", { children: "Unable to load your profile." });
    }
    return (_jsx(Grid, { container: true, spacing: 3, sx: { p: 1, minHeight: '100vh' }, children: _jsx(Grid, { item: true, xs: 12, md: 12, children: _jsx(SettingsCard, { account: account }) }) }));
};
export default Profile;
