import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Warehouse } from '@mui/icons-material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import CustomDatePicker from '../../../components/CustomDatePicker.tsx'
import { CustomTableSearch } from '../../../components/CustomTableSearch'

export default function Header() {
  return (
    <Stack direction='row' spacing={1} style={{ paddingTop: '10px', margin: '0 16px 0 16px' }}>
      <Box flex={1}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins' }} color='text.primary'>
            <Warehouse sx={{ mr: 0.5 }} fontSize='inherit' />
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>

      <Stack direction='row' spacing={1}>
        <CustomTableSearch placeholder='Search...' />
        <CustomDatePicker />
      </Stack>
    </Stack>
  )
}
