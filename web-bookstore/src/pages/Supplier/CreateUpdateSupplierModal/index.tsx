/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { SupplierPayload } from '../../../queries'
import { useCreateSupplier } from '../../../queries/Supplier/useCreateSupplier'
import { useGetListSuppliers } from '../../../queries/Supplier/useGetListSuppliers'
import { useSupplierDetail } from '../../../queries/Supplier/useSupplierDetail'
import { useUpdateSupplier } from '../../../queries/Supplier/useUpdateSupplier'
import { SupplierFormData, SupplierInitValues, SupplierValidationSchema } from './helpers'

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

  const { handleSubmit, control, reset, setValue } = useForm<SupplierFormData>({
    defaultValues: SupplierInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(SupplierValidationSchema) as any
  })

  const splitContactInfo = (contactInfo: string) => {
    if (!contactInfo) return { email: '', phone: '' }

    const parts = contactInfo.split(' | ')
    return {
      email: parts[0] || '',
      phone: parts[1] || ''
    }
  }

  const combineContactInfo = (email: string, phone: string) => {
    return `${email} | ${phone}`
  }

  useEffect(() => {
    if (isEdit && detailData) {
      const supplierData = detailData.supplier || detailData

      const { email, phone } = splitContactInfo(supplierData.contactInfo || '')

      setTimeout(() => {
        setValue('name', supplierData.name || '', { shouldValidate: true, shouldDirty: true })
        setValue('address', supplierData.address || '', { shouldValidate: true, shouldDirty: true })
        setValue('createdAt', supplierData.createdAt || '', { shouldValidate: true, shouldDirty: true })
        setValue('contactInfo', supplierData.contactInfo || '', { shouldValidate: true, shouldDirty: true })
        setValue('email', email, { shouldValidate: true, shouldDirty: true })
        setValue('phone', phone, { shouldValidate: true, shouldDirty: true })

        setTimeout(() => {
          console.log('🔍 Form values after setting:', {
            name: control._formValues.name,
            address: control._formValues.address,
            email: control._formValues.email,
            phone: control._formValues.phone
          })
        }, 100)
      }, 100)
    }
  }, [detailData, isEdit, setValue, control, supplierId])

  const handleCancel = () => {
    if (!isEdit) {
      reset(SupplierInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: SupplierFormData) => {
    console.log('🔍 Form data before processing:', data)

    const combinedContactInfo = combineContactInfo(data.email, data.phone)
    console.log('📧 Combined contact info:', combinedContactInfo)

    const supplierData: SupplierPayload = {
      name: data.name,
      address: data.address,
      contactInfo: combinedContactInfo,
      createdAt: data.createdAt
    }

    console.log('📤 Supplier data to be sent:', supplierData)

    if (isEdit) {
      if (!supplierId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      console.log('📝 Updating supplier with ID:', supplierId)
      onUpdateSupplier({ data: supplierData, id: supplierId })
    } else {
      console.log('➕ Creating new supplier')
      onCreateSupplier(supplierData)
    }
  }

  return (
    <Form layout='vertical'>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Name'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Supplier Name' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name='address'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Address'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Supplier Address' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Email'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} type='email' placeholder='Enter Email Address' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={6}>
          <Controller
            name='phone'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Phone'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} placeholder='Enter Phone Number' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Stack display={'flex'} justifyContent={'flex-end'} direction={'row'} spacing={2}>
            <Button disabled={isCreatingLoading || isUpdating} variant='outlined' color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isCreatingLoading || isUpdating}
              variant='contained'
              size='large'
              color='primary'
            >
              {isCreatingLoading || isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Form>
  )
}
