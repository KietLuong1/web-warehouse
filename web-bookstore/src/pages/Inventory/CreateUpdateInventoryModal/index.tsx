/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { InventoryKey, InventoryPayload } from '../../../queries/Inventory'
import { useCreateInventory } from '../../../queries/Inventory/useCreateInventory'
import { useGetListInventory } from '../../../queries/Inventory/useGetListInventories'
import { useInventoryDetail } from '../../../queries/Inventory/useInventoryDetail'
import { useUpdateInventory } from '../../../queries/Inventory/useUpdateInventory'
import { useGetListProducts } from '../../../queries/Product/useGetListProducts'
import { useGetListWarehouse } from '../../../queries/Setting/useGetListWarehouse'
import { InventoryInitValues, InventoryValidationSchema } from './helpers'
import './styles.scss'

type Props = {
  inventoryId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateInventoryModal: React.FC<Props> = ({ inventoryId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListInventory } = useGetListInventory()
  const { products, isFetching: isProductsLoading } = useGetListProducts({ page: 1, size: 1000, keyword: '' })
  const { warehouses, isFetching: isWarehousesLoading } = useGetListWarehouse()

  const { onCreateInventory, isPending: isCreatingLoading } = useCreateInventory({
    onSuccess: () => {
      Toastify('success', 'Inventory has been added successfully!')
      handleInvalidateListInventory()
      reset(InventoryInitValues)
      onCloseModal()
    }
  })

  const { onUpdateInventory, isPending: isUpdating } = useUpdateInventory({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListInventory()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { inventory: detailData, handleInvalidateDetail } = useInventoryDetail({
    id: inventoryId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<InventoryPayload>({
    defaultValues: InventoryInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(InventoryValidationSchema) as any
  })

  useEffect(() => {
    if (isEdit && inventoryId && detailData) {
      reset({
        [InventoryKey.PRODUCT_ID]: detailData.productId || '',
        [InventoryKey.WAREHOUSE_ID]: detailData.warehouseId || '',
        [InventoryKey.QUANTITY_ON_HAND]: detailData.quantityOnHand || 0,
        [InventoryKey.BATCH_NUMBER]: detailData.batchNumber || '',
        [InventoryKey.EXPIRY_DATE]: detailData.expiryDate ? dayjs(detailData.expiryDate).format('YYYY-MM-DD') : ''
      })
    }
  }, [detailData, isEdit, inventoryId, reset])

  const handleCancel = () => {
    if (!isEdit) {
      reset(InventoryInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: InventoryPayload) => {
    if (isEdit) {
      if (!inventoryId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateInventory({
        data: {
          ...data,
          [InventoryKey.EXPIRY_DATE]: data[InventoryKey.EXPIRY_DATE]
            ? dayjs(data[InventoryKey.EXPIRY_DATE]).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
            : ''
        },
        id: inventoryId
      })
    } else {
      const result = {
        ...data,
        [InventoryKey.EXPIRY_DATE]: data[InventoryKey.EXPIRY_DATE]
          ? dayjs(data[InventoryKey.EXPIRY_DATE]).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
          : ''
      }
      onCreateInventory(result)
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <Grid2 container>
          <Grid2 size={12}>
            <Controller
              name={InventoryKey.PRODUCT_ID}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Product' required validateStatus={error ? 'error' : undefined} help={error?.message}>
                  <select {...field} className={`custom-select ${error ? 'error' : ''}`} disabled={isProductsLoading}>
                    <option value=''>{isProductsLoading ? 'Loading products...' : 'Select a product'}</option>
                    {products?.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.sku})
                      </option>
                    ))}
                  </select>
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name={InventoryKey.WAREHOUSE_ID}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label='Warehouse'
                  required
                  validateStatus={error ? 'error' : undefined}
                  help={error?.message}
                >
                  <select {...field} className={`custom-select ${error ? 'error' : ''}`} disabled={isWarehousesLoading}>
                    <option value=''>{isWarehousesLoading ? 'Loading warehouses...' : 'Select a warehouse'}</option>
                    {warehouses?.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name} - {warehouse.location}
                      </option>
                    ))}
                  </select>
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name={InventoryKey.QUANTITY_ON_HAND}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Quantity' required validateStatus={error ? 'error' : undefined} help={error?.message}>
                  <Input {...field} placeholder='Enter Quantity' type='number' />
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name={InventoryKey.BATCH_NUMBER}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label='Batch Number'
                  required
                  validateStatus={error ? 'error' : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder='Enter Batch Number' />
                </Form.Item>
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              name={InventoryKey.EXPIRY_DATE}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Expiry Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                    format='YYYY-MM-DD'
                    slotProps={{
                      textField: {
                        placeholder: 'Select Expiry Date',
                        onBlur: field.onBlur,
                        error: !!error,
                        helperText: error?.message,
                        fullWidth: true,
                        size: 'small'
                      }
                    }}
                  />
                </Form.Item>
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Stack display='flex' justifyContent='flex-end' direction='row'>
              <Button
                disabled={isCreatingLoading || isUpdating}
                variant='outlined'
                color='error'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type='submit' variant='contained' size='large' color='primary' style={{ marginLeft: '16px' }}>
                Save
              </Button>{' '}
            </Stack>{' '}
          </Grid2>
        </Grid2>
      </Form>
    </LocalizationProvider>
  )
}
