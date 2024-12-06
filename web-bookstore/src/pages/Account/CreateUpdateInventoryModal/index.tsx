import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { AccountKey, AccountTypes } from '../../../queries/Account'
import { useCreateAccount } from '../../../queries/Account/useCreateAccount'
import { useGetAccountDetail } from '../../../queries/Account/useGetAccountDetail'
import { useGetListAccount } from '../../../queries/Account/useGetListAccount'
import { useUpdateAccount } from '../../../queries/Account/useUpdateAccount'
import { AccountInitValues } from './helpers'

type Props = {
  accountId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateAccountModal: React.FC<Props> = ({ accountId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListAccount } = useGetListAccount()
  const { onCreateAccount, isPending: isCreatingLoading } = useCreateAccount({
    onSuccess: () => {
      Toastify('success', 'Record has been added successfully!')
      handleInvalidateListAccount()
      reset(AccountInitValues)
      onCloseModal()
    }
  })
  const { onUpdateAccount, isPending: isUpdating } = useUpdateAccount({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListAccount()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useGetAccountDetail({
    id: accountId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<AccountTypes>({
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
      reset(AccountInitValues)
      onCloseModal()
    } else {
      onCloseModal()
    }
  }

  const onSubmit = (data: AccountTypes) => {
    if (isEdit) {
      if (!accountId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateAccount({ data, id: accountId })
    } else {
      const result = {
        ...data,
        [AccountKey.CREATED_AT]: dayjs(data.createdAt).format('YYYY-MM-DD')
      }
      onCreateAccount(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.FULL_NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Full Name'} required>
                <Input {...field} placeholder='Enter Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.ADDRESS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Address'} required>
                <Input {...field} placeholder='Enter Address' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.PHONE_NUMBER}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Batch Number'} required>
                <Input {...field} placeholder='Enter Batch Number' aria-errormessage={error?.message} />
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
