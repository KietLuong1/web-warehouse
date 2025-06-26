import { productAxiosInstance } from '../../configs/services/http/index'
import { PaginationParams } from '../types'
import { SupplierDTO, SupplierPayload } from './types'
import { SupplierResponse } from './useSupplierDetail'
export interface SupplierSearchParams extends PaginationParams {
  keyword?: string
}

export const fetchListSuppliers = async (
  params: SupplierSearchParams = { page: 1, size: 10 }
): Promise<SupplierDTO[]> => {
  try {
    const response = await productAxiosInstance.get<SupplierDTO[]>(`/suppliers/all`, { params })
    return response.data
  } catch (error) {
    console.error('Failed to fetch list suppliers:', error)
    throw error
  }
}

export const getSupplierById = async ({ id }: { id: string }): Promise<SupplierResponse> => {
  try {
    const response = await productAxiosInstance.get<SupplierResponse>(`/suppliers/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get supplier:', error)
    throw error
  }
}

export const createSupplier = async (body: SupplierPayload): Promise<SupplierPayload> => {
  try {
    const response = await productAxiosInstance.post<SupplierPayload>(`/suppliers/add`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create supplier:', error)
    throw error
  }
}

export const updateSupplier = async (body: SupplierPayload, id: string): Promise<SupplierPayload> => {
  try {
    const response = await productAxiosInstance.put<SupplierPayload>(`/suppliers/update/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update supplier:', error)
    throw error
  }
}

export const deleteSupplier = async (body: SupplierPayload): Promise<SupplierPayload> => {
  const { id } = body
  try {
    const response = await productAxiosInstance.delete<SupplierPayload>(`/suppliers/delete/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete supplier:', error)
    throw error
  }
}
