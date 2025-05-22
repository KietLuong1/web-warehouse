
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Button, Modal } from 'antd'
import { MRT_TableInstance } from 'material-react-table'
import { useCallback, useState } from 'react'
import AccountFilter from '../AccountFilter'
import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal'
import CustomTableFilterContainer from '../../../components/TableFilter'
import { CreateUpdateAccountModal } from '../CreateUpdateAccountModal'

interface Props {
  table: MRT_TableInstance<any>
  onRefresh: () => void
}

export const AccountToolbar: React.FC<Props> = ({ table, onRefresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openCreate = useCallback(() => setIsModalVisible(true), [])
  const closeCreate = useCallback(() => setIsModalVisible(false), [])

  return (
    <Stack direction="column" mt={1}>
      <Stack direction="row" mb={1} spacing={2} alignItems="center">
        <Tooltip title="Refresh">
          <IconButton onClick={onRefresh}>
            <ReloadOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter">
          <CustomTableFilterContainer>
            <AccountFilter />
          </CustomTableFilterContainer>
        </Tooltip>
        <CustomTableColumnOptionsModal table={table} />
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={openCreate}
        >
          Create
        </Button>
      </Stack>

      <Modal
        title="Create Account"
        open={isModalVisible}
        onCancel={closeCreate}
        footer={null}
        centered
        bodyStyle={{
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: 8
        }}
      >
        <CreateUpdateAccountModal onCloseModal={closeCreate} />
      </Modal>
    </Stack>
  )
}



// import { PlusOutlined } from '@ant-design/icons'
// import { Refresh } from '@mui/icons-material'
// import { IconButton, Stack, Tooltip } from '@mui/material'
// import { Button, Modal } from 'antd'
// import { MRT_TableInstance } from 'material-react-table'
// import { useCallback, useState } from 'react'
// import CustomTableColumnOptions from '../../../components/TableColumnOptions'
// import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal'
// import CustomTableFilterContainer from '../../../components/TableFilter'
// import { COLOR_CODE } from '../../../configs/color'
// import AccountFilter from '../AccountFilter'
// import { CreateUpdateAccountModal } from '../CreateUpdateAccountModal'
// import { AccountApiResponse } from '../../../queries/Account'
// import { useGetListAccount } from '../../../queries/Account/useGetListAccount'

// export const AccountToolbar: React.FC<Props> = ({ table }) => {
//   const { handleInvalidateListAccount } = useGetListAccount()
//   const [isModalVisible, setIsModalVisible] = useState(false)

//   const openCreateModal = useCallback(() => {
//     setIsModalVisible(true)
//   }, [])

//   const closeModal = useCallback(() => {
//     setIsModalVisible(false)
//   }, [])

//   return (
//     <Stack direction='column' mt={1}>
//       <Stack direction='row' mb={1} justifyContent='space-between'>
//         <Stack direction='row' spacing={2} alignItems='center'>
//           <Tooltip placement='top' arrow title='Refresh'>
//             <IconButton
//               sx={{
//                 color: COLOR_CODE.HEADER,
//                 background: COLOR_CODE.DISABLED_INPUT,
//                 p: '10px',
//                 borderRadius: 1,
//                 '&:hover': {
//                   backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
//                 }
//               }}
//               onClick={handleInvalidateListAccount}
//             >
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title='Filter' arrow placement='top'>
//             <CustomTableFilterContainer filterParamsKeys={undefined}>
//               <AccountFilter />
//             </CustomTableFilterContainer>
//           </Tooltip>
//           <CustomTableColumnOptions>
//             <Tooltip title='Column Options' arrow placement='top'>
//               <CustomTableColumnOptionsModal<AccountApiResponse> table={table} />
//             </Tooltip>
//           </CustomTableColumnOptions>
//           <Button type='primary' size='large' onClick={openCreateModal} icon={<PlusOutlined />}>
//             Create
//           </Button>
//         </Stack>
//       </Stack>

//       <Modal
//         title='Create Account'
//         open={isModalVisible}
//         onCancel={closeModal}
//         footer={null}
//         centered
//         styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
//       >
//         <CreateUpdateAccountModal onCloseModal={closeModal} />
//       </Modal>
//     </Stack>
//   )
// }

// type Props = {
//   table: MRT_TableInstance<AccountApiResponse>
//   onSetParams?: (params: any) => void
// }
