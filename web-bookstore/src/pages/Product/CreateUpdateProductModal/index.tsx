import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ProductKey, ProductTypes } from '../../../queries'
import { useGetListProducts } from '../../../queries/Product/useGetListProducts'
import { useProductDetail } from '../../../queries/Product/useProductDetail'
import { useUpdateProduct } from '../../../queries/Product/useUpdateProduct'
import { ProductInitValues } from './helpers'
import { useCreateProduct } from '../../../queries/Product/useCreateProduct'

type Props = {
  productId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateProductModal: React.FC<Props> = ({ productId, onCloseModal, isEdit = false }) => {
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
      reset(ProductInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: ProductTypes) => {
    if (isEdit) {
      if (!productId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateProduct({ data, id: productId })
    } else {
      const result = {
        ...data,
        [ProductKey.CREATE_DATE]: dayjs(data.createDate).format('YYYY-MM-DD'),
        [ProductKey.EXPIRED_DATE]: dayjs(data.expiredDate).format('YYYY-MM-DD')
      }
      onCreateProduct(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ProductKey.PRODUCT_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'ID'} required>
                <Input {...field} placeholder='Enter Product ID' aria-errormessage={error?.message} />
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
                <Input {...field} placeholder='Enter Product Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.CATEGORY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Category'} required>
                <Input {...field} placeholder='Enter Product Category' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.DESCRIPTION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Description'}>
                <Input {...field} placeholder='Enter Description' aria-errormessage={error?.message} />
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
              <Form.Item label={'Price'} required>
                <Input {...field} type='number' placeholder='Enter Product Price' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.STATUS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Status'}>
                <Input {...field} placeholder='Enter Status' aria-errormessage={error?.message} />
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
                  onChange={(date) => field.onChange(date)}
                  format='YYYY-MM-DD'
                  placeholder='Enter Create Date'
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
                  onChange={(date) => field.onChange(date)}
                  format='YYYY-MM-DD'
                  placeholder='Enter Expired Date'
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
              <Form.Item label={'Minimum Quantity'} required>
                <Input
                  {...field}
                  type='number'
                  placeholder='Enter Product Minimum Quantity'
                  aria-errormessage={error?.message}
                />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={6}>
          <Controller
            name={ProductKey.LIMIT_QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Limit Quantity'} required>
                <Input
                  {...field}
                  type='number'
                  placeholder='Enter Product Limit Quantity'
                  aria-errormessage={error?.message}
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
    </Form>
  )
}
