import axios from 'axios';
import { refreshToken as callRefresh } from '../../../queries/Account/api';
// Login Service API URL
const axiosAccount = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_API_URL,
    withCredentials: true
});
// Attach JWT token on every request
axiosAccount.interceptors.request.use((config) => {
    // Do NOT attach token to any /auth/** endpoints
    if (config.url?.includes('/auth/')) {
        return config;
    }
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// QUEUE for pending requests during a token refresh
let isRefreshing = false;
const requestQueue = [];
// PROCESS the queue once we have a new token
function processQueue(error, token = null) {
    for (const { resolve, reject } of requestQueue) {
        if (error) {
            reject(error);
        }
        else {
            resolve(token);
        }
    }
    requestQueue.length = 0;
}
// RESPONSE interceptor: catch 401/403 → refresh → retry
console.log('Attaching response interceptor');
axiosAccount.interceptors.response.use((res) => {
    console.log('✅  Response success:', res.config.url);
    return res;
}, async (error) => {
    const status = error.response?.status;
    const originalReq = error.config;
    console.log('🚨  Response error interceptor hit for:', originalReq.url, 'status=', status);
    // Only handle 401/403 once per request and skip auth endpoints
    if ((status === 401 || status === 403) && !originalReq._retry && originalReq.url?.indexOf('/auth/') === -1) {
        originalReq._retry = true;
        // If a refresh is already running, queue this request until it finishes
        if (isRefreshing) {
            console.log('⏳  Refresh in progress, queuing request:', originalReq.url);
            return new Promise((resolve, reject) => {
                requestQueue.push({ resolve, reject });
            }).then((token) => {
                console.log('🔁  Replaying queued request with new token:', originalReq.url);
                // Update the original request with the new token
                originalReq.headers = {
                    ...(originalReq.headers || {}),
                    Authorization: `Bearer ${token}`
                };
                return axiosAccount(originalReq);
            });
        }
        // Otherwise, start the refresh flow
        isRefreshing = true;
        const refresh = localStorage.getItem('refreshToken');
        console.log('🔄  Refresh token found:', refresh);
        if (!refresh) {
            console.error('❌  No refresh token found, redirecting to login');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(error);
        }
        try {
            console.log('🔄  Calling /auth/refresh');
            const { accessToken, refreshToken: newRefresh } = await callRefresh(refresh);
            console.log('✅  Got new tokens, writing to localStorage');
            // Persist new tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefresh);
            // wake up all the waiting requests
            processQueue(null, accessToken);
            // retry the original request
            console.log('🔁  Replaying original request:', originalReq.url);
            originalReq.headers = {
                ...(originalReq.headers || {}),
                Authorization: `Bearer ${accessToken}`
            };
            return axiosAccount(originalReq);
        }
        catch (refreshError) {
            // Refresh failed → reject all queued, clear tokens, force login
            console.error('❌  Refresh failed, clearing tokens & redirecting:', refreshError);
            processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
        finally {
            isRefreshing = false;
        }
    }
    // otherwise just reject
    return Promise.reject(error);
});
const accessToken = localStorage.getItem('accessToken');
export default axiosAccount;
export const axiosInstance = axios.create({
    // For Transaction, Location
    baseURL: import.meta.env.VITE_TRANSACTION_LOCATION_API_URL,
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
});
export const inventory = axios.create({
    // For Inventory
    baseURL: import.meta.env.VITE_INVENTORY_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
});
export const productAxiosInstance = axios.create({
    // For Supplier, Product
    baseURL: import.meta.env.VITE_SUPPLIER_PRODUCT_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
});
export const axiosInstance4 = axios.create({
    // For Account
    baseURL: import.meta.env.VITE_ACCOUNT_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
export const reportsApi = axios.create({
    baseURL: import.meta.env.VITE_REPORTS_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
