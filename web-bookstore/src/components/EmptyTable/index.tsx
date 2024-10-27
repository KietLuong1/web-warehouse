import { Stack, Typography } from '@mui/material'
import { COLOR_CODE } from '../../configs/color'

const EmptyTable: React.FC<Props> = ({ title = 'No records found' }) => (
  <Stack flexGrow={1} justifyContent='center' alignItems='center' my={2}>
    <Typography variant='h5' color={COLOR_CODE.GREY_600} fontWeight={500} textAlign={'center'}>
      {title}
    </Typography>
  </Stack>
)

type Props = {
  title?: string
  style?: React.CSSProperties
  image?: string
  width?: number
}

export default EmptyTable
