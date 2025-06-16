/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { TransactionKey, TransactionPayload } from '../../../queries'
import { useCreateTransaction } from '../../../queries/Transaction/useCreateTransaction'
import { useGetListTransactions } from '../../../queries/Transaction/useGetListTransactions'
import { useTransactionDetail } from '../../../queries/Transaction/useTransactionDetail'
import { useUpdateTransaction } from '../../../queries/Transaction/useUpdateTransaction'
import { TransactionInitValues, TransactionValidationSchema } from './helpers'
import './styles.scss'

type Props = {
  transactionId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateTransactionModal: React.FC<Props> = ({ transactionId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListTransactions } = useGetListTransactions()
  const { onCreateTransaction, isPending: isCreatingLoading } = useCreateTransaction({
    onSuccess: () => {
      Toastify('success', 'Record has been added successfully!')
      handleInvalidateListTransactions()
      reset(TransactionInitValues)
      onCloseModal()
    }
  })
  const { onUpdateTransaction, isPending: isUpdating } = useUpdateTransaction({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListTransactions()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { transaction: detailData, handleInvalidateDetail } = useTransactionDetail({
    id: transactionId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<TransactionPayload>({
    defaultValues: TransactionInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(TransactionValidationSchema) as any
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset({
        transactionType: detailData.transactionType,
        totalPrice: detailData.totalPrice,
        totalProducts: detailData.totalProducts,
        status: detailData.status,
        description: detailData.description || '',
        createdAt: detailData.createdAt,
        product: {
          ...TransactionInitValues.product,
          ...detailData.product
        }
      })
    }
  }, [detailData, isEdit, reset])

  const handleCancel = () => {
    if (!isEdit) {
      reset(TransactionInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: TransactionPayload) => {
    if (isEdit) {
      if (!transactionId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateTransaction({
        data,
        id: transactionId
      })
    } else {
      const result = {
        ...data
      }
      onCreateTransaction(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={TransactionKey.TRANSACTION_TYPE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Transaction Type'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Transaction Type' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name='product.name'
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

        <Grid2 size={12}>
          <Controller
            name={TransactionKey.TOTAL_PRICE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Total Price'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} type='number' placeholder='Enter Total Price' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={TransactionKey.TOTAL_PRODUCTS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Total Products'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} type='number' placeholder='Enter Total Products' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={TransactionKey.STATUS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Status'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <select {...field} className={`status-dropdown ${error ? 'error' : ''}`}>
                  {/* <option value='' disabled>
                    Select Status
                  </option> */}
                  <option value='PENDING'>Pending</option>
                  <option value='PROCESSING'>Processing</option>
                  <option value='COMPLETED'>Completed</option>
                </select>
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
      </Grid2>
    </Form>
  )
}
