import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MenuIcon, X } from 'lucide-react'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu } from 'react-pro-sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMAGES } from '../../configs/images'
import { MenuItems } from './MenuItem'
import './styles.scss'
import { useAuthentication } from '../../context/AuthenticationContext'

export const SidebarCmp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuthentication()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    console.log('User role:', userRole)
    setIsAdmin(userRole === 'ADMIN')
  }, [])

  const filterMenuItem = isAdmin ? MenuItems : MenuItems.filter((item) => item.title !== 'Account')

  const handleMenuClick = (item: (typeof MenuItems)[0]) => {
    if (item.action === 'logout') {
      logout()
      navigate('/login', { replace: true })
    } else if (item.link) {
      navigate(item.link)
    }
  }

  return (
    <Sidebar
      collapsed={collapsed}
      className='cmp-sidebar'
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#1F2937',
          height: '100vh',
          position: 'fixed',
          overflowY: 'hidden'
        }
      }}
      width='230px'
      collapsedWidth='100px'
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
              paddingTop: '2px',
              backgroundColor: 'transparent'
            }}
            imageStyle={{
              height: '55px',
              width: 'auto',
              position: 'relative',
              borderRadius: '30%'
            }}
            disableSpinner={true}
            disableTransition={true}
          />
          {!collapsed && (
            <Stack className='cmp-sidebar__heading-text'>
              <Typography color='white' fontWeight={700} variant='h4' fontFamily={'Poppins'}>
                WMS
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            color: 'white',
            marginLeft: '5px',
            backgroundColor: active ? '#2d3748' : 'transparent',
            '&:hover': {
              color: 'white',
              backgroundColor: active ? '#2d3748' : '#2d3748'
            }
          })
        }}
      >
        {filterMenuItem.map((item) => {
          if (collapsed) {
            if (item.submenus) {
              const firstSubmenuLink = item.submenus[0].link
              return (
                <MenuItem
                  icon={item.icon}
                  key={item.title}
                  onClick={() => {
                    handleMenuClick(firstSubmenuLink, item.title)
                  }}
                  active={location.pathname === item.link}
                >
                  {item.title}
                </MenuItem>
              )
            }
            // For regular items, render normally
            return (
              <MenuItem
                icon={item.icon}
                key={item.link}
                onClick={() => {
                  handleMenuClick(item.link, item.title)
                }}
                active={location.pathname === item.link}
              >
                {item.title}
              </MenuItem>
            )
          }

          // When expanded, render with submenus
          if (item.submenus) {
            return (
              <SubMenu label={item.title} icon={item.icon} key={item.title} active={location.pathname === item.link}>
                {item.submenus.map((subItem) => (
                  <MenuItem
                    key={subItem.title}
                    icon={subItem.icon}
                    active={location.pathname === subItem.link}
                    onClick={() => handleMenuClick(subItem.link, subItem.title)}
                  >
                    {subItem.title}
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }

          return (
            <MenuItem
              key={item.title}
              icon={item.icon}
              active={location.pathname === item.link}
              onClick={() => handleMenuClick(item)}
            >
              {item.title}
            </MenuItem>
          )
        })}
      </Menu>
    </Sidebar>
  )
}
