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

export const getImportExportById = async ({ id }: { id: string | undefined }): Promise<ImportExports> => {
  try {
    const response = await axiosInstance.get<ImportExports>(`/imports/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export const createImportExport = async (body: ImportExports): Promise<void> => {
  return await axiosInstance.post(`/imports`, body)
}

export const updateImportExport = (body: ImportExports, id: string) => {
  return axiosInstance.put(`/imports/${id}`, body)
}

export const deleteImportExport = (body: ImportExports) => {
  const { id } = body
  return axiosInstance.delete(`/imports/${id}`, {})
}
