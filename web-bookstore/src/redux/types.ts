export type Callback = (..._args: unknown[]) => void

export type TableParamsNet = {
  skip?: number
  pageNumber?: number
  pageSize?: number
  order?: string
  search?: string
  keywords?: string
  sort?: string
  [key: string]: number | boolean | string | string[] | undefined
}

export interface PaginationResponseType<T> {
  data: T[]
  payloadSize?: number
  hasNext?: boolean
  skippedRecords?: number
  totalRecords?: number
  skip?: number
  take?: number
}
