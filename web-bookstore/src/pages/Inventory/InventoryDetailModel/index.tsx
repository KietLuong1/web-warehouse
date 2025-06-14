import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { InventoryResponse } from '../../../queries'

interface InventoryDetailModalProps {
  isVisible: boolean
  onClose: () => void
  inventoryData?: InventoryResponse
}

export const InventoryDetailModal: React.FC<InventoryDetailModalProps> = ({ isVisible, onClose, inventoryData }) => {
  if (!inventoryData) return null

  return (
    <Modal
      title='Inventory Details'
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
                Inventory ID
              </Typography>
              <Typography variant='body1'>{inventoryData.id}</Typography>
            </Grid>
            {inventoryData.quantityOnHand && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Quatity
                </Typography>
                <Typography variant='body1'>{inventoryData.quantityOnHand}</Typography>
              </Grid>
            )}
            {inventoryData.maxStockLevel && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Import Date
                </Typography>
                <Typography variant='body1'>{inventoryData.maxStockLevel}</Typography>
              </Grid>
            )}
            {inventoryData.expiryDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expire Date
                </Typography>
                <Typography variant='body1'>{inventoryData.expiryDate}</Typography>
              </Grid>
            )}
            {inventoryData.batchNumber && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Batch Number
                </Typography>
                <Typography variant='body1'>{inventoryData.batchNumber}</Typography>
              </Grid>
            )}
            {inventoryData.reservedQuantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Reserved Quantity
                </Typography>
                <Typography variant='body1'>{inventoryData.reservedQuantity}</Typography>
              </Grid>
            )}
            {inventoryData.productId && (
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Product ID
                </Typography>
                <Typography variant='body1'>{inventoryData.productId}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
