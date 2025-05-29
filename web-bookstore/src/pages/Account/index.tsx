import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip, Spin } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { AccountApiResponse } from '../../queries/Account'
import { AccountDetailModal } from './AccountDetailModel'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateAccountModal'
import { useGetListAccount } from '../../queries/Account/useGetListAccount'
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail'

function Account() {
  // initialise pagination: page 0, size 10
  const { accounts, isFetching, pageNumber, pageSize, totalPages, setParams, invalidate } = useGetListAccount({
    pageNumber: 0,
    pageSize: 10
  })

  const [modalUserId, setModalUserId] = useState<number | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailUserId, setDetailUserId] = useState<number | undefined>()
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const openEdit = (id: number) => {
    setModalUserId(id)
    setIsModalOpen(true)
  }

  const {
    data: detailData,
    isFetching: detailLoading,
    refetch: refetchDetail
  } = useGetAccountDetail(detailUserId ?? 0, {
    queryKey: ['user', detailUserId ?? 0],
    enabled: isDetailOpen && !!detailUserId
  })

  const openDetail = (id: number) => {
    setDetailUserId(id)
    setIsDetailOpen(true)
  }

  const closeDetail = () => {
    setIsDetailOpen(false)
    setDetailUserId(undefined)
  }

  return (
    <>
      <CustomTable
        data={accounts}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Tooltip title='Edit'>
              <EditOutlined
                style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  openEdit(row.original.userId)
                }}
              />
            </Tooltip>
          </div>
        )}
        manualPagination // ← enable server‑side paging
        pageCount={totalPages}
        state={{
          pagination: { pageIndex: pageNumber, pageSize }
        }}
        onPaginationChange={(updater) => {
          const { pageIndex, pageSize } =
            typeof updater === 'function' ? updater({ pageIndex: 0, pageSize: 10 }) : updater
          setParams({ pageNumber: pageIndex, pageSize })
        }}
        renderToolbarInternalActions={({ table }) => <AccountToolbar table={table} onRefresh={invalidate} />}
        renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Name' />}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => openDetail(row.original.userId),
          sx: { cursor: 'pointer' }
        })}
      />

      <Modal
        title={modalUserId ? 'Edit Account' : 'Create Account'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateAccountModal
          userId={modalUserId ? String(modalUserId) : undefined}
          isEdit={!!modalUserId}
          onCloseModal={() => {
            invalidate()
            setIsModalOpen(false)
          }}
        />
      </Modal>

      <AccountDetailModal isVisible={isDetailOpen} onClose={closeDetail} accountData={detailData} />
    </>
  )
}

export default Account
