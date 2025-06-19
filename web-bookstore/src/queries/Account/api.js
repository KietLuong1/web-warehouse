import axiosAccount from '../../configs/services/http/index';
export const refreshToken = async (token) => {
    const resp = await axiosAccount.post('/auth/refresh', { refreshToken: token });
    return resp.data;
};
export const fetchListAccount = async (params = { page: 1, size: 10 }) => {
    const resp = await axiosAccount.get('/userManagement/users', { params });
    console.log('fetchListAccount', resp.data);
    return resp.data;
};
export const getAccountById = async (userId) => {
    const resp = await axiosAccount.get(`/userManagement/user/${userId}`);
    return resp.data;
};
export const createAccount = async (user) => {
    const fd = new FormData();
    fd.append('userDto', JSON.stringify(user));
    const resp = await axiosAccount.post('/userManagement/user', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return resp.data;
};
export const updateAccount = async (user) => {
    const fd = new FormData();
    fd.append('userDtoObj', JSON.stringify(user));
    const resp = await axiosAccount.put(`/userManagement/user/${user.userId}`, fd);
    // try {
    //   const resp = await axiosAccount.put<AccountTypes>(`/userManagement/user/${user.userId}`, fd, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   })
    //   return resp.data
    // } catch (error) {
    //   console.error('Failed to update record:', error)
    //   throw error
    // }
    return resp.data;
};
export const changePassword = async (email, payload) => {
    await axiosAccount.post(`/forgotPassword/changePassword/${email}`, payload);
};
