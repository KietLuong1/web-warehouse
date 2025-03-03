import { reportsApi } from '../../configs/services/http/index'
import { ReportTypes } from './types'

export const fetchListReport = async (): Promise<ReportTypes[]> => {
  const response = await reportsApi.get('/reports')
  return response.data?.[0]?.data ?? []
}

export const getReportById = async ({ id }: { id: string }): Promise<ReportTypes> => {
  try {
    const response = await reportsApi.get(`/reports`)

    const reportData = response.data?.[0]?.data
    const matchingData = reportData?.find((item: { id: string }) => item.id === id) ?? null

    return matchingData
  } catch (error) {
    console.error(`Failed to fetch report with ID: ${id}`, error)
    throw error
  }
}

// create, update, delete chưa xài được tại mock api hông support
export const createReport = async (body: ReportTypes): Promise<ReportTypes> => {
  try {
    const response = await reportsApi.post(`/reports`, body)
    return response.data?.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}
export const updateReport = async (body: ReportTypes, id: string): Promise<ReportTypes> => {
  try {
    const response = await reportsApi.get('/reports')
    const allReports = response.data?.[0]?.data || []
    const existingData = allReports.find((item: { id: string }) => item.id === id)

    if (!existingData) {
      throw new Error(`Report with ID ${id} not found.`)
    }

    const updatedReports = allReports.map((item: ReportTypes) => (item.id === id ? { ...item, ...body } : item))

    const updateResponse = await reportsApi.put('/reports', [
      {
        data: updatedReports,
        skippRecords: response.data?.[0]?.skippRecords,
        totalRecords: response.data?.[0]?.totalRecords
      }
    ])

    return updateResponse.data?.[0]?.data.find((item: ReportTypes) => item.id === id)
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteReport = async (body: ReportTypes): Promise<ReportTypes> => {
  const { id } = body
  try {
    const response = await reportsApi.delete(`/reports/${id}`, {})
    return response.data?.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
