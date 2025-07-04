/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail'
import { useGetListAccount } from '../../queries/Account/useGetListAccount'
import { AccountDetailModal } from './AccountDetailModel'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateAccountModal'
import { useSearchParams } from 'react-router-dom'

function Account() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10)

  const [paginationState, setPaginationState] = useState({
    pageIndex: pageFromUrl - 1,
    pageSize: sizeFromUrl
  })

  useEffect(() => {
    if (!searchParams.get('page') || !searchParams.get('size')) {
      setSearchParams(
        {
          page: pageFromUrl.toString(),
          size: sizeFromUrl.toString()
        },
        { replace: true }
      )
    }
  }, [])

  useEffect(() => {
    const currentPage = searchParams.get('page')
    const currentSize = searchParams.get('size')
    const newPage = (paginationState.pageIndex + 1).toString()
    const newSize = paginationState.pageSize.toString()

    if (currentPage !== newPage || currentSize !== newSize) {
      setSearchParams({
        page: newPage,
        size: newSize
      })
    }
  }, [paginationState, searchParams, setSearchParams])
  const { accounts, isFetching, totalPages, setParams, invalidate, totalElements } = useGetListAccount({
    page: paginationState.pageIndex + 1,
    size: paginationState.pageSize
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
        pageCount={totalPages}
        rowCount={totalElements}
        initialState={{
          columnPinning: { right: ['mrt-row-actions'] },
          pagination: { pageIndex: pageFromUrl - 1, pageSize: sizeFromUrl }
        }}
        state={{
          pagination: paginationState
        }}
        onPaginationChange={(updater) => {
          const newPagination = typeof updater === 'function' ? updater(paginationState) : updater
          setPaginationState(newPagination)
          setParams({ page: newPagination.pageIndex + 1, size: newPagination.pageSize })
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
