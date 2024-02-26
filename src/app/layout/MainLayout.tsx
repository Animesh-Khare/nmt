import * as React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MobileDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar } from '@mui/material'

import MainMenu from '@layout/MainMenu'

import CloseIcon from '@assets/images/close.svg'
// import MenuLogo from '@assets/images/menuLogo.svg'
// import MenuLogoClose from '@assets/images/menuLogoClose.svg'
import LogoutIcon from '@assets/images/menu/logout.svg'
import NimbleIcon from '@assets/images/NimbleIcon.svg'

const drawerWidth = 175

interface Props {
    window?: () => Window
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const DrawerFooter = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: theme.spacing(0, 1),
    marginBottom: '16px',
}))

const DesktopDrawer = styled(MobileDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

const Layout: React.FC = (props: Props) => {
    const { window } = props
    const [open, setOpen] = React.useState(true)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const navigate = useNavigate()

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen)
  
    }

    const handleDrawerOpenClose = (): void => {
        setOpen(!open)
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100%)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    height: '100px',
                    background: '#0C1B2A'
                    
                }}
            >
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingLeft: 0,
                        paddingRight: 0,
                        height: '100%',
                        marginLeft: '20px',
                        marginRight: '20px',
                    }}
                >
                    <img src={NimbleIcon} alt="logo" style={{ marginLeft: '24px' }} />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: {  xs: 'block', sm: 'block', md: 'none' } }}
                        
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DesktopDrawer
                variant="permanent"
                open={open}
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'block' },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#0C1B2A',
                        color: '#fff',
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpenClose}>
                        {!open ? (
                            <MenuIcon style={{ color: '#fff', marginRight: 3 }} />
                        ) : (
                            <img src={CloseIcon} alt="close" style={{ marginRight: 105 }} />
                        )}
                    </IconButton>
                </DrawerHeader>
                <MainMenu open={open} />
                <DrawerFooter>
                    <div style={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
                        <ListItemButton
                            onClick={() => {
                                navigate('/login', { replace: true })
                                localStorage.removeItem('console_admin_token')
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    marginLeft: open ? '4px' : '-10px',
                                }}
                            >
                                <img src={LogoutIcon} alt="logout" />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Exit'}
                                sx={{

                                    '.MuiListItemText-primary': {
                                        opacity: open ? 1 : 0,
                                        fontFamily: 'Lato',
                                        color: '#FFFFFE',
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }


                                
                                }}
                            />
                        </ListItemButton>
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <img src={open ? NimbleIcon : NimbleIcon} alt="nimble" style={{ minHeight: '35px' }} />
                    </div>
                </DrawerFooter>
            </DesktopDrawer>
            <MobileDrawer
                anchor={'left'}
                container={container}
                variant="temporary" 
                open={mobileOpen}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    onBackdropClick: handleDrawerToggle,
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' , md: 'none'},
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#0C1B2A',
                        color: '#fff',
                        height: '100vh',
                    },
                }}
            >
                <DrawerHeader
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        minHeight: '100px',
                        marginLeft: '20px',
                        marginRight: '20px',
                    }}
                >
                    <img src={NimbleIcon} alt="logo" style={{ marginLeft: '24px' }} />
                    <IconButton onClick={handleDrawerToggle}>
                        {mobileOpen && <img src={CloseIcon} alt="close" />}
                    </IconButton>
                </DrawerHeader>
                <MainMenu
                    open={mobileOpen}
                    mobileMenuClick={() => {
                        setMobileOpen(false)
                    }}
                    isMobile
                />
            </MobileDrawer>
        </>
    )
}

export default Layout
