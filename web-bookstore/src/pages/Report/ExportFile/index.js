import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { getExportMenuItems } from './helpers';
const ExportFile = ({ data, filename = 'export', selectedRows, columns }) => {
    const items = getExportMenuItems(data, filename, columns, selectedRows);
    return (_jsx(Dropdown, { menu: { items }, placement: 'bottomRight', disabled: selectedRows?.length === 0, children: _jsxs(Button, { type: 'primary', icon: _jsx(DownloadOutlined, {}), children: ["Export File ", selectedRows?.length ? `(${selectedRows.length} selected)` : ''] }) }));
};
export default ExportFile;
