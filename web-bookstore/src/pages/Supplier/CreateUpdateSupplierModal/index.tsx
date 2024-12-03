import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ProductKey, ProductTypes } from '../../../queries'
import { useGetListSuppliers } from '../../../queries/Supplier/useGetListSuppliers'
import { useSupplierDetail } from '../../../queries/Supplier/useSupplierDetail'
import { useUpdateSupplier } from '../../../queries/Supplier/useUpdateSupplier'
import { SupplierInitValues } from './helpers'
import { useCreateSupplier } from '../../../queries/Supplier/useCreateSupplier'

type Props = {
  supplierId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateSupplierModal: React.FC<Props> = ({ supplierId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListSuppliers } = useGetListSuppliers()
  const { onCreateSupplier, isPending: isCreatingLoading } = useCreateSupplier({
    onSuccess: () => {
      Toastify('success', 'Supplier has been added successfully!')
      handleInvalidateListSuppliers()
      reset(SupplierInitValues)
      onCloseModal()
    }
  })
  const { onUpdateSupplier, isPending: isUpdating } = useUpdateSupplier({
    onSuccess: () => {
      Toastify(`success`, `Supplier has been updated successfully.`)
      handleInvalidateListSuppliers()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useSupplierDetail({
    id: supplierId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<ProductTypes>({
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
      reset(SupplierInitValues)
      onCloseModal()
    } else {
      onCloseModal()
    }
  }

  const onSubmit = (data: ProductTypes) => {
    if (isEdit) {
      if (!supplierId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateSupplier({ data, id: supplierId })
    } else {
      const result = {
        ...data,
        [ProductKey.CREATE_AT]: dayjs(data.created_at).format('YYYY-MM-DD')
      }
      onCreateSupplier(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ProductKey.SUPPLIER_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'ID'} required>
                <Input {...field} placeholder='Enter Supplier ID' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Name'} required>
                <Input {...field} placeholder='Enter Supplier Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.EMAIL}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Email'} required>
                <Input {...field} placeholder='Enter Supplier Email' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} size={12}>
      <Grid2 size={8}>
          <Controller
            name={ProductKey.PHONE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Phone'} required>
                <Input {...field} type='number' placeholder='Enter Supplier Phone' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={4}>
          <Controller
            name={ProductKey.CREATE_AT}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label='Create Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  format='YYYY-MM-DD'
                  placeholder='Enter Create Date'
                />
              </Form.Item>
            )}
          />
        </Grid2>

      </Grid2>
      <Grid2 size={12}>
          <Controller
            name={ProductKey.ADDRESS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Address'} required>
                <Input {...field} placeholder='Enter Supplier Address' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
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
    </Form>
  )
}
