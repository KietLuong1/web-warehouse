import { UseQueryOptions } from '@tanstack/react-query'

export enum API_QUERIES {
  IMPORT_EXPORT = '/imports',
  LOCATION = '/location'
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T }
