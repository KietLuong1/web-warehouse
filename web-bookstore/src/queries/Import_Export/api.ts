import axiosInstance from '../../configs/services/http'
import { ImportExports } from './types'

export const fetchListImports = async (): Promise<ImportExports[]> => {
  try {
    const response = await axiosInstance.get<ImportExports[]>(`/imports`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export const getImportExportById = async ({ id }: { id: string }): Promise<ImportExports> => {
  try {
    const response = await axiosInstance.get<ImportExports>(`/imports/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createImportExport = async (body: ImportExports): Promise<ImportExports> => {
  try {
    const response = await axiosInstance.post<ImportExports>(`/imports`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create create record:', error)
    throw error
  }
}

export const updateImportExport = async (body: ImportExports, id: string): Promise<ImportExports> => {
  try {
    const response = await axiosInstance.put<ImportExports>(`/imports/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteImportExport = async (body: ImportExports): Promise<ImportExports> => {
  const { id } = body
  try {
    const response = await axiosInstance.delete<ImportExports>(`/imports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
