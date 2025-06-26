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
            {/* <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Transaction Number
              </Typography>
              <Typography variant='body1'>{'---'}</Typography>
            </Grid> */}
            {transactionData.product && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Product Name
                </Typography>
                <Typography variant='body1'>{transactionData.product.name}</Typography>
              </Grid>
            )}
            {transactionData.totalPrice && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Total Price
                </Typography>
                <Typography variant='body1'>{transactionData.totalPrice}</Typography>
              </Grid>
            )}
            {transactionData.totalProducts && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Total Products
                </Typography>
                <Typography variant='body1'>{transactionData.totalProducts}</Typography>
              </Grid>
            )}
            {transactionData.status && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Status
                </Typography>
                <Typography variant='body1'>{transactionData.status}</Typography>
              </Grid>
            )}
            {transactionData.transactionType && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Transaction Type
                </Typography>
                <Typography variant='body1'>{transactionData.transactionType}</Typography>
              </Grid>
            )}
            {transactionData.description && (
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Description
                </Typography>
                <Typography variant='body1'>{transactionData.description}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
