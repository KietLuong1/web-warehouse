import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { TransactionTypes } from '../../../queries'

interface TransactionDetailModalProps {
  isVisible: boolean
  onClose: () => void
  transactionData?: TransactionTypes
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isVisible,
  onClose,
  transactionData
}) => {
  if (!transactionData) return null

  return (
    <Modal
      title='Transaction Details'
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
                Transaction ID
              </Typography>
              <Typography variant='body1'>{transactionData.id}</Typography>
            </Grid>
            {transactionData.batchId && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Batch ID
                </Typography>
                <Typography variant='body1'>{transactionData.batchId}</Typography>
              </Grid>
            )}
            {transactionData.product && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Product Name
                </Typography>
                <Typography variant='body1'>{transactionData.product}</Typography>
              </Grid>
            )}
            {transactionData.location && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Location
                </Typography>
                <Typography variant='body1'>{transactionData.location}</Typography>
              </Grid>
            )}
            {transactionData.quantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Quantity
                </Typography>
                <Typography variant='body1'>{transactionData.quantity}</Typography>
              </Grid>
            )}
            {transactionData.expiredDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expired Date
                </Typography>
                <Typography variant='body1'>{transactionData.expiredDate}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
