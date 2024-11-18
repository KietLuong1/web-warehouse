import axiosInstance from '../../configs/services/http'
import { ImportExportTypes } from './types'

export const fetchListImports = async (): Promise<ImportExportTypes[]> => {
  try {
    const response = await axiosInstance.get<ImportExportTypes[]>(`/imports`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export const getImportExportById = async ({ id }: { id: string }): Promise<ImportExportTypes> => {
  try {
    const response = await axiosInstance.get<ImportExportTypes>(`/imports/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createImportExport = async (body: ImportExportTypes): Promise<ImportExportTypes> => {
  try {
    const response = await axiosInstance.post<ImportExportTypes>(`/imports`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create create record:', error)
    throw error
  }
}

export const updateImportExport = async (body: ImportExportTypes, id: string): Promise<ImportExportTypes> => {
  try {
    const response = await axiosInstance.put<ImportExportTypes>(`/imports/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteImportExport = async (body: ImportExportTypes): Promise<ImportExportTypes> => {
  const { id } = body
  try {
    const response = await axiosInstance.delete<ImportExportTypes>(`/imports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
