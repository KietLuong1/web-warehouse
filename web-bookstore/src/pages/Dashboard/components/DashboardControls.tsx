import { DateRange, Refresh as RefreshIcon, Timeline } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'
import { TrendPeriod } from '../../../queries/Dashboard/dashboard.types'

interface DashboardControlsProps {
  onDateRangeChange: (dateRange: [Date, Date] | null) => void
  onRefreshIntervalChange: (interval: number | null) => void
  onTrendPeriodChange: (period: TrendPeriod) => void
  onManualRefresh: () => void
  isLoading?: boolean
  currentDateRange: [Date, Date] | null
  currentRefreshInterval: number | null
  currentTrendPeriod: TrendPeriod
}

export default function DashboardControls({
  onDateRangeChange,
  onRefreshIntervalChange,
  onTrendPeriodChange,
  onManualRefresh,
  isLoading = false,
  currentDateRange,
  currentRefreshInterval,
  currentTrendPeriod
}: DashboardControlsProps) {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | undefined>(
    currentDateRange ? [dayjs(currentDateRange[0]), dayjs(currentDateRange[1])] : undefined
  )

  const handleDateRangeChange = useCallback(
    (newValue: [Dayjs | null, Dayjs | null] | undefined) => {
      setDateRange(newValue)
      if (newValue && newValue[0] && newValue[1]) {
        onDateRangeChange([newValue[0].toDate(), newValue[1].toDate()])
      } else {
        onDateRangeChange(null)
      }
    },
    [onDateRangeChange]
  )

  const handleClearDateRange = useCallback(() => {
    setDateRange(undefined)
    onDateRangeChange(null)
  }, [onDateRangeChange])

  const refreshIntervalOptions = [
    { value: null, label: 'Manual' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' }
  ]

  const trendPeriodOptions: { value: TrendPeriod; label: string }[] = [
    { value: 'DAILY', label: 'Daily' },
    { value: 'WEEKLY', label: 'Weekly' },
    { value: 'MONTHLY', label: 'Monthly' }
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef'
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent='space-between'
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='center'>
            {' '}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DateRange color='action' />
              <DatePicker
                label='Start Date'
                value={dateRange ? dateRange[0] : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const endDate = dateRange ? dateRange[1] : newValue
                    handleDateRangeChange([newValue, endDate])
                  }
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: 'Start date'
                  }
                }}
              />
              <DatePicker
                label='End Date'
                value={dateRange ? dateRange[1] : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const startDate = dateRange ? dateRange[0] : newValue
                    handleDateRangeChange([startDate, newValue])
                  }
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: 'End date'
                  }
                }}
              />
              {dateRange && (
                <Button size='small' onClick={handleClearDateRange} variant='outlined'>
                  Clear
                </Button>
              )}
            </Box>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>Refresh</InputLabel>
              <Select
                value={currentRefreshInterval || ''}
                label='Refresh'
                onChange={(e) => onRefreshIntervalChange(e.target.value as number | null)}
              >
                {refreshIntervalOptions.map((option) => (
                  <MenuItem key={option.value || 'manual'} value={option.value || ''}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>Trends</InputLabel>
              <Select
                value={currentTrendPeriod}
                label='Trends'
                onChange={(e) => onTrendPeriodChange(e.target.value as TrendPeriod)}
              >
                {trendPeriodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Status and Actions */}
          <Stack direction='row' spacing={1} alignItems='center'>
            <Chip
              icon={<Timeline />}
              label={`Period: ${currentTrendPeriod.toLowerCase()}`}
              size='small'
              color='primary'
              variant='outlined'
            />

            <Chip
              label={currentRefreshInterval ? `Auto: ${currentRefreshInterval / 1000}s` : 'Manual'}
              size='small'
              color={currentRefreshInterval ? 'success' : 'default'}
              variant='outlined'
            />

            <Tooltip title='Refresh Now'>
              <IconButton size='small' onClick={onManualRefresh} disabled={isLoading} color='primary'>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>
    </LocalizationProvider>
  )
}
