import { axiosInstance4 } from '../../configs/services/http/index'
import { ReportTypes } from './types'

export const fetchListReport = async (): Promise<ReportTypes[]> => {
  try {
    const response = await axiosInstance4.get<ReportTypes[]>('/reports')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of reports:', error)
    throw error
  }
}

export const getReportById = async ({ id }: { id: string }): Promise<ReportTypes> => {
  try {
    const response = await axiosInstance4.get<ReportTypes>(`/reports/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createReport = async (body: ReportTypes): Promise<ReportTypes> => {
  try {
    const response = await axiosInstance4.post<ReportTypes>(`/reports`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateReport = async (body: ReportTypes, id: string): Promise<ReportTypes> => {
  try {
    const response = await axiosInstance4.put<ReportTypes>(`/reports/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteReport = async (body: ReportTypes): Promise<ReportTypes> => {
  const { id } = body
  try {
    const response = await axiosInstance4.delete<ReportTypes>(`/reports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
