import { inventory } from '../../configs/services/http/index'
import { ApiResponseTypes, PaginationParams, PaginationResponseType, SearchParams } from '../types'
import { InventoryPayload, InventoryResponse } from './types'

export const fetchListInventory = async (
  params: PaginationParams = { page: 1, size: 10 }
): Promise<PaginationResponseType<InventoryResponse>> => {
  try {
    const response = await inventory.get<PaginationResponseType<InventoryResponse>>('/inventory/all', { params })
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of inventories:', error)
    throw error
  }
}

export const getInventoryById = async ({ id }: { id: string }): Promise<ApiResponseTypes<InventoryResponse>> => {
  try {
    const response = await inventory.get<ApiResponseTypes<InventoryResponse>>(`/inventory/${id}`)
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

export const searchInventoryByName = async (
  params: SearchParams = { page: 1, size: 10, keyword: '' }
): Promise<PaginationResponseType<InventoryResponse>> => {
  try {
    const queryParams = {
      keyword: params.keyword || '',
      page: params.page || 1,
      size: params.size || 10
    }

    const response = await inventory.get<PaginationResponseType<InventoryResponse>>(`/inventory/search`, {
      params: queryParams
    })
    return response.data
  } catch (error) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data?: unknown; status?: number } }
      console.error('Error details:', axiosError.response?.data)
      console.error('Error status:', axiosError.response?.status)
    }
    throw error
  }
}
