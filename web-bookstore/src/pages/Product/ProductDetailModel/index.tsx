/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import { ProductTypes } from '../../../queries'
import { useGetListCategories } from '../../../queries/Setting/useGetListCategories'

interface ProductDetailModalProps {
  isVisible: boolean
  onClose: () => void
  productData?: ProductTypes
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isVisible, onClose, productData }) => {
  const { categories } = useGetListCategories()

  if (!productData) return null

  const getCategoryName = (categoryId: string) => {
    if (!categories || !Array.isArray(categories)) return categoryId
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || categoryId
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <Modal
      title={<Typography variant='h6'>Product Details</Typography>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '12px', backgroundColor: 'transparent' } }}
    >
      <Stack spacing={2}>
        <Box>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
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
                <Typography variant='body1'>{getCategoryName(productData.categoryId)}</Typography>
              </Grid>
            )}

            {productData.price && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Price
                </Typography>
                <Typography variant='body1'>${productData.price}</Typography>
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
                <Typography variant='body1'>{formatDate(productData.createdAt)}</Typography>
              </Grid>
            )}
            {productData.expiryDate && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Expired Date
                </Typography>
                <Typography variant='body1'>{formatDate(productData.expiryDate)}</Typography>
              </Grid>
            )}
            {productData.stockQuantity && (
              <Grid item xs={6}>
                <Typography variant='body2' color='text.secondary'>
                  Stock Quantity
                </Typography>
                <Typography variant='body1'>{productData.stockQuantity}</Typography>
              </Grid>
            )}
            {productData.description && (
              <Grid item xs={12}>
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
