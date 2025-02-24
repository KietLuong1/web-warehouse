import { DownloadOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { getExportMenuItems } from './helpers'
import { ExportableData, ExportFileProps } from './types'

const ExportFile = <T extends ExportableData>({
  data,
  filename = 'export',
  selectedRows,
  columns
}: ExportFileProps<T>): JSX.Element => {
  const items = getExportMenuItems(data, filename, columns, selectedRows)

  return (
    <Dropdown menu={{ items }} placement='bottomRight' disabled={selectedRows?.length === 0}>
      <Button type='primary' icon={<DownloadOutlined />}>
        Export File {selectedRows?.length ? `(${selectedRows.length} selected)` : ''}
      </Button>
    </Dropdown>
  )
}

export default ExportFile
