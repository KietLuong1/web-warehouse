import { productAxiosInstance } from '../../configs/services/http/index'
import { PaginationResponseType } from '../types'
import { LocationPayload, WarehouseDTO } from './types'
import { WarehouseDetailResponse } from './useLocationDetail'

export interface LocationSearchParams {
  keyword?: string
  page?: number
  size?: number
}

export const fetchListLocation = async (
  params: LocationSearchParams = { page: 1, size: 10 }
): Promise<PaginationResponseType<WarehouseDTO[]>> => {
  try {
    const response = await productAxiosInstance.get<PaginationResponseType<WarehouseDTO[]>>(`/warehouses`, {
      params
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch list location:', error)
    throw error
  }
}

export const getLocationById = async ({ id }: { id: string }): Promise<WarehouseDetailResponse> => {
  try {
    const response = await productAxiosInstance.get<WarehouseDetailResponse>(`/warehouses/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get location:', error)
    throw error
  }
}

export const createLocation = async (body: LocationPayload): Promise<LocationPayload> => {
  try {
    const response = await productAxiosInstance.post<LocationPayload>(`/warehouses`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create location:', error)
    throw error
  }
}

export const updateLocation = async (body: LocationPayload, id: string): Promise<LocationPayload> => {
  try {
    const response = await productAxiosInstance.put<LocationPayload>(`/warehouses/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update location:', error)
    throw error
  }
}

export const deleteLocation = async (body: LocationPayload): Promise<LocationPayload> => {
  const { id } = body
  try {
    const response = await productAxiosInstance.delete<LocationPayload>(`/warehouses/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete location:', error)
    throw error
  }
}
