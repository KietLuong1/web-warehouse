import { axiosInstance3 } from '../../configs/services/http/index'
import { SupplierTypes } from './types'

export const fetchListSuppliers = async (): Promise<SupplierTypes[]> => {
  try {
    const response = await axiosInstance3.get<SupplierTypes[]>(`/suppliers`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list suppliers:', error)
    throw error
  }
}

export const getSupplierById = async ({ id }: { id: string }): Promise<SupplierTypes> => {
  try {
    const response = await axiosInstance3.get<SupplierTypes>(`/suppliers/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get supplier:', error)
    throw error
  }
}

export const createSupplier = async (body: SupplierTypes): Promise<SupplierTypes> => {
  try {
    const response = await axiosInstance3.post<SupplierTypes>(`/suppliers`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create supplier:', error)
    throw error
  }
}

export const updateSupplier = async (body: SupplierTypes, id: string): Promise<SupplierTypes> => {
  try {
    const response = await axiosInstance3.put<SupplierTypes>(`/suppliers/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update supplier:', error)
    throw error
  }
}

export const deleteSupplier = async (body: SupplierTypes): Promise<SupplierTypes> => {
  const { supplierId } = body
  try {
    const response = await axiosInstance3.delete<SupplierTypes>(`/suppliers/${supplierId}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete supplier:', error)
    throw error
  }
}
