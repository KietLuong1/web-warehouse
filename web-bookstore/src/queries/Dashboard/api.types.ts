/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  status: number
  message: string
  data: T
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface PaginationParams {
  page?: number
  size?: number
  filter?: string
}

export interface DateRangeParams {
  startDate: Date
  endDate: Date
}

export enum WarehouseKey {
  ID = 'id',
  NAME = 'name',
  LOCATION = 'location',
  CAPACITY = 'capacity',
  ACTIVE = 'active',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}
