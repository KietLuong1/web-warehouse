import { CustomTable } from '../../components/Table'
import { Import_Export } from '../../queries'
import { useGetListImport } from '../../queries/Import_Export/useGetListImport_Export'
import { allColumns } from './allColumns'

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
    />
  )
}

export default Service
