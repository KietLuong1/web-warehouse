/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLOR_CODE } from '../../../configs/color'

const STATUS_OPTIONS = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']
const TRANSACTION_TYPE_OPTIONS = ['PURCHASE', 'SALE', 'RETURN_TO_SUPPLIER']

const TransactionFilter: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentSearchParams = Object.fromEntries([...searchParams])

  const currentStatus = searchParams.get('status') || ''
  const currentTransactionType = searchParams.get('transactionType') || ''

  const handleStatusChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    if (value) {
      setSearchParams({ ...currentSearchParams, status: value })
    } else {
      const { status, ...restParams } = currentSearchParams
      setSearchParams(restParams)
    }
  }

  const handleTransactionTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    if (value) {
      setSearchParams({ ...currentSearchParams, transactionType: value })
    } else {
      const { transactionType, ...restParams } = currentSearchParams
      setSearchParams(restParams)
    }
  }

  const handleClearAll = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, transactionTypes, ...restSearchParams } = currentSearchParams
    setSearchParams(restSearchParams)
  }

  return (
    <Container maxWidth='xs' sx={{ p: 2, width: 340 }}>
      <Stack direction='row' alignItems='center' mb={2} justifyContent='space-between'>
        <Typography variant='h5' mr={3} color={COLOR_CODE.HEADER}>
          Filter
        </Typography>
        <Button type='button' onClick={handleClearAll} style={{ fontWeight: 500 }}>
          Clear All
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel id='status-select-label'>Status</InputLabel>
          <Select
            labelId='status-select-label'
            id='status-select'
            value={currentStatus}
            size='small'
            fullWidth
            onChange={handleStatusChange}
            displayEmpty
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id='transaction-type-select-label'>Transaction Type</InputLabel>
          <Select
            labelId='transaction-type-select-label'
            id='transaction-type-select'
            value={currentTransactionType}
            size='small'
            fullWidth
            onChange={handleTransactionTypeChange}
            displayEmpty
          >
            {TRANSACTION_TYPE_OPTIONS.map((type) => (
              <MenuItem key={type} value={type}>
                {type.replace('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

export default TransactionFilter
