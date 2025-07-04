import { AccountKey } from './keys'

export type AccountTypes = {
  [AccountKey.USER_ID]: number
  [AccountKey.NAME]: string
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.PASSWORD]?: string
  [AccountKey.ROLE]: 'ADMIN' | 'MANAGER' | 'STAFF'
}

export interface UserDto {
  [AccountKey.USER_ID]?: number
  [AccountKey.NAME]: string
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.PASSWORD]?: string
  [AccountKey.ROLE]: 'ADMIN' | 'MANAGER' | 'STAFF'
}

export interface AccountApiResponse {
  userDtos: AccountTypes[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  // isLast: boolean
}

export interface QueryParams {
  page?: number
  size?: number
  sortBy?: string
  dir?: 'asc' | 'desc'
}
