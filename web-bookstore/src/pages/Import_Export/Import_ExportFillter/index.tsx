import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLOR_CODE } from '../../../configs/color'

const Import_ExportFilter: React.FC<Props> = () => {
  //example of using select component
  const [age, setAge] = React.useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  const [searchParams, setSearchParams] = useSearchParams()

  const currentSearchParams = Object.fromEntries([...searchParams])

  const handleClearAll = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { industryIds, accountIds, sectorIds, ...restSearchParams } = currentSearchParams
    setSearchParams(restSearchParams)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const onFilter = (name: string, value: Array<any> = []) => {
  //     if (isEmpty(value)) {
  //       const { [name]: _, ...restParams } = currentSearchParams
  //       setSearchParams(restParams)
  //       return
  //     }
  //     setSearchParams({ ...currentSearchParams, [name]: value?.join(',') })
  //   }

  return (
    <Container maxWidth='xs' sx={{ p: 2, width: 340 }}>
      <Stack direction='row' alignItems='center' mb={2} justifyContent='space-between'>
        <Typography variant='h5' mr={3} color={COLOR_CODE.HEADER}>
          Filter
        </Typography>
        <Button type='button' onClick={handleClearAll} style={{ fontWeight: 500 }}>
          Clear All
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={age}
            label='Age'
            size='small'
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

export default Import_ExportFilter
