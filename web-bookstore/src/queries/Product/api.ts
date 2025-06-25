import { productAxiosInstance } from '../../configs/services/http/index'
import { PaginationParams, SearchParams } from '../types'
import { ProductDTO, ProductPayload } from './types'
import { ProductDetailResponse } from './useProductDetail'

export interface ProductSearchParams extends PaginationParams {
  keyword?: string
  categoryId?: string
  warehouseId?: string
}

export const fetchListProducts = async (params: ProductSearchParams = { page: 1, size: 10 }): Promise<ProductDTO[]> => {
  try {
    const response = await productAxiosInstance.get<ProductDTO[]>(`/products/all`, { params })
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


export const searchProductByName = async (
  params: SearchParams = { page: 1, size: 10, keyword: '' }
): Promise<ProductDTO[]> => {
  try {
    const queryParams = {
      keyword: params.keyword || '',
      page: params.page || 1,
      size: params.size || 10
    }

    const searchParams = new URLSearchParams()
    searchParams.append('keyword', queryParams.keyword)
    searchParams.append('page', queryParams.page.toString())
    searchParams.append('size', queryParams.size.toString())

    const response = await productAxiosInstance.get<ProductDTO[]>(`/products/search`, {
      params: queryParams
    })
    return response.data
  } catch (error) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data?: unknown; status?: number } }
      console.error('Error details:', axiosError.response?.data)
      console.error('Error status:', axiosError.response?.status)
    }
    throw error
  }
}
