import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { AccountKey, AccountPayload } from '../../../queries/Account_MockData'
import { useGetAccountDetail } from '../../../queries/Account_MockData/useAccountDetail'
import { useCreateAccount } from '../../../queries/Account_MockData/useCreateAccount'
import { useGetListAccount } from '../../../queries/Account_MockData/useGetListAccounts'
import { useUpdateAccount } from '../../../queries/Account_MockData/useUpdateAccount'
import { AccountInitValues, AccountValidationSchema } from './helpers'

type Props = {
  userId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateAccountModal: React.FC<Props> = ({ userId, onCloseModal, isEdit = false }) => {
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
    userId: userId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<AccountPayload>({
    defaultValues: AccountInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(AccountValidationSchema)
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

  // const onSubmit = (data: AccountPayLoad) => {
  //   if (isEdit) {
  //     if (!userId) {
  //       Toastify('error', 'An ID is missing for update operation.')
  //       return
  //     }
  //     onUpdateAccount(data)
  //   } else {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { userId: _, ...rest } = data // Exclude `userId`
  //     onCreateAccount(rest)
  //   }
  // }

  const onSubmit = (data: AccountPayload) => {
    if (isEdit) {
      if (!userId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateAccount({ data, id: userId })
    } else {
      const result = {
        ...data
      }
      onCreateAccount(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Full Name'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Full Name' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.USERNAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Username'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Username' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.EMAIL}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Email'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Email' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.ROLE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Role'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Role' />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.PASSWORD}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Password'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input.Password {...field} placeholder='Enter Password' />
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
