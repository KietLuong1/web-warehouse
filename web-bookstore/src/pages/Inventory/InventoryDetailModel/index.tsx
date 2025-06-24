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
                Product Name
              </Typography>
              <Typography variant='body1'>{inventoryData.product.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Warehouse
              </Typography>
              <Typography variant='body1'>{inventoryData.warehouse?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Quatity
              </Typography>
              <Typography variant='body1'>{inventoryData.quantityOnHand}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Max Stock Level
              </Typography>
              <Typography variant='body1'>{inventoryData.maxStockLevel}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Expire Date
              </Typography>
              <Typography variant='body1'>{inventoryData.expiryDate}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Batch Number
              </Typography>
              <Typography variant='body1'>{inventoryData.batchNumber}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Reserved Quantity
              </Typography>
              <Typography variant='body1'>{inventoryData.reservedQuantity}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Available Quantity
              </Typography>
              <Typography variant='body1'>{inventoryData.availableQuantity}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
