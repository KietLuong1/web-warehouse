import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Inventorys } from '../../queries/Inventory'
import { useGetListInventorys } from '../../queries/Inventory/useGetListInventorys'
import { allColumns } from './allColumns'
import { InventoryToolbar } from './InventoryToolbar'

function ViewInventory() {
  const { data, isFetching } = useGetListInventorys()

  return (
    <CustomTable<Inventorys>
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
      renderToolbarInternalActions={({ table }) => <InventoryToolbar table={table} />}
      renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Inventory ID' />}
    />
  )
}

export default ViewInventory
