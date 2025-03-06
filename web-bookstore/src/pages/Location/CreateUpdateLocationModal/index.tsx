import { Button, Grid2, Stack, Select, MenuItem } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { LocationKey, LocationTypes } from '../../../queries'
import { useGetListLocation } from '../../../queries/Location/useGetListLocation'
import { useLocationDetail } from '../../../queries/Location/useLocationDetail'
import { useUpdateLocation } from '../../../queries/Location/useUpdateLocation'
import { LocationInitValues } from './helpers'
import { useCreateLocation } from '../../../queries/Location/useCreateLocation'

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
  const { handleInvalidateListLocation } = useGetListLocation()
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
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useLocationDetail({
    id: locationId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<LocationTypes>({
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
      reset(LocationInitValues)
    }
    onCloseModal()
  }

  const onSubmit = (data: LocationTypes) => {
    if (isEdit) {
      if (!locationId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateLocation({ data, id: locationId })
    } else {
      const result = {
        ...data
      }
      onCreateLocation(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.CODE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Code ID'} required>
                <Input {...field} placeholder='Enter Code' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={LocationKey.ZONE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Zone Name'} required>
                <Input {...field} placeholder='Enter Zone Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={LocationKey.SHELF}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Shelf'} required>
                <Input {...field} placeholder='Enter Shelf' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.RACK}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Rack'} required>
                <Input {...field} placeholder='Enter Rack' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.CAPACITY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Capacity'}>
                <Input {...field} type='number' placeholder='Enter Capacity' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.STATUS}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Status'} required>
                <Select
                  {...field}
                  placeholder="Select Status"
                  error={!!error}
                  displayEmpty
                  style={{ width: '100%' }}
                >
                  <MenuItem value="In progress">In Progress</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={LocationKey.DESCRIPTION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Description'} required>
                <Input {...field} placeholder='Enter Description' aria-errormessage={error?.message} />
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
