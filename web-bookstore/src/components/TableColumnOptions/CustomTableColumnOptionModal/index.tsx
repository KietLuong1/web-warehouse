import { Button, Checkbox, Container, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material'
import { MRT_RowData, MRT_TableInstance } from 'material-react-table'
import { COLOR_CODE } from '../../../configs/color'
import { Callback } from '../../../redux/types'

export default function CustomTableColumnOptionsModal<T extends MRT_RowData>({
  table,
  hasActionColumn = true
}: Props<T>) {
  const removedColumnHeaders = ['Select', 'Expand', 'Action']
  const allDataColumns = hasActionColumn
    ? table
        .getAllLeafColumns()
        .filter((column) => column.columnDef.header && !removedColumnHeaders.includes(column.columnDef.header))
    : table.getAllLeafColumns().filter((column) => column.columnDef.header)

  const totalCheckedColumns = allDataColumns.reduce(
    (totalCheck, column) => totalCheck + (column.getIsVisible() ? 1 : 0),
    0
  )

  if (!table) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth='xs' sx={{ py: '16px', pb: '24px' }}>
      <Stack direction='row' alignItems='flex-end' mb={2} justifyContent='space-between'>
        <Typography variant='h5' mr={3} color={COLOR_CODE.GREY_900}>
          Column Options
        </Typography>
        <Button
          variant='text'
          onClick={(e) => {
            if (table.getIsAllColumnsVisible()) {
              return
            }
            table.getToggleAllColumnsVisibilityHandler()(e)
          }}
          style={{ fontSize: 14, height: '100%' }}
        >
          Show all
        </Button>
      </Stack>
      <Stack>
        <FormGroup>
          {allDataColumns.map(
            (column) =>
              !removedColumnHeaders.includes(column.columnDef.header) && (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={column.getIsVisible()}
                      disabled={column.getIsVisible() && totalCheckedColumns === 1}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                  }
                  label={column.columnDef.header}
                />
              )
          )}
        </FormGroup>
      </Stack>
    </Container>
  )
}

type Props<T extends MRT_RowData> = {
  table: MRT_TableInstance<T>
  handleClosePopup?: Callback
  hasActionColumn?: boolean
}
