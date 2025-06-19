import axios from 'axios';
// Define the login API function
export const loginApi = async (credentials) => {
    try {
        const response = await axios.post(`https://login-service-wms-mw33.onrender.com/api/v1/auth/login`, credentials);
        console.log('Login successful api', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Login failed', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data || error.message);
        }
        return null;
    }
};
// Define the forgotPassword API functions
// 1. Verify Email (Send OTP)
export const verifyEmail = async (email) => {
    try {
        const response = await axios.post(`https://login-service-wms-mw33.onrender.com/api/v1/forgotPassword/verifyMail/${email}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to verify email', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data || error.message);
        }
        return null;
    }
};
// 2. Verify OTP
export const verifyOtp = async (otp, email) => {
    try {
        const response = await axios.post(`https://login-service-wms-mw33.onrender.com/api/v1/forgotPassword/verifyOtp/${otp}/${email}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to verify OTP', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data || error.message);
        }
        return null;
    }
};
// 3. Change Password
export const changePassword = async (passwordDetails) => {
    try {
        const response = await axios.post(`https://login-service-wms-mw33.onrender.com/api/v1/forgotPassword/changePassword/${passwordDetails.email}`, passwordDetails);
        return response.data;
    }
    catch (error) {
        console.error('Failed to change password', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data || error.message);
        }
        return null;
    }
};
