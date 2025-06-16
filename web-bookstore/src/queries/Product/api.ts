import { productAxiosInstance } from '../../configs/services/http/index'
import { ProductDTO, ProductPayload } from './types'
import { ProductDetailResponse } from './useProductDetail'

export const fetchListProducts = async (): Promise<ProductDTO[]> => {
  try {
    const response = await productAxiosInstance.get<ProductDTO[]>(`/products/all`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list products:', error)
    throw error
  }
}

export const getProductById = async ({ id }: { id: string }): Promise<ProductDetailResponse> => {
  try {
    const response = await productAxiosInstance.get<ProductDetailResponse>(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get product:', error)
    throw error
  }
}

export const createProduct = async (body: ProductPayload): Promise<ProductPayload> => {
  try {
    const response = await productAxiosInstance.post<ProductPayload>(`/products/add`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create product:', error)
    throw error
  }
}

export const updateProduct = async (body: ProductPayload, id: string): Promise<ProductPayload> => {
  try {
    const response = await productAxiosInstance.put<ProductPayload>(`/products/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update product:', error)
    throw error
  }
}

export const deleteProduct = async (body: ProductPayload): Promise<ProductPayload> => {
  const { id } = body
  try {
    const response = await productAxiosInstance.delete<ProductPayload>(`/products/delete/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete product:', error)
    throw error
  }
}
