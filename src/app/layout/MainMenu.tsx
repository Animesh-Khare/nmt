import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { lighten } from 'polished'
// import { RootState } from '@store/store'
// import { useSelector } from 'react-redux'

import overviewSVG from '@assets/images/menu/overview.svg'
import organisationsSVG from '@assets/images/menu/organisation.svg'
import contactsSVG from '@assets/images/menu/contact.svg'
import projectsSVG from '@assets/images/menu/projects.svg'
import leadsSVG from '@assets/images/menu/leads.svg'
import usersSVG from '@assets/images/menu/users.svg'
// import CloseIcon from '@assets/images/close.svg'
import LogoutIcon from '@assets/images/menu/logout.svg'

interface MainMenuProps {
    open: boolean
    mobileMenuClick?: () => void
    isMobile?: boolean
}

const MainMenu: React.FC<MainMenuProps> = ({ open, mobileMenuClick, isMobile }) => {
    const location = useLocation()

    const MenuItems = [
        {
            label: 'My overview',
            icon: overviewSVG,
            route: '/overview',
        },
        {
            label: 'Contacts',
            icon: contactsSVG,
            route: '/contacts',
        },
        {
            label: 'Organisations',
            icon: organisationsSVG,
            route: '/organisations',
        },
        {
            label: 'Projects',
            icon: projectsSVG,
            route: '/projects',
        },
        {
            label: 'Leads',
            icon: leadsSVG,
            route: '/leads',
        },
        {
            label: 'Users',
            icon: usersSVG,
            route: '/users',
        },
    ]
    const navigate = useNavigate()

    const isAdminValue = localStorage.getItem('NM-AD')
    useEffect(() => {
        if (isAdminValue === '2' || isAdminValue === 'NULL' || isAdminValue === 'null') {
            MenuItems.pop()
        }
    }, [])

    const [selectedMenu, setSelectedMenu] = useState('My overview')

    useEffect(() => {
        if (location.pathname.includes('organisationOverview')) {
            setSelectedMenu('Organisations')
        }
        if (location.pathname.includes('contactPersonDetail')) {
            setSelectedMenu('Contacts')
        }

        if (location.pathname.includes('contacts')) {
            setSelectedMenu('Contacts')
        }
    }, [location])

    useEffect(() => {
        navigate('/overview', { replace: true })
    }, [])

    const handleClickMenuItem = ({ label, route }: any): void => {
        setSelectedMenu(label)
        mobileMenuClick?.()
        if (route) {
            navigate(route, { replace: true })
        }
        if (label === 'Log out') {
            navigate('/login', { replace: true })
            localStorage.removeItem('console_admin_token')
            // TODO : Handle Logout
        }
    }

    const menus = useMemo(() => {
        const MobileMenuItem = MenuItems.filter((item) => item.label !== 'Logs')

        return isMobile ? [...MobileMenuItem, { label: 'Log out', icon: LogoutIcon }] : MenuItems
    }, [isMobile])

    return (
        <div style={{ height: '100%' }}>
            <List>
                {menus.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                height: '48px',
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                borderRadius: '5px',
                                marginLeft: '2px',
                                marginRight: '2px',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                backgroundColor: selectedMenu === item.label ? 'rgba(184, 222, 255, 0.30)' : '#0C1B2A',
                                '&:hover': {
                                    backgroundColor:
                                        selectedMenu === item.label
                                            ? 'rgba(184, 222, 255, 0.30)'
                                            : lighten(0.1, '#0C1B2A'),
                                },
                            }}
                            onClick={() => {
                                handleClickMenuItem(item)
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    marginRight: '0',
                                }}
                            >
                                <img src={item.icon} alt={item.label} />
                            </ListItemIcon>
                            <ListItemText
                                style={{ fontFamily: 'Lato !important', fontSize: '14px', fontWeight: '400' }}
                                primary={item.label}
                                sx={{
                                    '.MuiListItemText-primary': {
                                        opacity: open ? 1 : 0,
                                        fontFamily: 'Lato !important',
                                        color: '#FFFFFE !important',
                                        fontSize: '14px !important',
                                        fontWeight: 400,
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default MainMenu
