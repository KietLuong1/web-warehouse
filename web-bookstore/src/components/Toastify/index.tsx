import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = (type: 'info' | 'success' | 'warning' | 'error' | 'default', text: string) => {
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
    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            limit={5}
        />
    );
};

export default ToastifyContainer;
