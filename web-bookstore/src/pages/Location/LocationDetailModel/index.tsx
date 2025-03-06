import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { LocationTypes } from '../../../queries'

interface LocationDetailModalProps {
  isVisible: boolean
  onClose: () => void
  locationData?: LocationTypes
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
                Location ID
              </Typography>
              <Typography variant='body1'>{locationData.location_id}</Typography>
            </Grid>
            {locationData.code && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Code
                </Typography>
                <Typography variant='body1'>{locationData.code}</Typography>
              </Grid>
            )}
            {locationData.zone && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Zone
                </Typography>
                <Typography variant='body1'>{locationData.zone}</Typography>
              </Grid>
            )}
            {locationData.shelf && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Shelf
                </Typography>
                <Typography variant='body1'>{locationData.shelf}</Typography>
              </Grid>
            )}
            {locationData.rack && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Rack
                </Typography>
                <Typography variant='body1'>{locationData.rack}</Typography>
              </Grid>
            )}
            {locationData.capacity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Capacity
                </Typography>
                <Typography variant='body1'>{locationData.capacity}</Typography>
              </Grid>
            )}
            {locationData.status && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Status
                </Typography>
                <Typography variant='body1'>{locationData.status}</Typography>
              </Grid>
            )}
            {locationData.description && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Description
                </Typography>
                <Typography variant='body1'>{locationData.description}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
