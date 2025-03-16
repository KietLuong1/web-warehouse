import { AccountKey } from './keys'

export type AccountTypes = {
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.PASSWORD]: string
  [AccountKey.ROLE]: string
  [AccountKey.NAME]: string
}

export interface AccountPayload {
  userId?: string
  username: string
  email: string
  password: string
  role: string
  name: string
}
export interface AccountResponse {
  userId: string
  username: string
  email: string
  password: string
  role: string
  name: string
}
