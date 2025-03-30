import { SearchOutlined } from '@ant-design/icons'
import { Stack } from '@mui/material'
import { Button, DatePicker, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'

const { RangePicker } = DatePicker

interface FilterByDateProps {
  onFilter?: (dates: [Dayjs | null, Dayjs | null] | null) => void
}

function FilterByDate({ onFilter }: FilterByDateProps) {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null)

  const handleChange = (dateRange: [Dayjs | null, Dayjs | null] | null) => {
    if (dateRange && dateRange[0] && dateRange[1] && dateRange[0].isAfter(dateRange[1])) {
      message.error('From date cannot be after To date')
      return
    }
    setDates(dateRange)
  }

  const handleFilter = () => {
    if (onFilter) {
      onFilter(dates)
    }
  }

  const handleClear = () => {
    setDates(null)
    if (onFilter) {
      onFilter(null)
    }
  }

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <RangePicker
        onChange={handleChange}
        value={dates}
        format='DD/MM/YYYY'
        placeholder={['From', 'To']}
        allowEmpty={[true, true]}
        style={{ width: '250px' }}
      />
      <Button type='primary' icon={<SearchOutlined />} onClick={handleFilter}>
        Apply Filter
      </Button>
      {dates && (dates[0] || dates[1]) && <Button onClick={handleClear}>Clear Filter</Button>}
    </Stack>
  )
}

export default FilterByDate
