import { AccountKey } from './keys'

export type AccountTypes = {
  [AccountKey.USER_ID]: string
  [AccountKey.NAME]: string
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.PASSWORD]: string
  [AccountKey.ROLE]: string
}

export interface AccountPayLoad {
  [AccountKey.USER_ID]?: string
  [AccountKey.NAME]: string
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.ROLE]: string
  [AccountKey.PASSWORD]: string
}

export interface ApiResponse<T> {
  userDtos?: T[]
  pageNumber?: number
  pageSize?: number
  totalElements?: number
  totalPages?: number
  isLast?: boolean
  [key: string]: any 
}
