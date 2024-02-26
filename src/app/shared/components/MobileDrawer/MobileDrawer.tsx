import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'

// import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// component
import ContactTimelineInteraction from '@contacts/components/ContactTimelineInteraction/ContactTimelineInteraction'
import GeneralDetails from '@contacts/components/GeneralDetails/GeneralDetails'
import ContactOrganization from '@contacts/components/ContactOrganization/ContactOrganization'
import { Nimbletab } from 'nimble-design-system'

import { Grid } from '@mui/material'
// images
import addUserImg from '@assets/images/addUser.svg'
import notificationIcon from '@assets/images/contacts/notification.svg'

import styles from '@contacts/pages/ContactPersonDetails/ContactPersonDetail.module.css'

const drawerWidth = 240

interface Props {
    window?: () => Window
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

const PersistentDrawerLeft: React.FC = (props: Props) => {
    const { window } = props
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerClose = (): void => {
        setOpen(false)
    }

    const openTimelineHandler = (): void => {
        setOpen(!open)
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <MobileDrawer
                anchor={'left'}
                container={container}
                variant="persistent"
                open={open}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    onBackdropClick: openTimelineHandler,
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '360px' },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'white',
                        color: '#fff',
                        height: '100vh',
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <ContactTimelineInteraction />
            </MobileDrawer>

            {/* <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        marginTop: '100px',
                        maxHeight: '500px',
                        border: '2px solid red',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <ContactTimelineInteraction />
            </Drawer> */}

            <Main open={open}>
                <div className={styles.parent_div}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6}>
                                <GeneralDetails isDesktop={false} active={false}/>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ContactOrganization />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Nimbletab
                                    activeCardColor="#FFFFFF"
                                    activeColor="#003461"
                                    inActiveCardColor="rgba(0, 87, 162, 0.20)"
                                    onChangeTab={function noRefCheck() {}}
                                    tabs={[
                                        {
                                            label: 'Functions',
                                            value: 1,
                                        },
                                    ]}
                                    type="card"
                                    width="100px"
                                    fontFamily="Raleway"
                                    fontSize="16px"
                                    color="#003461"
                                />

                                {/* <NimbleDataTable
                                    columnData={[
                                        {
                                            dataPoint: 'name',
                                            filter: true,
                                            label: 'Name',
                                            sort: true,
                                            width: '30%',
                                        },
                                        {
                                            dataPoint: 'email',
                                            filter: true,
                                            label: 'Email',
                                            sort: true,
                                            width: '30%',
                                        },
                                        {
                                            dataPoint: 'roles',
                                            filter: true,
                                            label: 'User Roles',
                                            sort: true,
                                            width: '30%',
                                        },
                                        {
                                            component: function noRefCheck() {},
                                            dataPoint: 'autherization',
                                            filter: true,
                                            label: 'Autherization',
                                            sort: true,
                                            width: '20%',
                                        },
                                    ]}
                                    data={[
                                        {
                                            autherization: 'user',
                                            email: 'manoj@nimble.com',
                                            name: 'Manoj Gamachchige',
                                            roles: 'admin',
                                        },
                                        {
                                            autherization: 'user',
                                            email: 'rylie.amelia@gmail.com',
                                            name: 'Rylie Gamachchige',
                                            roles: 'admin',
                                        },
                                        {
                                            autherization: 'user',
                                            email: 'anuja@nimble.com',
                                            name: 'Anuja Ulpathakubura',
                                            roles: 'admin',
                                        },
                                        {
                                            autherization: 'super',
                                            email: 'max@nimble.com',
                                            name: 'Max.L',
                                            roles: 'super-admin',
                                        },
                                    ]}
                                    fontFamily="Lato"
                                    headerFontSize={14}
                                    dataFontSize={16}
                                    searchBarFontSize={16}
                                    primaryColor="#0057A2"
                                    // dataDeleteEnable={false}
                                    // dataEditEnable={false}
                                    dataFontWeight="400"
                                    // dataViewEnable={false}
                                    headerFontWeight="700"
                                    isDesktopScreen
                                    mainActionIcon={addUserImg}
                                    mainActionLabel={'Add function'}
                                    onChangeColumnFilters={function noRefCheck() {}}
                                    onChangeSearchText={function noRefCheck() {}}
                                    // onClickDeleteRow={function noRefCheck() {}}
                                    // onClickEditeRow={function noRefCheck() {}}
                                    onClickMainAction={function noRefCheck() {}}
                                    // onClickVieweRow={function noRefCheck() {}}
                                    paginationData={{
                                        onPageChnage: function noRefCheck() {},
                                        page: 2,
                                        totalPage: 5,
                                    }}
                                    searchPlaceHolder={'Search for companies...'}
                                /> */}
                            </Grid>
                            <img
                                src={notificationIcon}
                                alt=""
                                className={styles.notification_icon}
                                onClick={openTimelineHandler}
                            ></img>
                        </Grid>
                    </div>
                </div>
            </Main>
        </Box>
    )
}

export default PersistentDrawerLeft
