import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { AccountTypes } from '../../../queries/Account'

interface AccountDetailModalProps {
  isVisible: boolean
  onClose: () => void
  accountData?: AccountTypes
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({ isVisible, onClose, accountData }) => {
  if (!accountData) return null

  return (
    <Modal
      title='Account Details'
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '12px', backgroundColor: 'transparent' } }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            General Information
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                User ID
              </Typography>
              <Typography variant='body1'>{accountData.userId}</Typography>
            </Grid>
            {accountData.name && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Name
                </Typography>
                <Typography variant='body1'>{accountData.name}</Typography>
              </Grid>
            )}
            {accountData.username && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Username
                </Typography>
                <Typography variant='body1'>{accountData.username}</Typography>
              </Grid>
            )}
            {accountData.email && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Email
                </Typography>
                <Typography variant='body1'>{accountData.email}</Typography>
              </Grid>
            )}
            {accountData.role && (
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Role
                </Typography>
                <Typography variant='body1'>{accountData.role}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
