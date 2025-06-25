/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiWarehouseResponse } from '../types'
import { getListWarehouse } from './api'
import { WarehouseDTO } from './types'

export function useGetListWarehouse(options?: UseMutationOptions<any, Error, ApiWarehouseResponse<WarehouseDTO>>) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllListCategories
  } = useQuery<any, Error, ApiWarehouseResponse<WarehouseDTO>>({
    queryKey: ['warehouses'],
    queryFn: getListWarehouse,
    ...options
  })
  const queryClient = useQueryClient()

  const warehouses = data?.dataList?.warehouses || []
  console.log('warehouseData', warehouses)

  const handleInvalidateListCategories = () => queryClient.invalidateQueries({ queryKey: ['warehouses'] })
  return { warehouses, error, isFetching, onGetAllListCategories, handleInvalidateListCategories }
}
