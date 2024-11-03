import { Clear, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { debounce } from 'lodash'
import React, { Ref, forwardRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { COLOR_CODE } from '../../configs/color'
import { isEmpty } from '../../configs/utils/validation'
import { Callback } from '../../redux/types'

const clsPrefix = 'custom-search-table'

type Props = {
  searchText?: string
  searchKey?: string
  pageKey?: string
  placeholder?: string
  ref?: Ref<HTMLDivElement>
  onSearch?: (_text: string) => void
  onInputTouch?: Callback
  isLocalState?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table?: any
  isMobile?: boolean
}

export const CustomTableSearch = forwardRef<HTMLDivElement, Props>(
  (
    {
      searchText,
      placeholder = 'Search',
      searchKey = 'keywords',
      pageKey = 'page',
      onSearch,
      onInputTouch,
      table,
      isLocalState
    },
    ref
  ) => {
    const { search } = useLocation()

    const query = new URLSearchParams(search)
    const searchParam = searchText || query.get(searchKey) || ''
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = React.useState(searchParam)
    const onSearchFunc = async (val: string) => {
      if (onSearch) return onSearch(val)

      if (isLocalState) {
        table?.setGlobalFilter(val)
        return
      }

      if (val) query.set(searchKey, val)
      else query.delete(searchKey)

      query.delete(pageKey)

      navigate({ search: query.toString() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceValue = React.useCallback(debounce(onSearchFunc, 500), [query])

    const hasValue = !isEmpty(searchParam)

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.target
      setSearchValue(value)
      debounceValue(value)
    }

    const handleClearSearchValue = () => {
      setSearchValue('')
      onSearchFunc('')
    }

    return (
      <Stack mt={1} mb={1.5} style={{ width: 328 }}>
        <TextField
          placeholder={placeholder}
          size='small'
          variant='outlined'
          value={searchValue}
          onChange={handleTextChange}
          onClick={onInputTouch}
          inputRef={ref}
          sx={{
            '& .MuiInputBase-root': { backgroundColor: COLOR_CODE.WHITE },
            '& .MuiInputLabel-root': { marginBottom: 0 }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
            endAdornment: hasValue && (
              <IconButton classes={{ root: `${clsPrefix}-icon p-2` }} onClick={handleClearSearchValue}>
                <Clear />
              </IconButton>
            )
          }}
        />
      </Stack>
    )
  }
)
