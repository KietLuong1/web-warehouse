import { jsx as _jsx } from "react/jsx-runtime";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Toastify = (type, text) => {
    const theme = type === 'default' ? 'light' : 'colored';
    switch (type) {
        case 'success':
            toast.success(text, { theme });
            break;
        case 'error':
            toast.error(text, { theme });
            break;
        case 'info':
            toast.info(text, { theme });
            break;
        case 'warning':
            toast.warn(text, { theme });
            break;
        default:
            toast(text, { theme });
            break;
    }
};
const ToastifyContainer = () => {
    return (_jsx(ToastContainer, { position: 'top-right', autoClose: 2500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, newestOnTop: false, rtl: false, pauseOnFocusLoss: true, limit: 5 }));
};
export default ToastifyContainer;
