import { UseQueryOptions } from '@tanstack/react-query'

export enum API_QUERIES {
  TRANSACTION = '/imports',
  LOCATION = '/location',
  INVENTORY = '/inventory',
  SUPPLIER = '/suppliers'
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T }
