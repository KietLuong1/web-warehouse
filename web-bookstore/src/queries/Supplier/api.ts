import { productAxiosInstance } from '../../configs/services/http/index'
import { SupplierPayload, SupplierResponse } from './types'

export const fetchListSuppliers = async (): Promise<SupplierResponse[]> => {
  try {
    const response = await productAxiosInstance.get<SupplierResponse[]>(`/suppliers`)
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
    const response = await productAxiosInstance.post<SupplierPayload>(`/suppliers`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create supplier:', error)
    throw error
  }
}

export const updateSupplier = async (body: SupplierPayload, id: string): Promise<SupplierPayload> => {
  try {
    const response = await productAxiosInstance.put<SupplierPayload>(`/suppliers/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update supplier:', error)
    throw error
  }
}

export const deleteSupplier = async (body: SupplierPayload): Promise<SupplierPayload> => {
  const { supplierId } = body
  try {
    const response = await productAxiosInstance.delete<SupplierPayload>(`/suppliers/${supplierId}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete supplier:', error)
    throw error
  }
}
