import { jsx as _jsx } from "react/jsx-runtime";
import DynamicPageHeader from './DynamicPageHeader';
import { createPageConfig } from './config';
export default function SmartPageHeader({ title, subtitle, showSearch, showDatePicker, searchPlaceholder, onSearch, rightContent, badge, config }) {
    const propsConfig = title
        ? createPageConfig(title, {
            subtitle,
            showSearch,
            showDatePicker,
            searchPlaceholder,
            badge
        })
        : undefined;
    const finalConfig = config || propsConfig;
    return _jsx(DynamicPageHeader, { config: finalConfig, onSearch: onSearch, rightContent: rightContent });
}
