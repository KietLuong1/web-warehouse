import { axiosInstance3 } from '../../configs/services/http/index'
import { ProductTypes } from './types'

export const fetchListProducts = async (): Promise<ProductTypes[]> => {
  try {
    const response = await axiosInstance3.get<ProductTypes[]>(`/products`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list products:', error)
    throw error
  }
}

export const getProductById = async ({ id }: { id: string }): Promise<ProductTypes> => {
  try {
    const response = await axiosInstance3.get<ProductTypes>(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get product:', error)
    throw error
  }
}

export const createProduct = async (body: ProductTypes): Promise<ProductTypes> => {
  try {
    const response = await axiosInstance3.post<ProductTypes>(`/products`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create product:', error)
    throw error
  }
}

export const updateProduct = async (body: ProductTypes, id: string): Promise<ProductTypes> => {
  try {
    const response = await axiosInstance3.put<ProductTypes>(`/products/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update product:', error)
    throw error
  }
}

export const deleteProduct = async (body: ProductTypes): Promise<ProductTypes> => {
  const { productId } = body
  try {
    const response = await axiosInstance3.delete<ProductTypes>(`/products/${productId}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete product:', error)
    throw error
  }
}
