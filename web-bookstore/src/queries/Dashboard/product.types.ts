export interface Product {
  productId: string
  name: string
  sku: string
  price: number
  stockQuantity: number
  categoryId: string
  categoryName?: string
  description?: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductDTO {
  productId?: string
  name: string
  sku: string
  price: number
  stockQuantity: number
  categoryId: string
  description?: string
}

export interface Category {
  categoryId: string
  name: string
  description?: string
  isActive: boolean
}

export interface ProductFormData {
  imageFile?: File
  name: string
  sku: string
  price: number
  stockQuantity: number
  categoryId: string
  description?: string
}
