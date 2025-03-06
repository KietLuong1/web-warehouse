import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { AccountKey, AccountTypes } from '../../../queries/Account_MockData'
import { useGetAccountDetail } from '../../../queries/Account_MockData/useAccountDetail'
import { useGetListAccount } from '../../../queries/Account_MockData/useGetListAccounts'
import { useUpdateAccount } from '../../../queries/Account_MockData/useUpdateAccount'
import { AccountInitValues } from './helpers'
import { useCreateAccount } from '../../../queries/Account_MockData/useCreateAccount'

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
    }
    onCloseModal()
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

  const onSubmit = (data: AccountTypes) => {
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
              <Form.Item label={'Full Name'} required>
                <Input {...field} placeholder='Enter Full Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.USERNAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Username'} required>
                <Input {...field} placeholder='Enter Username' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.EMAIL}
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Email'} required>
                <Input {...field} placeholder='Enter Email' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.ROLE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Role'} required>
                <Input {...field} placeholder='Enter Role' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={AccountKey.PASSWORD}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Password'} required>
                <Input {...field} placeholder='Enter Password' aria-errormessage={error?.message} />
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
