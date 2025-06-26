import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { SupplierTypes } from '../../../queries'

interface SupplierDetailModalProps {
  isVisible: boolean
  onClose: () => void
  supplierData?: SupplierTypes
}

export const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ isVisible, onClose, supplierData }) => {
  if (!supplierData) return null

  return (
    <Modal
      title='Supplier Details'
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
                Name
              </Typography>
              <Typography variant='body1'>{supplierData.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Address
              </Typography>
              <Typography variant='body1'>{supplierData.address}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                Contact Info
              </Typography>
              <Typography variant='body1'>{supplierData.contactInfo}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Create Date
              </Typography>
              <Typography variant='body1'>{supplierData.createdAt || '---'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
