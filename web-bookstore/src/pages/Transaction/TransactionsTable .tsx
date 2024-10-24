import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'a', headerName: 'Text One', width: 130 },
  { field: 'b', headerName: 'Text Two', width: 130 },
  {
    field: 'c',
    headerName: 'Number One',
    type: 'number',
    width: 130,
  },
  {
    field: 'd',
    headerName: 'Number Two',
    type: 'number',
    width: 130,
  },
  { field: 'e', headerName: 'Data One', width: 130 },
  { field: 'f', headerName: 'Data Two', width: 130 },
];

const rows = [
    { id: 1, a: 'Sample A1', b: 'Sample B1', c: 10, d: 20, e: 'Data E1', f: 'Data F1' },
    { id: 2, a: 'Sample A2', b: 'Sample B2', c: 15, d: 25, e: 'Data E2', f: 'Data F2' },
    { id: 3, a: 'Sample A3', b: 'Sample B3', c: 12, d: 22, e: 'Data E3', f: 'Data F3' },
    { id: 4, a: 'Sample A4', b: 'Sample B4', c: 18, d: 28, e: 'Data E4', f: 'Data F4' },
    { id: 5, a: 'Sample A5', b: 'Sample B5', c: 20, d: 30, e: 'Data E5', f: 'Data F5' },
    { id: 6, a: 'Sample A6', b: 'Sample B6', c: 25, d: 35, e: 'Data E6', f: 'Data F6' },
    { id: 7, a: 'Sample A7', b: 'Sample B7', c: 30, d: 40, e: 'Data E7', f: 'Data F7' },
    { id: 8, a: 'Sample A8', b: 'Sample B8', c: 35, d: 45, e: 'Data E8', f: 'Data F8' },
    { id: 9, a: 'Sample A9', b: 'Sample B9', c: 40, d: 50, e: 'Data E9', f: 'Data F9' },
    { id: 10, a: 'Sample A10', b: 'Sample B10', c: 45, d: 55, e: 'Data E10', f: 'Data F10' },
    { id: 11, a: 'Sample A11', b: 'Sample B11', c: 50, d: 60, e: 'Data E11', f: 'Data F11' },
    { id: 12, a: 'Sample A12', b: 'Sample B12', c: 55, d: 65, e: 'Data E12', f: 'Data F12' },
    { id: 13, a: 'Sample A13', b: 'Sample B13', c: 60, d: 70, e: 'Data E13', f: 'Data F13' },
    { id: 14, a: 'Sample A14', b: 'Sample B14', c: 65, d: 75, e: 'Data E14', f: 'Data F14' },
    { id: 15, a: 'Sample A15', b: 'Sample B15', c: 70, d: 80, e: 'Data E15', f: 'Data F15' },
    { id: 16, a: 'Sample A16', b: 'Sample B16', c: 75, d: 85, e: 'Data E16', f: 'Data F16' },
    { id: 17, a: 'Sample A17', b: 'Sample B17', c: 80, d: 90, e: 'Data E17', f: 'Data F17' },
    { id: 18, a: 'Sample A18', b: 'Sample B18', c: 85, d: 95, e: 'Data E18', f: 'Data F18' },
    { id: 19, a: 'Sample A19', b: 'Sample B19', c: 90, d: 100, e: 'Data E19', f: 'Data F19' },
    { id: 20, a: 'Sample A20', b: 'Sample B20', c: 95, d: 105, e: 'Data E20', f: 'Data F20' },
  ];
  

const paginationModel = { page: 0, pageSize: 10 };

function TransactionsTable () {
  return (
    <Paper sx={{ height: 630, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default TransactionsTable 