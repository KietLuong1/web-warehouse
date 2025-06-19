import axiosAccount from '.';
export async function login(username, password) {
    const response = await axiosAccount.post('/auth/login', { username, password });
    const { accessToken, refreshToken, userId, userRole } = response.data;
    // store tokens in localStorage for axios interceptors
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userRole', userRole);
    return response.data;
}
export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
}
