import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'quantity', headerName: 'Quantity', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'supplier', headerName: 'Supplier', width: 150 },
  { field: 'stockStatus', headerName: 'Stock Status', width: 150 }
]

const rows = [
  {
    id: 1,
    itemName: 'Item A1',
    category: 'Electronics',
    quantity: 50,
    location: 'A1',
    supplier: 'Supplier X',
    stockStatus: 'In Stock'
  },
  {
    id: 2,
    itemName: 'Item B2',
    category: 'Furniture',
    quantity: 10,
    location: 'B3',
    supplier: 'Supplier Y',
    stockStatus: 'Low Stock'
  },
  {
    id: 3,
    itemName: 'Item C3',
    category: 'Clothing',
    quantity: 100,
    location: 'C5',
    supplier: 'Supplier Z',
    stockStatus: 'In Stock'
  },
  {
    id: 4,
    itemName: 'Item D4',
    category: 'Toys',
    quantity: 20,
    location: 'D2',
    supplier: 'Supplier W',
    stockStatus: 'Out of Stock'
  },
  {
    id: 5,
    itemName: 'Item E5',
    category: 'Automotive',
    quantity: 15,
    location: 'A2',
    supplier: 'Supplier X',
    stockStatus: 'Low Stock'
  },
  {
    id: 6,
    itemName: 'Item F6',
    category: 'Electronics',
    quantity: 200,
    location: 'B1',
    supplier: 'Supplier Y',
    stockStatus: 'In Stock'
  },
  {
    id: 7,
    itemName: 'Item G7',
    category: 'Groceries',
    quantity: 5,
    location: 'C1',
    supplier: 'Supplier Z',
    stockStatus: 'Out of Stock'
  },
  {
    id: 8,
    itemName: 'Item H8',
    category: 'Tools',
    quantity: 30,
    location: 'D4',
    supplier: 'Supplier W',
    stockStatus: 'Low Stock'
  },
  {
    id: 9,
    itemName: 'Item I9',
    category: 'Household',
    quantity: 60,
    location: 'A3',
    supplier: 'Supplier X',
    stockStatus: 'In Stock'
  },
  {
    id: 10,
    itemName: 'Item J10',
    category: 'Office Supplies',
    quantity: 40,
    location: 'B2',
    supplier: 'Supplier Y',
    stockStatus: 'In Stock'
  },
  {
    id: 11,
    itemName: 'Item K11',
    category: 'Electronics',
    quantity: 70,
    location: 'A4',
    supplier: 'Supplier Z',
    stockStatus: 'Low Stock'
  },
  {
    id: 12,
    itemName: 'Item L12',
    category: 'Furniture',
    quantity: 25,
    location: 'C2',
    supplier: 'Supplier W',
    stockStatus: 'In Stock'
  },
  {
    id: 13,
    itemName: 'Item M13',
    category: 'Clothing',
    quantity: 90,
    location: 'D3',
    supplier: 'Supplier X',
    stockStatus: 'In Stock'
  },
  {
    id: 14,
    itemName: 'Item N14',
    category: 'Toys',
    quantity: 12,
    location: 'B4',
    supplier: 'Supplier Y',
    stockStatus: 'Out of Stock'
  },
  {
    id: 15,
    itemName: 'Item O15',
    category: 'Automotive',
    quantity: 20,
    location: 'C4',
    supplier: 'Supplier Z',
    stockStatus: 'In Stock'
  },
  {
    id: 16,
    itemName: 'Item P16',
    category: 'Electronics',
    quantity: 150,
    location: 'A5',
    supplier: 'Supplier W',
    stockStatus: 'Low Stock'
  },
  {
    id: 17,
    itemName: 'Item Q17',
    category: 'Groceries',
    quantity: 8,
    location: 'D5',
    supplier: 'Supplier X',
    stockStatus: 'In Stock'
  },
  {
    id: 18,
    itemName: 'Item R18',
    category: 'Tools',
    quantity: 22,
    location: 'C6',
    supplier: 'Supplier Y',
    stockStatus: 'Out of Stock'
  },
  {
    id: 19,
    itemName: 'Item S19',
    category: 'Household',
    quantity: 55,
    location: 'B5',
    supplier: 'Supplier Z',
    stockStatus: 'In Stock'
  },
  {
    id: 20,
    itemName: 'Item T20',
    category: 'Office Supplies',
    quantity: 35,
    location: 'D1',
    supplier: 'Supplier W',
    stockStatus: 'Low Stock'
  }
]

const paginationModel = { page: 0, pageSize: 10 }

function Table() {
  return (
    <Box sx={{ height: 400, overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        checkboxSelection
      />
    </Box>
  )
}

export default Table
