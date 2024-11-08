import {
  CheckCircle as ActiveIcon,
  RemoveCircleOutline as ClosedIcon,
  Cancel as InactiveIcon,
  HourglassEmpty as InProgressIcon
} from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'

// export type CustomChipStatus = 'In progress' | 'Active' | 'Inactive' | 'Closed'

// Define custom styles for each status icon
const statusStyles = (variant: string) => {
  const iconStyle = { color: 'white', fontSize: '1.25rem', borderRadius: '50%' }

  switch (variant) {
    case 'In progress':
      return {
        icon: <InProgressIcon style={iconStyle} />,
        backgroundColor: '#1677FF'
      }
    case 'Active':
      return {
        icon: <ActiveIcon style={iconStyle} />,
        backgroundColor: '#28A745'
      }
    case 'Inactive':
      return {
        icon: <InactiveIcon style={iconStyle} />,
        backgroundColor: '#F5A623'
      }
    case 'Closed':
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
