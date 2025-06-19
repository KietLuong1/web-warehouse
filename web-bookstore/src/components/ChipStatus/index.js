import { jsx as _jsx } from "react/jsx-runtime";
import { RemoveCircleOutline as ClosedIcon, HourglassEmpty as InProgressIcon, Schedule as PendingIcon } from '@mui/icons-material';
import { Chip } from '@mui/material';
// export type CustomChipStatus = 'In progress' | 'Active' | 'Inactive' | 'Closed'
// Define custom styles for each status icon
const statusStyles = (variant) => {
    const iconStyle = { color: 'white', fontSize: '1.25rem', borderRadius: '50%' };
    switch (variant) {
        case 'PROCESSING':
            return {
                icon: _jsx(InProgressIcon, { style: iconStyle }),
                backgroundColor: '#1677FF'
            };
        case 'PENDING':
            return {
                icon: _jsx(PendingIcon, { style: iconStyle }),
                backgroundColor: '#faad14'
            };
        case 'COMPLETED':
            return {
                icon: _jsx(ClosedIcon, { style: iconStyle }),
                backgroundColor: '#6C757D'
            };
        default:
            return {
                icon: _jsx(InProgressIcon, { style: iconStyle }),
                backgroundColor: '#1677FF'
            };
    }
};
const ChipStatus = ({ status }) => {
    const { icon, backgroundColor } = statusStyles(status);
    return (_jsx(Chip, { label: status, icon: icon, 
        // className='flex items-center capitalize'
        sx: {
            backgroundColor: backgroundColor,
            color: 'white',
            pointerEvents: 'none'
        } }));
};
export default ChipStatus;
