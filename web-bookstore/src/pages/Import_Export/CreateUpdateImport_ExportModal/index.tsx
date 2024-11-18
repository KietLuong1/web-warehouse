import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ImportExportKey, ImportExports } from '../../../queries'
import { useCreateImport_Export } from '../../../queries/Import_Export/useCreateImport_Export'
import { useGetListImport } from '../../../queries/Import_Export/useGetListImport_Export'
import { useImportExportDetail } from '../../../queries/Import_Export/useImportExportDetail'
import { useUpdateImport_Export } from '../../../queries/Import_Export/useUpdateImportExport'
import { ImportExportInitValues } from './helpers'

type Props = {
  importId?: string
  exportId?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateImport_ExportModal: React.FC<Props> = ({ importId, onCloseModal, isEdit = false }) => {
  const [form] = Form.useForm()

  const { handleInvalidateListImport } = useGetListImport()
  const { onCreateImport_Export, isPending: isCreatingLoading } = useCreateImport_Export({
    onSuccess: () => {
      Toastify('success', 'Record has been added successfully!')
      handleInvalidateListImport()
      form.resetFields()
      onCloseModal()
    }
  })
  const { onUpdateImportExport, isPending: isUpdating } = useUpdateImport_Export({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListImport()
      handleInvalidateDetail()
      form.resetFields()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useImportExportDetail({
    id: importId ?? ''
  })
  const { handleSubmit, control, reset } = useForm<ImportExports>({
    defaultValues: {},
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (isEdit && detailData) {
      form.setFieldsValue(detailData)
      reset(detailData)
    }
  }, [detailData, isEdit, reset, form])

  const handleCancel = () => {
    form.resetFields()
    reset(ImportExportInitValues)
    onCloseModal()
  }

  const onSubmit = (data: ImportExports) => {
    if (isEdit) {
      if (!importId) {
        Toastify('error', 'Import ID is missing for update operation.')
        return
      }
      onUpdateImportExport({ data, id: importId })
    } else {
      onCreateImport_Export(data)
    }
  }
  return (
    <Form form={form} layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.NAME}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Name'} required>
                <Input {...field} placeholder='Enter Name' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.AGE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Age'} required>
                <Input {...field} placeholder='Enter Age' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.EMAIL}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Email'} required>
                <Input {...field} placeholder='Enter Email' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 container spacing={2} size={12}>
          <Grid2 size={6}>
            <Controller
              name={ImportExportKey.JOIN_DATE}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label={'Join Date'}>
                  <Input {...field} type='date' placeholder='Enter Join Date' aria-errormessage={error?.message} />
                </Form.Item>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name={ImportExportKey.SALARY}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Form.Item label={'Salary'}>
                  <Input type='number' {...field} placeholder='Enter Salary' aria-errormessage={error?.message} />
                </Form.Item>
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.DEPARTMENT}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Department'} required>
                <Input {...field} placeholder='Enter Department' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ImportExportKey.ROLE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Role'} required>
                <Input {...field} placeholder='Enter Role' aria-errormessage={error?.message} />
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
