import {
  RemoveCircleOutline as ClosedIcon,
  HourglassEmpty as InProgressIcon,
  Schedule as PendingIcon
} from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'

// export type CustomChipStatus = 'In progress' | 'Active' | 'Inactive' | 'Closed'

// Define custom styles for each status icon
const statusStyles = (variant: string) => {
  const iconStyle = { color: 'white', fontSize: '1.25rem', borderRadius: '50%' }

  switch (variant) {
    case 'PROCESSING':
      return {
        icon: <InProgressIcon style={iconStyle} />,
        backgroundColor: '#1677FF'
      }
    case 'PENDING':
      return {
        icon: <PendingIcon style={iconStyle} />,
        backgroundColor: '#faad14'
      }
    case 'COMPLETED':
      return {
        icon: <ClosedIcon style={iconStyle} />,
        backgroundColor: '#6C757D'
      }
    default:
      return {
        icon: <InProgressIcon style={iconStyle} />,
        backgroundColor: '#1677FF'
      }
  }
}

// Define ChipStatus component
type Props = {
  status: string
}

const ChipStatus: React.FC<Props> = ({ status }) => {
  const { icon, backgroundColor } = statusStyles(status)
  return (
    <Chip
      label={status}
      icon={icon}
      // className='flex items-center capitalize'
      sx={{
        backgroundColor: backgroundColor,
        color: 'white',
        pointerEvents: 'none'
      }}
    />
  )
}

export default ChipStatus
