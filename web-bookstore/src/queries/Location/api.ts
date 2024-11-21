import { axiosInstance } from '../../configs/services/http/index'
import { Locations } from './types'

const fetchListLocations = async (): Promise<Locations[]> => {
  try {
    const response = await axiosInstance.get<Locations[]>('/location')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export default fetchListLocations
