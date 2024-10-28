import axiosInstance from '../../configs/services/http'
import { Import_Export } from './types'

const fetchListImports = async (): Promise<Import_Export[]> => {
  try {
    const response = await axiosInstance.get<Import_Export[]>('/imports')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export default fetchListImports
