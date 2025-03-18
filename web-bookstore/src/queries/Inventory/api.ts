import { axiosInstance2 } from '../../configs/services/http/index'
import { InventoryPayload, InventoryResponse } from './types'

export const fetchListInventory = async (): Promise<InventoryResponse[]> => {
  try {
    const response = await axiosInstance2.get<InventoryResponse[]>('/inventory')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of inventorys:', error)
    throw error
  }
}

export const getInventoryById = async ({ id }: { id: string }): Promise<InventoryResponse> => {
  try {
    const response = await axiosInstance2.get<InventoryResponse>(`/inventory/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createInventory = async (body: InventoryPayload): Promise<InventoryPayload> => {
  try {
    const response = await axiosInstance2.post<InventoryPayload>(`/inventory`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateInventory = async (body: InventoryPayload, id: string): Promise<InventoryPayload> => {
  try {
    const response = await axiosInstance2.put<InventoryPayload>(`/inventory/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteInventory = async (body: InventoryPayload): Promise<InventoryPayload> => {
  const { inventory_id } = body
  try {
    const response = await axiosInstance2.delete<InventoryPayload>(`/inventory/${inventory_id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
