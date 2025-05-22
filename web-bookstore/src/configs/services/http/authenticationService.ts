import axiosAccount from '.'

interface JwtAuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(username: string, password: string) {
  const response = await axiosAccount.post<JwtAuthenticationResponse>('/auth/login', { username, password });
  const { accessToken, refreshToken } = response.data;
  // store tokens in localStorage for axios interceptors
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return response.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
