/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CameraOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { Stack } from '@mui/material'
import { Avatar, Button, Card, Space, Typography, Upload } from 'antd'
import './styles.scss'

const { Title, Text } = Typography

interface ProfileCardProps {
  name?: string
  sub?: string
  avatarUrl?: string
}

export default function ProfileCard({ name = 'John Doe', sub = 'Software Engineer', avatarUrl }: ProfileCardProps) {
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      // Handle avatar upload logic
      console.log('Avatar uploaded', info.file)
    }
  }

  return (
    <Card className='card-container' bordered={true}>
      <Stack className='card-container__background' />
      <Space direction='vertical' align='center' size='large' style={{ zIndex: 2, position: 'relative' }}>
        <Upload
          name='avatar'
          listType='picture-circle'
          className='avatar-uploader'
          showUploadList={false}
          action='/api/upload'
          onChange={handleAvatarUpload}
        >
          <Space
            style={{
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <Avatar
              size={90}
              src={'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png'}
              icon={<UserOutlined />}
              className='card-container__avatar'
            />
            <Space className='card-container__camera'>
              <CameraOutlined style={{ color: 'white', fontSize: 16 }} />
            </Space>
          </Space>
        </Upload>

        <Space direction='vertical' align='center'>
          <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
            {name}
          </Title>
          <Text type='secondary'>{sub}</Text>
        </Space>

        <Button
          type='primary'
          block
          icon={<EditOutlined />}
          style={{
            height: 44,
            borderRadius: 8
          }}
        >
          View Public Profile
        </Button>
      </Space>
    </Card>
  )
}
