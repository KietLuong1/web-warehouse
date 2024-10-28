export type Callback = (..._args: unknown[]) => void

export type TableParamsNet = {
  skip?: number
  pageNo?: number
  pageSize?: number
  order?: string
  search?: string
  keywords?: string
  sort?: string
  [key: string]: number | boolean | string | string[] | undefined
}
