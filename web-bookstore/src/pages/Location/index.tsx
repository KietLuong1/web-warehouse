import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Location } from '../../queries'
import { useGetListLocations } from '../../queries/Location/useGetListLocations'
import { allColumns } from './allColumns'
import { LocationToolbar } from './LocationToolbar'

function ViewLocation() {
  const { data, isFetching } = useGetListLocations()

  return (
    <CustomTable<Location>
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
      renderToolbarInternalActions={({ table }) => <LocationToolbar table={table} />}
      renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Code' />}
    />
  )
}

export default ViewLocation
