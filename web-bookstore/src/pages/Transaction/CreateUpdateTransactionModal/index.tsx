import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { TransactionKey, TransactionPayload } from '../../../queries'
import { useCreateTransaction } from '../../../queries/Transaction/useCreateTransaction'
import { useGetListTransactions } from '../../../queries/Transaction/useGetListTransactions'
import { useTransactionDetail } from '../../../queries/Transaction/useTransactionDetail'
import { useUpdateTransaction } from '../../../queries/Transaction/useUpdateTransaction'
import { TransactionInitValues, TransactionValidationSchema } from './helpers'

type Props = {
  importId?: string
  exportId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateTransactionModal: React.FC<Props> = ({ importId, onCloseModal, isEdit = false }) => {
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

  const { data: detailData, handleInvalidateDetail } = useTransactionDetail({
    id: importId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<TransactionPayload>({
    defaultValues: TransactionInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(TransactionValidationSchema)
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset({
        ...detailData,
        [TransactionKey.EXPIRED_DATE]: detailData.expiredDate
          ? dayjs(detailData.expiredDate).format('YYYY-MM-DD')
          : undefined
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
      if (!importId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateTransaction({
        data: {
          ...data,
          [TransactionKey.EXPIRED_DATE]: data[TransactionKey.EXPIRED_DATE]
            ? dayjs(data[TransactionKey.EXPIRED_DATE]).format('YYYY-MM-DD')
            : ''
        },
        id: importId
      })
    } else {
      const result = {
        ...data,
        [TransactionKey.EXPIRED_DATE]: data[TransactionKey.EXPIRED_DATE]
          ? dayjs(data[TransactionKey.EXPIRED_DATE]).format('YYYY-MM-DD')
          : ''
      }
      onCreateTransaction(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={TransactionKey.BATCH_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Batch ID'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Batch ID' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={TransactionKey.PRODUCT}
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
            name={TransactionKey.LOCATION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Location'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Location' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 container spacing={2} size={12}>
          <Grid2 size={4}>
            <Controller
              name={TransactionKey.EXPIRED_DATE}
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
          <Grid2 size={8}>
            <Controller
              name={TransactionKey.QUANTITY}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={'Quantity'}
                  required
                  validateStatus={error ? 'error' : undefined}
                  help={error?.message}
                >
                  <Input {...field} type='number' placeholder='Enter Quantity' min={1} />
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
