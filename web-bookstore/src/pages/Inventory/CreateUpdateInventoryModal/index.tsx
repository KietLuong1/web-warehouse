import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { InventoryKey, InventoryPayload } from '../../../queries/Inventory'
import { useCreateInventory } from '../../../queries/Inventory/useCreateInventory'
import { useGetListInventory } from '../../../queries/Inventory/useGetListInventorys'
import { useInventoryDetail } from '../../../queries/Inventory/useInventoryDetail'
import { useUpdateInventory } from '../../../queries/Inventory/useUpdateInventory'
import { InventoryInitValues, InventoryValidationSchema } from './helpers'

type Props = {
  inventoryId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateInventoryModal: React.FC<Props> = ({ inventoryId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListInventory } = useGetListInventory()

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

  const { data: detailData, handleInvalidateDetail } = useInventoryDetail({
    id: inventoryId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<InventoryPayload>({
    defaultValues: InventoryInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(InventoryValidationSchema)
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset({
        ...detailData,
        [InventoryKey.IMPORT_DATE]: detailData.import_date
          ? dayjs(detailData.import_date).format('YYYY-MM-DD')
          : undefined,
        [InventoryKey.EXPIRY_DATE]: detailData.expiry_date
          ? dayjs(detailData.expiry_date).format('YYYY-MM-DD')
          : undefined
      })
    }
  }, [detailData, isEdit, reset])

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
          [InventoryKey.IMPORT_DATE]: data[InventoryKey.IMPORT_DATE]
            ? dayjs(data[InventoryKey.IMPORT_DATE]).format('YYYY-MM-DD')
            : '',
          [InventoryKey.EXPIRY_DATE]: data[InventoryKey.EXPIRY_DATE]
            ? dayjs(data[InventoryKey.EXPIRY_DATE]).format('YYYY-MM-DD')
            : ''
        },
        id: inventoryId
      })
    } else {
      const result = {
        ...data,
        [InventoryKey.IMPORT_DATE]: data[InventoryKey.IMPORT_DATE]
          ? dayjs(data[InventoryKey.IMPORT_DATE]).format('YYYY-MM-DD')
          : '',
        [InventoryKey.EXPIRY_DATE]: data[InventoryKey.EXPIRY_DATE]
          ? dayjs(data[InventoryKey.EXPIRY_DATE]).format('YYYY-MM-DD')
          : ''
      }
      onCreateInventory(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.PRODUCT_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Product ID'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Product ID' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.LOCATION_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Location ID'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Location ID' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Quantity'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Quantity' />
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
                label={'Batch Number'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Batch Number' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 container spacing={2} size={12}>
          <Grid2 size={4}>
            <Controller
              name={InventoryKey.IMPORT_DATE}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Import Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.toString() : '')}
                    format='YYYY-MM-DD'
                    placeholder='Enter Import Date'
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={4}>
            <Controller
              name={InventoryKey.EXPIRY_DATE}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Expiry Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.toString() : '')}
                    format='YYYY-MM-DD'
                    placeholder='Enter Expiry Date'
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <Stack display={'flex'} justifyContent={'flex-end'} direction={'row'}>
            <Button disabled={isCreatingLoading || isUpdating} variant='outlined' color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' size='large' color='primary' style={{ marginLeft: '16px' }}>
              Save
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Form>
  )
}
