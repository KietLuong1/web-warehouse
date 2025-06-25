/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLOR_CODE } from '../../../configs/color'
import { useGetListCategories } from '../../../queries/Setting/useGetListCategories'
import { useGetListWarehouse } from '../../../queries/Setting/useGetListWarehouse'

const ProductFilter: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { categories, isFetching: categoriesLoading } = useGetListCategories()
  const { warehouses, isFetching: warehousesLoading } = useGetListWarehouse()

  const currentSearchParams = Object.fromEntries([...searchParams])

  const currentCategory = searchParams.get('categoryId') || ''
  const currentWarehouse = searchParams.get('warehouseId') || ''

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    if (value) {
      setSearchParams({ ...currentSearchParams, categoryId: value })
    } else {
      const { categoryId, ...restParams } = currentSearchParams
      setSearchParams(restParams)
    }
  }

  const handleWarehouseChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    if (value) {
      setSearchParams({ ...currentSearchParams, warehouseId: value })
    } else {
      const { warehouseId, ...restParams } = currentSearchParams
      setSearchParams(restParams)
    }
  }

  const handleClearAll = () => {
    const { categoryId, warehouseId, ...restSearchParams } = currentSearchParams
    setSearchParams(restSearchParams)
  }

  return (
    <Container maxWidth='xs' sx={{ p: 2, width: 340 }}>
      <Stack direction='row' alignItems='center' mb={3} justifyContent='space-between'>
        <Typography variant='h5' mr={3} color={COLOR_CODE.HEADER}>
          Filter
        </Typography>
        <Button type='button' onClick={handleClearAll} style={{ fontWeight: 500 }}>
          Clear All
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel id='category-select-label'>Category</InputLabel>
          <Select
            labelId='category-select-label'
            id='category-select'
            value={currentCategory}
            size='small'
            fullWidth
            onChange={handleCategoryChange}
            disabled={categoriesLoading}
            displayEmpty
          >
            {Array.isArray(categories)
              ? categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id='warehouse-select-label'>Warehouse</InputLabel>
          <Select
            labelId='warehouse-select-label'
            id='warehouse-select'
            value={currentWarehouse}
            size='small'
            fullWidth
            onChange={handleWarehouseChange}
            disabled={warehousesLoading}
            displayEmpty
          >
            {Array.isArray(warehouses)
              ? warehouses.map((warehouse) => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </Grid>
      </Grid>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

export default ProductFilter
