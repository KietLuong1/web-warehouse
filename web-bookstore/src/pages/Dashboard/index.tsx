import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Header from './components/header'
import MainStack from './components/mainStack'

function Dashboard() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '8px 0',
        overflow: 'hidden'
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Header />
        <MainStack />
      </Stack>
    </Box>
  )
}

export default Dashboard
