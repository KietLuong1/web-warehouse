import React from 'react'
import { Warehouse } from '@mui/icons-material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Table from './TransactionsTable '
import { Box, Typography  } from '@mui/material'

function Transaction() {
  return (
    <Box sx={{ marginLeft: '30px', py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='inherit' href='/dashboard' fontFamily={'Poppins'}>
            <Warehouse sx={{ mr: 0.5 }} fontSize='inherit' />
            Home
          </Link>
          <Link underline='hover' color='text.primary' href='/transaction' aria-current='page' fontFamily={'Poppins'}>
            Transaction
          </Link>
        </Breadcrumbs>
      </Box>

      <Typography variant="h4" sx={{ mb: 2 }} fontFamily={'Poppins'}> 
        Transaction Overview
      </Typography>

      <Table />
    </Box>
  )
}

export default Transaction
