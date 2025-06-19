import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ReportCard() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (_jsx(Card, { sx: { height: '100%' }, children: _jsxs(CardContent, { children: [_jsx(InsightsRoundedIcon, {}), _jsx(Typography, { component: 'h2', variant: 'subtitle2', gutterBottom: true, sx: { fontWeight: '600' }, children: "View Detailed Report" }), _jsx(Typography, { sx: { color: 'text.secondary', mb: '8px' }, children: "Dive into the comprehensive report for detailed insights on key metrics." }), _jsx(Button, { variant: 'contained', size: 'small', color: 'primary', endIcon: _jsx(ChevronRightRoundedIcon, {}), fullWidth: isSmallScreen, children: "Generate Report" })] }) }));
}
