import { Box, IconButton, Stack, Typography } from '@mui/material'
import { MenuIcon, X } from 'lucide-react'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu } from 'react-pro-sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMAGES } from '../../configs/images'
import { MenuItems } from './MenuItem'
import './styles.scss'
import { useAuth } from '../../context/AuthContext'

export const SidebarCmp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole')
    console.log('Retrieved role:', userRole)
    setIsAdmin(userRole === 'ADMIN')
  }, [])

  const filterMenuItem = isAdmin ? MenuItems : MenuItems.filter((item) => item.title !== 'Account')

  const handleMenuClick = (link: string, title: string) => {
    if (title === 'Logout') {
      logout() // Call logout function
      navigate('/login') // Redirect to login page
    } else {
      navigate(link) // Navigate to the specified route
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
        {filterMenuItem.map((val) => {
          if (collapsed) {
            if (val.submenus) {
              const firstSubmenuLink = val.submenus[0].link
              return (
                <MenuItem
                  icon={val.icon}
                  key={val.title}
                  onClick={() => {
                    handleMenuClick(firstSubmenuLink, val.title)
                  }}
                  active={location.pathname === val.link}
                >
                  {val.title}
                </MenuItem>
              )
            }
            // For regular items, render normally
            return (
              <MenuItem
                icon={val.icon}
                key={val.link}
                onClick={() => {
                  handleMenuClick(val.link, val.title)
                }}
                active={location.pathname === val.link}
              >
                {val.title}
              </MenuItem>
            )
          }

          // When expanded, render with submenus
          if (val.submenus) {
            return (
              <SubMenu label={val.title} icon={val.icon} key={val.title} active={location.pathname === val.link}>
                {val.submenus.map((subItem) => (
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
              icon={val.icon}
              key={val.title}
              onClick={() => {
                handleMenuClick(val.link, val.title)
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
