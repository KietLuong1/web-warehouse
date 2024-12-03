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
import { ProductTypes } from '../../../queries'
import { CreateUpdateSupplierModal } from '../CreateUpdateSupplierModal'
import SupplierFilter from '../SupplierFillter'
import { useGetListSuppliers } from '../../../queries/Supplier/useGetListSuppliers'

export const SupplierToolbar: React.FC<Props> = ({ table }) => {
  const { handleInvalidateListSuppliers } = useGetListSuppliers()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openCreateModal = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
  }, [])

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
              onClick={handleInvalidateListSuppliers}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter' arrow placement='top'>
            <CustomTableFilterContainer filterParamsKeys={undefined}>
              <SupplierFilter />
            </CustomTableFilterContainer>
          </Tooltip>
          <CustomTableColumnOptions>
            <Tooltip title='Column Options' arrow placement='top'>
              <CustomTableColumnOptionsModal<ProductTypes> table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
          <Button type='primary' size='large' onClick={openCreateModal} icon={<PlusOutlined />}>
            Create
          </Button>
        </Stack>
      </Stack>

      <Modal
        title='Create Supplier'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateSupplierModal onCloseModal={closeModal} />
      </Modal>
    </Stack>
  )
}

type Props = {
  table: MRT_TableInstance<ProductTypes>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSetParams?: (params: any) => void
}
