import { PlusOutlined } from '@ant-design/icons'
import { Refresh } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Button, Modal } from 'antd'
import { MRT_TableInstance } from 'material-react-table'
import { useCallback, useState } from 'react'
import CustomTableColumnOptions from '../../../components/TableColumnOptions'
import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal'
import CustomTableFilterContainer from '../../../components/TableFilter'
import { COLOR_CODE } from '../../../configs/color'
import { CreateUpdateAccountModal } from '../CreateUpdateAccountModal'
import AccountFilter from '../AccountFilter'
import { AccountApiResponse } from '../../../queries/Account'
interface Props {
  table: MRT_TableInstance<any>
  onRefresh: () => void
}

export const AccountToolbar: React.FC<Props> = ({ table, onRefresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openCreate = useCallback(() => setIsModalVisible(true), [])
  const closeCreate = useCallback(() => setIsModalVisible(false), [])

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
              onClick={onRefresh}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter' arrow placement='top'>
            <CustomTableFilterContainer filterParamsKeys={undefined}>
              <AccountFilter />
            </CustomTableFilterContainer>
          </Tooltip>
          <CustomTableColumnOptions>
            <Tooltip title='Column Options' arrow placement='top'>
              <CustomTableColumnOptionsModal table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
          <Button type='primary' size='large' icon={<PlusOutlined />} onClick={openCreate}>
            Create
          </Button>
        </Stack>
      </Stack>

      <Modal
        title='Create Account'
        open={isModalVisible}
        onCancel={closeCreate}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateAccountModal onCloseModal={closeCreate} />
      </Modal>
    </Stack>
  )
}
