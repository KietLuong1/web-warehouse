import { Button, Grid2, Stack } from '@mui/material'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ImportExportKey, ImportExportTypes } from '../../../queries'
import { useGetListImport } from '../../../queries/Import_Export/useGetListImportExport'
import { useImportExportDetail } from '../../../queries/Import_Export/useImportExportDetail'
import { useUpdateImport_Export } from '../../../queries/Import_Export/useUpdateImportExport'
import { ImportExportInitValues } from './helpers'
import { useCreateImport_Export } from '../../../queries/Import_Export/useCreateImport_Export'

type Props = {
  importId?: string
  exportId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateImport_ExportModal: React.FC<Props> = ({ importId, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListImport } = useGetListImport()
  const { onCreateImport_Export, isPending: isCreatingLoading } = useCreateImport_Export({
    onSuccess: () => {
      Toastify('success', 'Record has been added successfully!')
      handleInvalidateListImport()
      reset(ImportExportInitValues)
      onCloseModal()
    }
  })
  const { onUpdateImportExport, isPending: isUpdating } = useUpdateImport_Export({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListImport()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useImportExportDetail({
    id: importId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<ImportExportTypes>({
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
      reset(ImportExportInitValues)
      onCloseModal()
    } else {
      onCloseModal()
    }
  }

  const onSubmit = (data: ImportExportTypes) => {
    if (isEdit) {
      if (!importId) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateImportExport({ data, id: importId })
    } else {
      const result = {
        ...data,
        [ImportExportKey.EXPIRED_DATE]: dayjs(data.expiredDate).format('YYYY-MM-DD')
      }
      onCreateImport_Export(result)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.BATCH_ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Batch ID'} required>
                <Input {...field} placeholder='Enter Batch ID' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.PRODUCT}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Product Name'} required>
                <Input {...field} placeholder='Enter Product Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.LOCATION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Location'} required>
                <Input {...field} placeholder='Enter Location' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 container spacing={2} size={12}>
          <Grid2 size={4}>
            <Controller
              name={ImportExportKey.EXPIRED_DATE}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Expired Date' validateStatus={error ? 'error' : ''} help={error?.message} required>
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    format='YYYY-MM-DD'
                    placeholder='Enter Expired Date'
                  />
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={8}>
            <Controller
              name={ImportExportKey.QUANTITY}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label={'Quantity'}>
                  <Input {...field} type='number' placeholder='Enter Quantity' aria-errormessage={error?.message} />
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
