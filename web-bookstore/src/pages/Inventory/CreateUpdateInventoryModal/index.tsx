import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { InventoryKey, InventoryTypes } from '../../../queries/Inventory'
import { useGetListInventory } from '../../../queries/Inventory/useGetListInventorys'
import { useInventoryDetail } from '../../../queries/Inventory/useInventoryDetail'
import { useUpdateInventory } from '../../../queries/Inventory/useUpdateInventory'
import { InventoryInitValues } from './helpers'
import { useCreateInventory } from '../../../queries/Inventory/useCreateInventory'

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
  const { handleSubmit, control, reset } = useForm<InventoryTypes>({
    defaultValues: {},
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset(detailData)
    }
  }, [detailData, isEdit, reset])

  const handleCancel = () => {
    if (!isEdit) {
      reset(InventoryInitValues)
      onCloseModal()
    } else {
      onCloseModal()
    }
  }

  const onSubmit = (data: InventoryTypes) => {
    if (isEdit) {
      if (!inventoryId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateInventory({ data, id: inventoryId })
    } else {
      const result = {
        ...data,
        [InventoryKey.IMPORT_DATE]: dayjs(data.expiry_date).format('YYYY-MM-DD'),
        [InventoryKey.EXPIRY_DATE]: dayjs(data.expiry_date).format('YYYY-MM-DD')
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
              <Form.Item label={'Product ID'} required>
                <Input {...field} placeholder='Enter Product ID' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.LOCATION_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Location ID'} required>
                <Input {...field} placeholder='Enter Location ID' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Quantity'} required>
                <Input {...field} placeholder='Enter Quantity' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={InventoryKey.BATCH_NUMBER}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Batch Number'} required>
                <Input {...field} placeholder='Enter Batch Number' aria-errormessage={error?.message} />
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
                    onChange={(date) => field.onChange(date)}
                    format='YYYY-MM-DD'
                    placeholder='Enter Import Date'
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
                    onChange={(date) => field.onChange(date)}
                    format='YYYY-MM-DD'
                    placeholder='Enter Expiry Date'
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
