import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { ProductTypes } from '../../../queries'

interface ProductDetailModalProps {
  isVisible: boolean
  onClose: () => void
  productData?: ProductTypes
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isVisible, onClose, productData }) => {
  if (!productData) return null

  return (
    <Modal
      title='Product Details'
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
                Product ID
              </Typography>
              <Typography variant='body1'>{productData.productId}</Typography>
            </Grid>
            {productData.name && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Name
                </Typography>
                <Typography variant='body1'>{productData.name}</Typography>
              </Grid>
            )}
            {productData.category && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Category
                </Typography>
                <Typography variant='body1'>{productData.category}</Typography>
              </Grid>
            )}
            {productData.description && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Description
                </Typography>
                <Typography variant='body1'>{productData.description}</Typography>
              </Grid>
            )}
            {productData.price && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Price
                </Typography>
                <Typography variant='body1'>{productData.price}</Typography>
              </Grid>
            )}
            {productData.status && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Status
                </Typography>
                <Typography variant='body1'>{productData.status}</Typography>
              </Grid>
            )}
            {productData.createDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Create Date
                </Typography>
                <Typography variant='body1'>{productData.createDate}</Typography>
              </Grid>
            )}
            {productData.expiredDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expired Date
                </Typography>
                <Typography variant='body1'>{productData.expiredDate}</Typography>
              </Grid>
            )}
            {productData.minimumQuantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Minimum Quantity
                </Typography>
                <Typography variant='body1'>{productData.minimumQuantity}</Typography>
              </Grid>
            )}
            {productData.limitQuantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Limit Quantity
                </Typography>
                <Typography variant='body1'>{productData.limitQuantity}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
