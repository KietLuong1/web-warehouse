import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Warehouse } from '@mui/icons-material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import CustomDatePicker from '../../../components/CustomDatePicker.tsx'
import { CustomTableSearch } from '../../../components/CustomTableSearch'

export default function Header() {
  return (
    <Stack direction='row' spacing={1} style={{ paddingTop: '10px', margin: '0 16px 0 16px' }}>
      <Box flex={1}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='inherit' fontFamily='Poppins'>
            <Warehouse sx={{ mr: 0.5 }} fontSize='inherit' />
            Dashboard
          </Link>
          <Link underline='hover' color='text.primary' aria-current='page' fontFamily='Poppins'>
            Home
          </Link>
        </Breadcrumbs>
      </Box>

      <Stack direction='row' spacing={1}>
        <CustomTableSearch placeholder='Search...' />
        <CustomDatePicker />
      </Stack>
    </Stack>
  )
}
