/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ProductKey, ProductPayload } from '../../../queries'
import { useCreateProduct } from '../../../queries/Product/useCreateProduct'
import { useGetListProducts } from '../../../queries/Product/useGetListProducts'
import { useProductDetail } from '../../../queries/Product/useProductDetail'
import { useUpdateProduct } from '../../../queries/Product/useUpdateProduct'
import { CategoryDTO } from '../../../queries/Setting'
import { useGetListCategories } from '../../../queries/Setting/useGetListCategories'
import { ProductInitValues, ProductValidationSchema } from './helpers'
import './styles.scss'

type Props = {
  productId?: string
  isEdit?: boolean
  onCloseModal: () => void
}

export const CreateUpdateProductModal: React.FC<Props> = ({ productId, onCloseModal, isEdit = false }) => {
  const { categories, isFetching: categoriesLoading } = useGetListCategories()

  const { handleInvalidateListProducts } = useGetListProducts()
  const { onCreateProduct, isPending: isCreatingLoading } = useCreateProduct({
    onSuccess: () => {
      Toastify('success', 'Product has been added successfully!')
      handleInvalidateListProducts()
      reset(ProductInitValues)
      onCloseModal()
    },
    onError: (error: any) => {
      console.error('Create product error details:', {
        error,
        status: error?.status || error?.response?.status,
        message: error?.message || error?.response?.data?.message,
        data: error?.response?.data,
        fullResponse: error?.response
      })

      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create product'

      Toastify('error', errorMessage)

      if (error?.status === 500 || error?.response?.status === 500) {
        setTimeout(() => {
          alert(`Server Error: ${errorMessage}`)
        }, 2000)
      }
    }
  })
  const { onUpdateProduct, isPending: isUpdating } = useUpdateProduct({
    onSuccess: () => {
      Toastify(`success`, `Product has been updated successfully.`)
      handleInvalidateListProducts()
      handleInvalidateDetail()
      onCloseModal()
    },
    onError: (error: any) => {
      console.error('Update product error details:', {
        error,
        status: error?.status || error?.response?.status,
        message: error?.message || error?.response?.data?.message,
        data: error?.response?.data,
        fullResponse: error?.response
      })

      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update product'

      Toastify('error', errorMessage)
    }
  })

  const { product: detailData, handleInvalidateDetail } = useProductDetail({
    id: productId ?? ''
  })

  const { handleSubmit, control, reset } = useForm<ProductPayload>({
    defaultValues: ProductInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(ProductValidationSchema) as any
  })

  useEffect(() => {
    if (!isEdit) {
      reset(ProductInitValues)
    }
  }, [isEdit, reset])

  useEffect(() => {
    if (isEdit && detailData) {
      reset({
        [ProductKey.CATEGORY_ID]: detailData.categoryId || '',
        [ProductKey.NAME]: detailData.name || '',
        [ProductKey.SKU]: detailData.sku || '',
        [ProductKey.PRICE]: detailData.price || 0,
        [ProductKey.STOCK_QUANTITY]: detailData.stockQuantity || 0,
        [ProductKey.DESCRIPTION]: detailData.description || ''
      })
    }
  }, [detailData, isEdit, reset])

  const handleCancel = () => {
    reset(ProductInitValues)
    onCloseModal()
  }

  const onSubmit = (data: ProductPayload) => {
    if (!data.categoryId) {
      Toastify('error', 'Please select a category')
      return
    }

    if (!data.name || !data.sku) {
      Toastify('error', 'Please fill in all required fields')
      return
    }

    const cleanedData = {
      ...data,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      stockQuantity: typeof data.stockQuantity === 'string' ? parseInt(data.stockQuantity) : data.stockQuantity
    }

    if (isEdit) {
      if (!productId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateProduct({
        data: cleanedData,
        id: productId
      })
    } else {
      onCreateProduct(cleanedData)
    }
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <Controller
            name={ProductKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Product Name'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Product Name' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name={ProductKey.CATEGORY_ID}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Form.Item
                  label={'Category'}
                  required
                  validateStatus={error ? 'error' : undefined}
                  help={error?.message}
                >
                  <div className='select-wrapper'>
                    <select
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      className={`custom-select ${error ? 'error' : ''}`}
                    >
                      <option value=''>Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((category: CategoryDTO) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                    {field.value && (
                      <button
                        type='button'
                        className='clear-button'
                        onClick={() => field.onChange('')}
                        title='Clear selection'
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </Form.Item>
              )
            }}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name={ProductKey.SKU}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'SKU'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Product SKU' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name={ProductKey.PRICE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Price'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} type='number' placeholder='Enter Product Price' prefix='$' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name={ProductKey.STOCK_QUANTITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Stock Quantity'} validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} type='number' placeholder='Enter Stock Quantity' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ProductKey.DESCRIPTION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Description'} validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input.TextArea {...field} placeholder='Enter Product Description' rows={3} />
              </Form.Item>
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 size={12}>
        <Stack display={'flex'} justifyContent={'flex-end'} direction={'row'} spacing={2}>
          <Button disabled={isCreatingLoading || isUpdating} variant='outlined' color='error' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            size='large'
            color='primary'
            disabled={isCreatingLoading || isUpdating || categoriesLoading}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Grid2>
    </Form>
  )
}
