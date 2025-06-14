import { inventory } from '../../configs/services/http/index'
import { InventoryPayload, InventoryResponse } from './types'
import { ApiInventoryListResponse } from '../types'

export const fetchListInventory = async (): Promise<ApiInventoryListResponse<InventoryResponse>> => {
  try {
    const response = await inventory.get<ApiInventoryListResponse<InventoryResponse>>('/inventory/all')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of inventories:', error)
    throw error
  }
}

export const getInventoryById = async ({
  id
}: {
  id: string
}): Promise<ApiInventoryListResponse<InventoryResponse>> => {
  try {
    const response = await inventory.get<ApiInventoryListResponse<InventoryResponse>>(`/inventory/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createInventory = async (body: InventoryPayload): Promise<InventoryPayload> => {
  try {
    const response = await inventory.post<InventoryPayload>(`/inventory/create`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateInventory = async (body: InventoryPayload, id: string): Promise<InventoryPayload> => {
  try {
    const response = await inventory.put<InventoryPayload>(`/inventory/update/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteInventory = async (body: InventoryPayload): Promise<InventoryPayload> => {
  const { id } = body
  try {
    const response = await inventory.delete<InventoryPayload>(`/inventory/delete/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
