import axiosAccount from '.'

export interface JwtAuthenticationResponse {
  accessToken: string
  refreshToken: string
  userId: number
  userRole: string
}

export async function login(username: string, password: string): Promise<JwtAuthenticationResponse> {
  const response = await axiosAccount.post<JwtAuthenticationResponse>('/auth/login', { username, password })
  const { accessToken, refreshToken, userId, userRole } = response.data
  // store tokens in localStorage for axios interceptors
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('userId', userId.toString())
  localStorage.setItem('userRole', userRole)
  return response.data
}

export function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('userRole')
}
