import { UseQueryOptions } from '@tanstack/react-query'

export enum API_QUERIES {
  TRANSACTION = '/imports',
  LOCATION = '/location',
  INVENTORY = '/inventory',
  SUPPLIER = '/suppliers',
  PRODUCT = '/products',
  ACCOUNT = '/user'
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T }
