import { CategoryKey } from './keys'

export interface CategoryType {
  [CategoryKey.ID]: string
  [CategoryKey.NAME]: string
}

export interface CategoryDTO {
  id: string
  name: string
}

export interface WarehouseDTO {
  id: string
  name: string
  location: string
  capacity: number
  active: boolean
  createdAt: string
  updatedAt: string
}
