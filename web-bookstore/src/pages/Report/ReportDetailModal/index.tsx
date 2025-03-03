import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { ReportTypes } from '../../../queries/Reports'

interface ReportDetailModalProps {
  isVisible: boolean
  onClose: () => void
  reportData?: ReportTypes
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ isVisible, onClose, reportData }) => {
  if (!reportData) return null

  return (
    <Modal
      title='Report Details'
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
                Report ID
              </Typography>
              <Typography variant='body1'>{reportData.id}</Typography>
            </Grid>
            {reportData.name && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Name
                </Typography>
                <Typography variant='body1'>{reportData.name}</Typography>
              </Grid>
            )}
            {reportData.inventory && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Inventory
                </Typography>
                <Typography variant='body1'>{reportData.inventory}</Typography>
              </Grid>
            )}
            {reportData.price && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Price
                </Typography>
                <Typography variant='body1'>{reportData.price}</Typography>
              </Grid>
            )}
            {reportData.category && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Category
                </Typography>
                <Typography variant='body1'>{reportData.category}</Typography>
              </Grid>
            )}
            {reportData.supplier && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Supplier
                </Typography>
                <Typography variant='body1'>{reportData.supplier}</Typography>
              </Grid>
            )}
            {reportData.description && (
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Description
                </Typography>
                <Typography variant='body1'>{reportData.description}</Typography>
              </Grid>
            )}
            {/* <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}>
              <Button variant='solid' color='primary' onClick={() => }>
                Edit
              </Button>
            </Grid> */}
          </Grid>
        </Box>

        {/* <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            Additional Details
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            {reportData.createdAt && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Created At
                </Typography>
                <Typography variant='body1'>{new Date(reportData.createdAt).toLocaleDateString()}</Typography>
              </Grid>
            )}
            {reportData.updatedAt && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Updated At
                </Typography>
                <Typography variant='body1'>{new Date(reportData.updatedAt).toLocaleDateString()}</Typography>
              </Grid>
            )}
          </Grid>
        </Box> */}
      </Stack>
    </Modal>
  )
}
