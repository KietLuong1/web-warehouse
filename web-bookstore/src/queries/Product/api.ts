import { axiosInstance3 } from '../../configs/services/http/index'
import { ProductPayload, ProductResponse } from './types'

export const fetchListProducts = async (): Promise<ProductResponse[]> => {
  try {
    const response = await axiosInstance3.get<ProductResponse[]>(`/products`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list products:', error)
    throw error
  }
}

export const getProductById = async ({ id }: { id: string }): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance3.get<ProductResponse>(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get product:', error)
    throw error
  }
}

export const createProduct = async (body: ProductPayload): Promise<ProductPayload> => {
  try {
    const response = await axiosInstance3.post<ProductPayload>(`/products`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create product:', error)
    throw error
  }
}

export const updateProduct = async (body: ProductPayload, id: string): Promise<ProductPayload> => {
  try {
    const response = await axiosInstance3.put<ProductPayload>(`/products/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update product:', error)
    throw error
  }
}

export const deleteProduct = async (body: ProductPayload): Promise<ProductPayload> => {
  const { product_id } = body
  try {
    const response = await axiosInstance3.delete<ProductPayload>(`/products/${product_id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete product:', error)
    throw error
  }
}
