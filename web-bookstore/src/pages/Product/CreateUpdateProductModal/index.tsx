import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ProductKey, ProductPayload } from '../../../queries'
import { useCreateProduct } from '../../../queries/Product/useCreateProduct'
import { useGetListProducts } from '../../../queries/Product/useGetListProducts'
import { useProductDetail } from '../../../queries/Product/useProductDetail'
import { useUpdateProduct } from '../../../queries/Product/useUpdateProduct'
import { ProductInitValues, ProductValidationSchema } from './helpers'

type Props = {
  productId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateProductModal: React.FC<Props> = ({ productId, onCloseModal, isEdit = false }) => {
  console.log('productId:', productId)
  const { handleInvalidateListProducts } = useGetListProducts()
  const { onCreateProduct, isPending: isCreatingLoading } = useCreateProduct({
    onSuccess: () => {
      Toastify('success', 'Product has been added successfully!')
      handleInvalidateListProducts()
      reset(ProductInitValues)
      onCloseModal()
    }
  })
  const { onUpdateProduct, isPending: isUpdating } = useUpdateProduct({
    onSuccess: () => {
      Toastify(`success`, `Product has been updated successfully.`)
      handleInvalidateListProducts()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useProductDetail({
    id: productId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<ProductPayload>({
    defaultValues: ProductInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(ProductValidationSchema)
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset({
        ...detailData,
        [ProductKey.CREATE_DATE]: detailData.create_date
          ? dayjs(detailData.create_date).format('YYYY-MM-DD')
          : undefined,
        [ProductKey.EXPIRED_DATE]: detailData.expired_date
          ? dayjs(detailData.expired_date).format('YYYY-MM-DD')
          : undefined
      })
    }
  }, [detailData, isEdit, reset])

  const handleCancel = () => {
    if (!isEdit) {
      reset(ProductInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: ProductPayload) => {
    if (isEdit) {
      if (!productId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateProduct({
        data: {
          ...data,
          [ProductKey.CREATE_DATE]: data[ProductKey.CREATE_DATE]
            ? dayjs(data[ProductKey.CREATE_DATE]).format('YYYY-MM-DD')
            : '',
          [ProductKey.EXPIRED_DATE]: data[ProductKey.EXPIRED_DATE]
            ? dayjs(data[ProductKey.EXPIRED_DATE]).format('YYYY-MM-DD')
            : ''
        },
        id: productId
      })
    } else {
      const result = {
        ...data,
        [ProductKey.CREATE_DATE]: data[ProductKey.CREATE_DATE]
          ? dayjs(data[ProductKey.CREATE_DATE]).format('YYYY-MM-DD')
          : '',
        [ProductKey.EXPIRED_DATE]: data[ProductKey.EXPIRED_DATE]
          ? dayjs(data[ProductKey.EXPIRED_DATE]).format('YYYY-MM-DD')
          : ''
      }
      onCreateProduct(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ProductKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Name'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Product Name' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.CATEGORY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Category'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Product Category' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.DESCRIPTION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Description'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Description' />
              </Form.Item>
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} size={12}>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.PRICE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Price'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} type='number' placeholder='Enter Product Price' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.STATUS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Status'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Status' />
              </Form.Item>
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} size={12}>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.CREATE_DATE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label='Create Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toString() : '')}
                  format='YYYY-MM-DD'
                  placeholder='Enter Create Date'
                  onBlur={field.onBlur}
                />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.EXPIRED_DATE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label='Expired Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toString() : '')}
                  format='YYYY-MM-DD'
                  placeholder='Enter Expired Date'
                  onBlur={field.onBlur}
                />
              </Form.Item>
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} size={12}>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.MINIMUM_QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Minimum Quantity'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} type='number' placeholder='Enter Product Minimum Quantity' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.LIMIT_QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Limit Quantity'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} type='number' placeholder='Enter Product Limit Quantity' />
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
    </Form>
  )
}
