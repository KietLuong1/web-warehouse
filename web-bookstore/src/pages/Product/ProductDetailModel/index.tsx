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
            {productData.categoryId && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Category
                </Typography>
                <Typography variant='body1'>{productData.categoryId}</Typography>
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
            {productData.sku && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Sku
                </Typography>
                <Typography variant='body1'>{productData.sku}</Typography>
              </Grid>
            )}
            {productData.createdAt && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Create Date
                </Typography>
                <Typography variant='body1'>{productData.createdAt}</Typography>
              </Grid>
            )}
            {productData.expiryDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expired Date
                </Typography>
                <Typography variant='body1'>{productData.expiryDate}</Typography>
              </Grid>
            )}
            {productData.stockQuantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Minimum Quantity
                </Typography>
                <Typography variant='body1'>{productData.stockQuantity}</Typography>
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
          </Grid>
        </Box>
      </Stack>
    </Modal>
  )
}
