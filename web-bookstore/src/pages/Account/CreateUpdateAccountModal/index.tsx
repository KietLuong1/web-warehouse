import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { Grid2, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Toastify } from '../../../components/Toastify'
import { AccountKey, UserDto } from '../../../queries/Account'
import { useCreateAccount } from '../../../queries/Account/useCreateAccount'
import { useUpdateAccount } from '../../../queries/Account/useUpdateAccount'
import { useGetAccountDetail } from '../../../queries/Account/useGetAccountDetail'
import { AccountInitValues, AccountValidationSchema } from './helpers'

type Props = {
  userId?: string
  isEdit?: boolean
  onCloseModal: () => void
}

export const CreateUpdateAccountModal: React.FC<Props> = ({ userId, isEdit = false, onCloseModal }) => {
  const { data: detailData } = useGetAccountDetail(Number(userId), {
    queryKey: ['user', Number(userId)],
    enabled: isEdit
  })

  const { mutate: createAccount, isPending: creating } = useCreateAccount({
    onSuccess: () => {
      Toastify('success', 'Account created!')
      onCloseModal()
    }
  })

  const { mutate: updateAccount, isPending: updating } = useUpdateAccount({
    onSuccess: () => {
      Toastify('success', 'Account updated!')
      onCloseModal()
    }
  })

  const { handleSubmit, control, reset } = useForm<UserDto>({
    defaultValues: AccountInitValues,
    resolver: yupResolver(AccountValidationSchema),
    context: { isEdit },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  // when editing, load detail into form
  useEffect(() => {
    if (isEdit && detailData) {
      reset(detailData)
    }
  }, [isEdit, detailData, reset])

  const onSubmit = (data: UserDto) => {
    console.log('🛠 onSubmit fired with', data)

    if (isEdit && userId) {
      console.log('✏️ update payload', { ...data, userId: Number(userId) })
      updateAccount({ ...data, userId: Number(userId) })
    } else {
      console.log('➕ create payload', data)
      createAccount(data)
    }
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        {[
          { key: AccountKey.NAME, label: 'Full Name' },
          { key: AccountKey.USERNAME, label: 'Username' },
          { key: AccountKey.EMAIL, label: 'Email', props: { type: 'email' } },
          { key: AccountKey.ROLE, label: 'Role' },
          // only show pwd on create
          ...(!isEdit ? [{ key: AccountKey.PASSWORD, label: 'Password', Password: true }] : [])
        ].map(({ key, label, props, Password }) => (
          <Grid2 size={12} key={key}>
            <Controller
              name={key as any}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label={label} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                  <Input {...field} placeholder={label} {...props} />
                </Form.Item>
              )}
            />
          </Grid2>
        ))}
        <Grid2 size={12}>
          <Stack display={'flex'} justifyContent='flex-end' direction={'row'}>
            <Button disabled={creating || updating} variant='outlined' onClick={onCloseModal}>
              Cancel
            </Button>

            <Button htmlType='submit' type='primary' loading={creating || updating}>
              Save
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Form>
  )

  // return (
  //   <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
  //     <Grid2 container>
  //       <Grid2 size={12}>
  //         <Controller
  //           name={AccountKey.NAME}
  //           control={control}
  //           render={({ field, fieldState: { error } }) => (
  //             <Form.Item
  //               label={'Full Name'}
  //               required
  //               validateStatus={error ? 'error' : undefined}
  //               help={error?.message}
  //             >
  //               <Input {...field} placeholder='Enter Full Name' />
  //             </Form.Item>
  //           )}
  //         />
  //       </Grid2>
  //       <Grid2 size={12}>
  //         <Controller
  //           name={AccountKey.USERNAME}
  //           control={control}
  //           render={({ field, fieldState: { error } }) => (
  //             <Form.Item label={'Username'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
  //               <Input {...field} placeholder='Enter Username' />
  //             </Form.Item>
  //           )}
  //         />
  //       </Grid2>
  //       <Grid2 size={12}>
  //         <Controller
  //           name={AccountKey.EMAIL}
  //           control={control}
  //           render={({ field, fieldState: { error } }) => (
  //             <Form.Item label={'Email'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
  //               <Input {...field} placeholder='Enter Email' />
  //             </Form.Item>
  //           )}
  //         />
  //       </Grid2>
  //       <Grid2 size={12}>
  //         <Controller
  //           name={AccountKey.ROLE}
  //           control={control}
  //           render={({ field, fieldState: { error } }) => (
  //             <Form.Item label={'Role'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
  //               <Input {...field} placeholder='Enter Role' />
  //             </Form.Item>
  //           )}
  //         />
  //       </Grid2>
  //       <Grid2 size={12}>
  //         <Controller
  //           name={AccountKey.PASSWORD}
  //           control={control}
  //           render={({ field, fieldState: { error } }) => (
  //             <Form.Item label={'Password'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
  //               <Input.Password {...field} placeholder='Enter Password' />
  //             </Form.Item>
  //           )}
  //         />
  //       </Grid2>
  //       <Grid2 size={12}>
  //         <Stack display={'flex'} justifyContent={'flex-end'} direction={'row'}>
  //           <Button disabled={isCreatingLoading || isUpdating} variant='outlined' color='error' onClick={handleCancel}>
  //             Cancel
  //           </Button>
  //           <Button type='submit' variant='contained' size='large' color='primary' style={{ marginLeft: '16px' }}>
  //             Save
  //           </Button>
  //         </Stack>
  //       </Grid2>
  //     </Grid2>
  //   </Form>
  // )
}
