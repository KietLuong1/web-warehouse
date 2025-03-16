import { axiosInstance } from '../../configs/services/http/index'
import { LocationPayload, LocationResponse } from './types'

export const fetchListLocation = async (): Promise<LocationResponse[]> => {
  try {
    const response = await axiosInstance.get<LocationResponse[]>(`/location`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list location:', error)
    throw error
  }
}

export const getLocationById = async ({ id }: { id: string }): Promise<LocationResponse> => {
  try {
    const response = await axiosInstance.get<LocationResponse>(`/location/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get location:', error)
    throw error
  }
}

export const createLocation = async (body: LocationPayload): Promise<LocationPayload> => {
  try {
    const response = await axiosInstance.post<LocationPayload>(`/location`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create location:', error)
    throw error
  }
}

export const updateLocation = async (body: LocationPayload, id: string): Promise<LocationPayload> => {
  try {
    const response = await axiosInstance.put<LocationPayload>(`/location/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update location:', error)
    throw error
  }
}

export const deleteLocation = async (body: LocationPayload): Promise<LocationPayload> => {
  const { location_id } = body
  try {
    const response = await axiosInstance.delete<LocationPayload>(`/location/${location_id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete location:', error)
    throw error
  }
}
