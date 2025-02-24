import { Button, Grid2, Stack } from '@mui/material'
import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toastify } from '../../../components/Toastify'
import { ReportKey, ReportTypes } from '../../../queries/Reports'
import { useCreateReport } from '../../../queries/Reports/useCreateReport'
import { useGetListReport } from '../../../queries/Reports/useGetListReports'
import { useGetReportDetail } from '../../../queries/Reports/useReportDetail'
import { useUpdateReport } from '../../../queries/Reports/useUpdateReport'
import { ReportInitValues } from './helpers'

type Props = {
  id?: string
  isEdit?: boolean
  onCloseModal: () => void
}
export const CreateUpdateReportModal: React.FC<Props> = ({ id, onCloseModal, isEdit = false }) => {
  const { handleInvalidateListReport } = useGetListReport()
  const { onCreateReport, isPending: isCreatingLoading } = useCreateReport({
    onSuccess: () => {
      Toastify('success', 'Record has been added successfully!')
      handleInvalidateListReport()
      reset(ReportInitValues)
      onCloseModal()
    }
  })
  const { onUpdateReport, isPending: isUpdating } = useUpdateReport({
    onSuccess: () => {
      Toastify(`success`, `Record has been updated successfully.`)
      handleInvalidateListReport()
      handleInvalidateDetail()
      onCloseModal()
    }
  })

  const { data: detailData, handleInvalidateDetail } = useGetReportDetail({
    id: id ?? ''
  })
  const { handleSubmit, control, reset } = useForm<ReportTypes>({
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
      reset(ReportInitValues)
      onCloseModal()
    } else {
      onCloseModal()
    }
  }

  const onSubmit = (data: ReportTypes) => {
    if (isEdit) {
      if (!id) {
        Toastify('error', 'An ID is missing for update operation.')
        return
      }
      onUpdateReport({ data, id: id })
    } else {
      onCreateReport(data)
    }
  }
  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={12}>
          <Controller
            name={ReportKey.ID}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'ID'} required>
                <Input {...field} placeholder='Enter ID' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ReportKey.NAME}
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
            name={ReportKey.INVENTORY}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Inventory'} required>
                <Input {...field} placeholder='Enter Quantity' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ReportKey.PRICE}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Price'} required>
                <Input {...field} placeholder='Enter Price' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ReportKey.SUPPLIER}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Supplier'} required>
                <Input {...field} placeholder='Enter Supplier' aria-errormessage={error?.message} />
              </Form.Item>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name={ReportKey.DESCRIPTION}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item label={'Description'} required>
                <Input.TextArea {...field} placeholder='Enter Description' aria-errormessage={error?.message} />
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
