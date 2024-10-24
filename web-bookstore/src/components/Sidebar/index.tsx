import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MenuIcon, X } from 'lucide-react'
import Image from 'material-ui-image'
import { useState } from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMAGES } from '../../configs/images'
import { MenuItems } from './MenuItems'
import './styles.scss'

export const SidebarCmp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sidebar
      collapsed={collapsed}
      className='cmp-sidebar'
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#1F2937'
        }
      }}
    >
      <Stack className='cmp-sidebar__container'>
        <Box className='cmp-sidebar__items'>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: 'white',
              height: '50%',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {collapsed ? <MenuIcon size={18} /> : <X size={18} />}
          </IconButton>
        </Box>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: collapsed ? 'column' : 'row'
          }}
        >
          <Image
            src={IMAGES.logo}
            style={{
              display: 'block',
              paddingTop: '30px',
              backgroundColor: 'transparent'
            }}
            imageStyle={{
              height: '45px',
              width: 'auto',
              position: 'relative',
              borderRadius: '50%'
            }}
            disableSpinner={true}
            disableTransition={true}
          />
          {!collapsed && (
            <Stack className='cmp-sidebar__heading-text'>
              <Typography color='white' fontWeight={400} variant='h4' fontFamily={'Poppins'}>
                Warehouse Management
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Menu
        menuItemStyles={{
          button: {
            color: 'white',
            '&:hover': {
              color: 'white',
              backgroundColor: '#2d3748'
            },
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: 'white'
            },
            [`& .pro-icon-wrapper`]: {
              color: 'white'
            }
          }
        }}
      >
        {MenuItems.map((val) => {
          return (
            <MenuItem
              icon={val.icon}
              key={val.link}
              onClick={() => {
                navigate(val.link)
              }}
              active={location.pathname === val.link}
            >
              {val.title}
            </MenuItem>
          )
        })}
      </Menu>
    </Sidebar>
  )
}
