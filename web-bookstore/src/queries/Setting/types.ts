import { CategoryKey } from './keys'

export interface CategoryType {
  [CategoryKey.ID]: string
  [CategoryKey.NAME]: string
}

export interface CategoryDTO {
  id: string
  name: string
}
