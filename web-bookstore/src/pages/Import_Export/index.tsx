import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { CustomTable } from '../../components/Tables'

//mock data
interface Person {
  name: string
  age: number
  email: string
  status: 'active' | 'inactive'
  joinDate: string
  salary: number
  department: string
  role: string
}

const data: Person[] = [
  {
    name: 'John Smith',
    age: 30,
    email: 'john.smith@example.com',
    status: 'active',
    joinDate: '2022-03-15',
    salary: 75000,
    department: 'Engineering',
    role: 'Senior Developer'
  },
  {
    name: 'Sara Johnson',
    age: 25,
    email: 'sara.j@example.com',
    status: 'active',
    joinDate: '2023-01-10',
    salary: 65000,
    department: 'Marketing',
    role: 'Marketing Manager'
  },
  {
    name: 'Michael Chen',
    age: 35,
    email: 'm.chen@example.com',
    status: 'inactive',
    joinDate: '2021-06-22',
    salary: 85000,
    department: 'Engineering',
    role: 'Tech Lead'
  },
  {
    name: 'Emma Wilson',
    age: 28,
    email: 'e.wilson@example.com',
    status: 'active',
    joinDate: '2023-09-01',
    salary: 62000,
    department: 'Sales',
    role: 'Sales Representative'
  },
  {
    name: 'David Brown',
    age: 42,
    email: 'd.brown@example.com',
    status: 'active',
    joinDate: '2020-11-30',
    salary: 95000,
    department: 'Management',
    role: 'Product Manager'
  }
]
function Service() {
  //mock data
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
        size: 200,
        Cell: ({ cell }) => <div className='font-medium'>{cell.getValue<string>()}</div>
      },
      {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        Header: <i style={{ color: 'red' }}>Age</i>,
        Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>,
        size: 100
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableClickToCopy: true,
        muiTableHeadCellProps: { style: { color: 'blue' } },
        size: 250
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
              cell.getValue<string>() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {cell.getValue<string>()}
          </div>
        ),
        filterVariant: 'select',
        size: 120
      },
      {
        accessorKey: 'joinDate',
        header: 'Join Date',
        Cell: ({ cell }) => <div>{new Date(cell.getValue<string>()).toLocaleDateString()}</div>,
        sortingFn: 'datetime',
        size: 150
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        Cell: ({ cell }) => <div className='text-left'>${cell.getValue<number>().toLocaleString()}</div>,
        muiTableHeadCellProps: { align: 'left' },
        aggregationFn: 'mean',
        size: 150
      },
      {
        accessorKey: 'department',
        header: 'Department',
        filterVariant: 'select',
        Cell: ({ cell }) => <div className='font-medium'>{cell.getValue<string>()}</div>,
        size: 150
      },
      {
        accessorKey: 'role',
        header: 'Role',
        filterVariant: 'autocomplete',
        size: 200
      }
    ],
    []
  )
  return (
    <CustomTable<Person>
      data={data}
      columns={columns}
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
