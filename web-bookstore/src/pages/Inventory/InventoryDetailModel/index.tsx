import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { InventoryTypes } from '../../../queries'

interface InventoryDetailModalProps {
  isVisible: boolean
  onClose: () => void
  inventoryData?: InventoryTypes
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
              <Typography variant='body1'>{inventoryData.inventory_id}</Typography>
            </Grid>
            {inventoryData.quantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Quatity
                </Typography>
                <Typography variant='body1'>{inventoryData.quantity}</Typography>
              </Grid>
            )}
            {inventoryData.import_date && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Import Date
                </Typography>
                <Typography variant='body1'>{inventoryData.import_date}</Typography>
              </Grid>
            )}
            {inventoryData.expiry_date && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expire Date
                </Typography>
                <Typography variant='body1'>{inventoryData.expiry_date}</Typography>
              </Grid>
            )}
            {inventoryData.batch_number && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Batch Number
                </Typography>
                <Typography variant='body1'>{inventoryData.batch_number}</Typography>
              </Grid>
            )}
            {inventoryData.location_id && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Location ID
                </Typography>
                <Typography variant='body1'>{inventoryData.location_id}</Typography>
              </Grid>
            )}
            {inventoryData.product_id && (
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Product ID
                </Typography>
                <Typography variant='body1'>{inventoryData.product_id}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
