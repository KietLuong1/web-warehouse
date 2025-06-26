import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { WarehouseDTO } from '../../../queries'

interface LocationDetailModalProps {
  isVisible: boolean
  onClose: () => void
  locationData?: WarehouseDTO
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({ isVisible, onClose, locationData }) => {
  if (!locationData) return null

  return (
    <Modal
      title='Location Details'
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
              <Typography variant='body1'>{locationData.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Location
              </Typography>
              <Typography variant='body1'>{locationData.location}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Capacity
              </Typography>
              <Typography variant='body1'>{locationData.capacity}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Status
              </Typography>
              <Chip
                label={locationData.active ? 'Active' : 'Inactive'}
                color={locationData.active ? 'success' : 'error'}
                variant='filled'
                size='small'
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                Created At
              </Typography>
              <Typography variant='body1'>{locationData.createdAt}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
