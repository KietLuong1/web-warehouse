/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { LocationKey, LocationPayload } from '../../../queries'
import { useCreateLocation } from '../../../queries/Location/useCreateLocation'
import { useGetListLocation } from '../../../queries/Location/useGetListLocation'
import { useLocationDetail } from '../../../queries/Location/useLocationDetail'
import { useUpdateLocation } from '../../../queries/Location/useUpdateLocation'
import { LocationInitValues, LocationValidationSchema } from './helpers'

type Props = {
  locationId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateLocationModal: React.FC<Props> = ({
  locationId: locationId,
  onCloseModal,
  isEdit = false
}) => {
  const { handleInvalidateListLocation, onGetAllListLocation } = useGetListLocation()
  const { onCreateLocation, isPending: isCreatingLoading } = useCreateLocation({
    onSuccess: () => {
      Toastify('success', 'Location has been added successfully!')
      handleInvalidateListLocation()
      reset(LocationInitValues)
      onCloseModal()
    }
  })
  const { onUpdateLocation, isPending: isUpdating } = useUpdateLocation({
    onSuccess: () => {
      Toastify(`success`, `Location has been updated successfully.`)
      handleInvalidateListLocation()
      handleInvalidateDetail()

      setTimeout(() => {
        onGetAllListLocation()
      }, 500)

      onCloseModal()
    },
    onError: (error) => {
      console.error('❌ Update failed:', error)
      Toastify('error', 'Failed to update location. Please try again.')
    }
  })

  const { warehouse: detailData, handleInvalidateDetail } = useLocationDetail({
    id: locationId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<LocationPayload>({
    defaultValues: LocationInitValues,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: yupResolver(LocationValidationSchema) as any
  })

  useEffect(() => {
    if (isEdit && detailData) {
      reset(detailData)
    }
  }, [detailData, isEdit, reset])

  const handleCancel = () => {
    if (!isEdit) {
      reset(LocationInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: LocationPayload) => {
    const cleanedData: LocationPayload = {
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      active: data.active
    }

    console.log('🔍 Cleaned data to send:', cleanedData)

    if (isEdit) {
      if (!locationId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateLocation({ data: cleanedData, id: locationId })
    } else {
      onCreateLocation(cleanedData)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Warehouse Name'}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Name' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={LocationKey.LOCATION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label={'Location '}
                required
                validateStatus={error ? 'error' : undefined}
                help={error?.message}
              >
                <Input {...field} placeholder='Enter Location' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={LocationKey.CAPACITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Capacity'} required validateStatus={error ? 'error' : undefined} help={error?.message}>
                <Input {...field} type='number' placeholder='Enter Capacity' />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={LocationKey.ACTIVE}
            control={control}
            render={({ field }) => (
              <Form.Item label={'Status'}>
                <select
                  value={field.value === undefined ? '' : field.value.toString()}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '') {
                      field.onChange(undefined)
                    } else {
                      field.onChange(value === 'true')
                    }
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  style={{
                    width: '100%',
                    height: '32px',
                    padding: '4px 8px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value='true'>Active</option>
                  <option value='false'>Inactive</option>
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
