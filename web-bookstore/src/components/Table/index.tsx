import { ThemeProvider, Typography } from '@mui/material'
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableOptions,
  MRT_TableState,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLOR_CODE } from '../../configs/color'
import { common } from '../../configs/common'
import { isEmpty } from '../../configs/utils/validation'
import { Callback } from '../../redux/types'
import { getAdditionalParams, TableQueryParams } from './helpers'
import { getDefaultMRTOptions, getMRTTableTheme } from '../../configs/mrtDefaultOptions'
import './styles.scss'

interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[]
  data: TData[]

  isColumnPinning?: boolean
  nameColumnPinning?: string

  isLocalState?: boolean
  additionalFilterParams?: string[]
  isLoading?: boolean
  recordName?: string
  singularRecordName?: string
  onAction?: Callback

  isLayoutGridMode?: boolean
  paginationParams?: {
    pageNumber: string
    pageSize: string
  }
}

const getSortOrderStateFromParamsUrl = (sortParams: string | null) => {
  if (!sortParams) return []

  if (sortParams?.includes(':')) {
    const sortOrderSplit = sortParams?.split(':')
    if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
      return [
        {
          id: sortOrderSplit[0],
          desc: sortOrderSplit[1] === 'desc'
        }
      ]
    }
  }

  return []
}

const getSortOrderParamsUrlFromState = (sortState: MRT_SortingState) => {
  return !isEmpty(sortState) ? `${sortState[0].id}:${sortState[0].desc ? 'desc' : 'asc'}` : null
}

const getInitialState = <TData extends MRT_RowData>({
  initialState,
  isLocalState,
  searchParams
}: {
  initialState: Partial<MRT_TableState<TData>>
  isLocalState: boolean
  searchParams: URLSearchParams
}): Partial<MRT_TableState<TData>> => {
  let sortOrder = initialState?.sorting || []
  if (!isLocalState) {
    const sortParams = searchParams.get(TableQueryParams?.SORT)
    sortOrder = getSortOrderStateFromParamsUrl(sortParams)
  }
  return {
    globalFilter: initialState?.globalFilter, //just use globalFilter for local state
    sorting: sortOrder,
    pagination: {
      pageIndex: isLocalState
        ? initialState?.pagination?.pageIndex || 0
        : searchParams.has(TableQueryParams.PAGE)
          ? Number(searchParams.get(TableQueryParams.PAGE))
          : initialState?.pagination?.pageIndex || 0,
      pageSize: isLocalState
        ? initialState?.pagination?.pageSize || common.ROWS_PER_PAGE
        : searchParams.has(TableQueryParams.ROWS_PER_PAGE)
          ? Number(searchParams.get(TableQueryParams.ROWS_PER_PAGE))
          : initialState?.pagination?.pageSize || common.ROWS_PER_PAGE
    }
  }
}
export const CustomTable = <TData extends MRT_RowData>({
  columns,
  data = [],

  // MRT table props
  rowCount,
  muiPaginationProps,
  state,
  initialState,
  enablePagination = true,

  // custom props
  isLocalState,
  additionalFilterParams = [],
  isLoading,
  recordName = 'items',
  singularRecordName = 'item',
  onAction,
  // Column pinning
  isColumnPinning = false,
  nameColumnPinning = '',
  isLayoutGridMode,
  paginationParams = { pageNumber: 'pageNumber', pageSize: 'pageSize' },

  ...props
}: Props<TData>) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialStates = useMemo(
    () => getInitialState({ initialState: initialState ?? {}, isLocalState: isLocalState ?? false, searchParams }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState, isLocalState]
  )

  const [sorting, setSorting] = useState<MRT_SortingState>(() => initialStates.sorting ?? [])
  const [search, setSearch] = useState<string>(() => initialStates.globalFilter)
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    () => initialStates.pagination as MRT_PaginationState
  )

  const defaultMRTOptions = useMemo(() => getDefaultMRTOptions<TData>(data), [data])
  useEffect(() => {
    handleTriggerAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sorting, search, searchParams])

  useEffect(() => {
    if (initialState?.sorting) {
      setSorting(initialState.sorting)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getActionParams = useCallback(() => {
    const searchParamsValue = searchParams.get(TableQueryParams.SEARCH) || ''
    return {
      ...getAdditionalParams(additionalFilterParams, searchParams),
      keywords: isLocalState ? search?.toString() || '' : searchParamsValue,
      [paginationParams.pageNumber]:
        paginationParams.pageNumber === 'pageNumber'
          ? pagination.pageIndex + 1
          : pagination.pageSize * pagination.pageIndex,
      [paginationParams.pageSize]: pagination.pageSize || 0,
      order: getSortOrderParamsUrlFromState(sorting) || getSortOrderParamsUrlFromState(initialStates.sorting ?? [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalFilterParams, isLocalState, searchParams, search, pagination, sorting, initialStates.sorting])

  const handleTriggerAction = () => {
    if (!onAction) return
    const params = getActionParams()
    onAction(params)
  }

  const range = useMemo(() => {
    const end = (pagination.pageIndex + 1) * pagination.pageSize
    const start = end - (pagination.pageSize - 1)
    return `${start}-${(rowCount ?? 0 < end) ? rowCount : end}`
  }, [rowCount, pagination])

  const setOrDeleteSearchParamsByKey = ({ key, value }: { key: string; value: unknown }) => {
    if (value) {
      searchParams.set(key, value.toString())
    } else {
      searchParams.delete(key)
    }

    setSearchParams(searchParams)
  }

  const resetToFirstPage = () => {
    setPagination((prev) => ({
      pageIndex: 0,
      pageSize: prev.pageSize
    }))
  }

  const handleSortingChange = (value: MRT_SortingState) => {
    if (!isLocalState) {
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.SORT,
        value: !isEmpty(value) && Array.isArray(value) ? `${value[0].id}:${value[0].desc ? 'desc' : 'asc'}` : []
      })
    }
  }

  useEffect(() => {
    handleSortingChange(sorting)
    resetToFirstPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  //TODO: fix the auto reset page to 0
  useEffect(() => {
    if (!isLocalState) {
      setTimeout(() => {
        table.setPageIndex(initialStates.pagination?.pageIndex ?? 0)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePaginationChange = (value: MRT_PaginationState) => {
    if (!isLocalState) {
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.PAGE,
        value: value?.pageIndex
      })
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.ROWS_PER_PAGE,
        value: value?.pageSize
      })
    }
  }

  useEffect(() => {
    handlePaginationChange(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data,
    rowCount,
    state: {
      ...state,
      pagination,
      sorting,
      globalFilter: search,
      showLoadingOverlay: isLoading
    },
    muiPaginationProps: {
      ...defaultMRTOptions.muiPaginationProps,
      ...muiPaginationProps
    },
    enableColumnPinning: isColumnPinning,

    enablePagination: data?.length ? enablePagination : false,

    initialState: {
      ...initialState,

      columnPinning: { right: [nameColumnPinning] },
      //  just use either initialState or state, not both for the same states
      sorting: undefined,
      pagination: undefined,
      globalFilter: undefined
    },
    ...(isLayoutGridMode && {
      layoutMode: 'grid',

      displayColumnDefOptions: {
        'mrt-row-actions': {
          Header: 'Actions',
          size: 96,
          muiTableBodyCellProps: {
            sx: {
              padding: '8px 16px',
              minWidth: '96px'
            }
          },
          muiTableHeadCellProps: {
            sx: {
              minWidth: '96px'
            }
          }
        }
      }
    }),
    muiTopToolbarProps: {
      sx: {
        background: 'transparent',
        '& > .MuiBox-root': {
          p: 0
        }
      }
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        background: 'transparent',
        marginLeft: '20px',
        marginRight: '20px',
        width: '100vw'
      }
    },
    muiBottomToolbarProps: {
      sx: {
        background: 'transparent',
        boxShadow: 'none',
        '& [for="mrt-rows-per-page"]': {
          fontSize: '14px'
        },
        '& .MuiInputBase-input': {
          fontSize: 14,
          backgroundColor: 'white',
          borderRadius: 1,
          border: `1px solid ${COLOR_CODE.GREY_200}`,
          px: 0.5,
          '& :focus': {
            all: 'unset'
          }
        }
      }
    },

    muiTableBodyProps: {
      sx: {
        cursor: 'pointer',
        '& tr:hover > td': {
          backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
        },
        '& .MuiTableRow-root': {
          td: {
            backgroundColor: COLOR_CODE.WHITE
            // minWidth: 'auto',
            // maxWidth: 'none'
          }
        }
      }
    },
    muiTableHeadRowProps: {
      sx: {
        boxShadow: 'none',
        background: 'transparent',
        borderRadius: '8px 8px 0 0',
        border: `1px solid ${COLOR_CODE.GREY_200}`,
        '& .MuiTableCell-root': {
          borderBottom: 'none',
          '&:first-of-type': {
            borderTopLeftRadius: 8
          },
          '&:last-of-type': {
            borderTopRightRadius: 8
          },
          '.MuiCheckbox-root': {
            padding: 0,
            height: '100%',
            width: '100%'
          }
        }
      }
    },
    muiTableBodyRowProps: {
      sx: {
        borderLeft: `1px solid ${COLOR_CODE.GREY_200}`,
        borderRight: `1px solid ${COLOR_CODE.GREY_200}`,
        '& .MuiTableCell-root': {
          borderBottom: `1px solid ${COLOR_CODE.GREY_200}`
        },
        '&:last-of-type': {
          borderRadius: '0 0 8px 8px',
          '& .MuiTableCell-root': {
            '&:first-of-type': {
              borderBottomLeftRadius: 8
            },
            '&:last-of-type': {
              borderBottomRightRadius: 8
            }
          }
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        '& span': {
          overflow: 'hidden', // Change from 'hidden' to 'visible'
          whiteSpace: 'nowrap', // Change from 'nowrap' to 'normal'
          textOverflow: 'ellipsis' // Remove ellipsis
        }
      }
    },
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => {
      return rowCount ? (
        <Typography variant='body2' color={COLOR_CODE.GREY_700}>
          Showing {range} of {rowCount} {rowCount === 1 ? singularRecordName : recordName}
        </Typography>
      ) : (
        <Typography variant='body2' color={COLOR_CODE.GREY_700}>
          No records found.
        </Typography>
      )
    },
    ...props
  })

  return (
    <ThemeProvider theme={getMRTTableTheme()}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  )
}
