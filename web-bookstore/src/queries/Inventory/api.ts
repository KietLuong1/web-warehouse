import { axiosInstance2 } from '../../configs/services/http/index'
import { InventoryTypes } from './types'

export const fetchListInventory = async (): Promise<InventoryTypes[]> => {
  try {
    const response = await axiosInstance2.get<InventoryTypes[]>('/inventory')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of inventorys:', error)
    throw error
  }
}

export const getInventoryById = async ({ id }: { id: string }): Promise<InventoryTypes> => {
    try {
      const response = await axiosInstance2.get<InventoryTypes>(`/inventory/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to get record:', error)
      throw error
    }
  }
  
  export const createInventory = async (body: InventoryTypes): Promise<InventoryTypes> => {
    try {
      const response = await axiosInstance2.post<InventoryTypes>(`/inventory`, body)
      return response.data
    } catch (error) {
      console.error('Failed to create record:', error)
      throw error
    }
  }
  
  export const updateInventory = async (body: InventoryTypes, id: string): Promise<InventoryTypes> => {
    try {
      const response = await axiosInstance2.put<InventoryTypes>(`/inventory/${id}`, body)
      return response.data
    } catch (error) {
      console.error('Failed to update record:', error)
      throw error
    }
  }
  
  export const deleteInventory = async (body: InventoryTypes): Promise<InventoryTypes> => {
    const { inventory_id } = body
    try {
      const response = await axiosInstance2.delete<InventoryTypes>(`/inventory/${inventory_id}`, {})
      return response.data
    } catch (error) {
      console.error('Failed to delete record:', error)
      throw error
    }
  }
  