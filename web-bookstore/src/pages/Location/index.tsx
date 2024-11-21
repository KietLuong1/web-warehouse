import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { LocationTypes } from '../../queries'
import { useDeleteLocation } from '../../queries/Location/useDeleteLocation'
import { useGetListLocation } from '../../queries/Location/useGetListLocation'
import { allColumns } from './allColumns'
import { CreateUpdateLocationModal } from './CreateUpdateLocationModal'
import { LocationToolbar } from './LocationToolbar'

function Location() {
  const { data, isFetching, handleInvalidateListLocation } = useGetListLocation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<LocationTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const { onDeleteLocation } = useDeleteLocation({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListLocation()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: LocationTypes) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteLocation(rowData)
        }
      })
    },
    [onDeleteLocation]
  )

  const renderRowActions = (row: LocationTypes) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Tooltip title='Edit'>
        <EditOutlined
          style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
          onClick={() => {
            setIsModalVisible(true)
            setSelectedRow(row)
          }}
        />
      </Tooltip>

      <Tooltip title='Delete'>
        <DeleteOutlined
          style={{ fontSize: '16px', color: 'red', cursor: 'pointer' }}
          onClick={() => handleDeleteRecord(row)}
        />
      </Tooltip>
    </div>
  )

  return (
    <>
      <CustomTable<LocationTypes>
        data={data || []}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
        renderToolbarInternalActions={({ table }) => <LocationToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch table={table} placeholder='Search by Code Number or Zone Name' />
        )}
      />
      <Modal
        title='Edit Record'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateLocationModal onCloseModal={closeModal} isEdit locationId={selectedRow?.location_id} />
      </Modal>
    </>
  )
}

export default Location
