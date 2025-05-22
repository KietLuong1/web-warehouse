import { AccountKey } from './keys'

// the shape returned by GET /user/{id} and list endpoints
export type AccountTypes = {
  password: string;
  [AccountKey.USER_ID]: number;
  [AccountKey.NAME]: string;
  [AccountKey.USERNAME]: string;
  [AccountKey.EMAIL]: string;
  [AccountKey.ROLE]: 'ADMIN' | 'MANAGER' | 'STAFF';
};

// the shape you send to create/update
export interface UserDto {
  [AccountKey.USER_ID]?: number;
  [AccountKey.NAME]: string;
  [AccountKey.USERNAME]: string;
  [AccountKey.EMAIL]: string;
  [AccountKey.ROLE]: 'ADMIN' | 'MANAGER' | 'STAFF';
  [AccountKey.PASSWORD]?: string;  // only on create or if changing
}

// matches Spring UserPageResponse
export interface AccountApiResponse {
  userDtos: AccountTypes[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

// for the /users endpoint query params
export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  dir?: 'asc' | 'desc';
}