import { PlusOutlined } from '@ant-design/icons'
import { Refresh } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Button } from 'antd'
import { MRT_TableInstance } from 'material-react-table'
import CustomTableColumnOptions from '../../../components/TableColumnOptions'
import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal'
import CustomTableFilterContainer from '../../../components/TableFilter'
import { COLOR_CODE } from '../../../configs/color'
import { Locations } from '../../../queries'
import Import_ExportFilter from '../LocationFilter'

export const LocationToolbar: React.FC<Props> = ({ table }) => {
  //   const dispatch = useDispatch()

  //   const onCreatePartner = useCallback(() => {
  //     dispatch(
  //       showDialog({
  //         type: DIALOG_TYPES.CONTENT_DIALOG,
  //         data: {
  //           title: 'Create Business Partner',
  //           maxWidth: 'lg',
  //           content: <CreateEditBusinessAccounts />,
  //           onCancel: () => {
  //             dispatch(hideDialog())
  //           }
  //         }
  //       })
  //     )
  //   }, [dispatch])

  return (
    <Stack direction='column' mt={1}>
      <Stack direction='row' mb={1} justifyContent='space-between'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Tooltip placement='top' arrow title='Refresh'>
            <IconButton
              sx={{
                color: COLOR_CODE.HEADER,
                background: COLOR_CODE.DISABLED_INPUT,
                p: '10px',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
                }
              }}
              onClick={() => {}}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter' arrow placement='top'>
            <CustomTableFilterContainer filterParamsKeys={undefined}>
              <Import_ExportFilter />
            </CustomTableFilterContainer>
          </Tooltip>
          <CustomTableColumnOptions>
            <Tooltip title='Column Options' arrow placement='top'>
              <CustomTableColumnOptionsModal<Locations> table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
          <Button type='primary' size='large' onClick={() => {}} icon={<PlusOutlined />}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

type Props = {
  table: MRT_TableInstance<Locations>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSetParams?: (params: any) => void
}
