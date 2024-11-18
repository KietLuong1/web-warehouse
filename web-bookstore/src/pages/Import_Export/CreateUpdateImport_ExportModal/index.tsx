import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
  const { handleInvalidateListImport } = useGetListImport()
  const { onCreateImport_Export, isPending: isCreatingLoading } = useCreateImport_Export({
    onSuccess: () => {
      Toastify('success', 'Import has been added successfully!')
      handleInvalidateListImport()
      onCloseModal()
    }
  })
  const { onUpdateImportExport, isPending: isUpdating } = useUpdateImport_Export({
    onSuccess: () => {
      Toastify(`success`, `Import has been updated successfully.`)
      handleInvalidateListImport()
      handleInvalidateDetail()
      onCloseModal()
    }
  })
  if (!importId) {
    console.error('Import ID is missing.')
    return
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, handleInvalidateDetail } = useImportExportDetail({ id: importId })
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const defaultValues = useMemo(() => {
    if (!isEdit) {
      return ImportExportInitValues
    }
    return {
      ...data
    }
  }, [data, isEdit])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSubmit, control } = useForm<ImportExports>({
    defaultValues: defaultValues,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange'
  })
  const onSubmit: SubmitHandler<ImportExports> = (data) => {
    if (isEdit) {
      onUpdateImportExport({ data, id: importId })
    } else {
      onCreateImport_Export(data)
    }
  }
  return (
    <Form layout='vertical' onSubmitCapture={handleSubmit(onSubmit)}>
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
            <Button disabled={isCreatingLoading || isUpdating} variant='outlined' color='error' onClick={onCloseModal}>
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
