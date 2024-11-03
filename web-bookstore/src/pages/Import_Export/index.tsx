import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Import_Export } from '../../queries'
import { useGetListImport } from '../../queries/Import_Export/useGetListImport_Export'
import { allColumns } from './allColumns'
import { Import_ExportToolbar } from './Import_ExportToolbar'

function Service() {
  const { data, isFetching } = useGetListImport()

  return (
    <CustomTable<Import_Export>
      data={data || []}
      isLoading={isFetching}
      columns={allColumns}
      isLayoutGridMode
      enableDensityToggle={false}
      enableColumnDragging={false}
      enableRowActions
      isColumnPinning={true}
      nameColumnPinning='mrt-row-actions'
      initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
      renderToolbarInternalActions={({ table }) => <Import_ExportToolbar table={table} />}
      renderTopToolbarCustomActions={({ table }) => (
        <CustomTableSearch table={table} placeholder='Search by Name or Email' />
      )}
    />
  )
}

export default Service
