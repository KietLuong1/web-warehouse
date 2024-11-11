import React from 'react'
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material'
import Header from './components/header'
import MainStack from './components/mainStack';

function Dashboard() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: 'center',
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 }
      }}
    >
      <Header />

      <MainStack/>

    </Stack>
  )
}

export default Dashboard
