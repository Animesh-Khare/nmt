import React, { useEffect, useState } from 'react'
import styles from './OrganisationOverview.module.css'
import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'
// components
import Pagelayout from '@layout/PageLayout'

// from mui
import Grid from '@mui/material/Grid'
import { useLocation, useNavigate } from 'react-router-dom'
import CompanyDetails from '@organisations/components/CompanyDetails/CompanyDetails'
import MembershipDetails from '@organisations/components/MembershipDetails/MembershipDetails'
import OrganisationTimelineInteraction from '@organisations/components/OrganisationTimeLineInteraction/OrganisationTimeLineInteraction'
// import AddorEditExperience from '@contacts/components/AddorEditExperience/AddorEditExperience' dont uncomment this

import { handleOrganisationOverview, handleOrganisationTimeline } from '@organisations/store/organisation.slice'
import {
    OrganisationOverviewCompanyDetailsRequestParams,
    OrganisationTimelineRequestParam,
} from '@app-types/OrganisationResponse.types'

import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// from nimble design system
import { Nimbletab } from 'nimble-design-system'

// images
// import addUserImg from '@assets/images/addUser.svg'
import notificationIcon from '@assets/images/contacts/notification.svg'
import GoBack from '@assets/images/goBack.svg'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
// import ContactTable from '@contacts/components/ContactTable/ContactTable'
import OrganisationContact from '@organisations/components/OrganisationContact/OrganisationContact'
import OrganisationContactMobile from '@organisations/components/OrganisationContactMobile/OrganisationContactMobile'
import CompanyGuide from '@organisations/components/CompanyGuide/CompanyGuide'
// import { handleOrganisationContactInfoData } from '@organisations/store/organisation.slice'
// import PersistentDrawerLeft from '@shared/components/MobileDrawer/MobileDrawer'

import { RootState } from '@store/store'
import { useSelector, useDispatch} from 'react-redux'
const drawerWidth = 360

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

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
// }))

const OrganisationOverview: React.FC = () => {
    const OrganisationInfoData = useSelector((state: RootState) => state.organisation.OrganisationOverviewHead)
    const location = useLocation()
    const { idOrganisation, name } = location.state
    const [headname, setHeadName]= useState(name)
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const theme = useTheme()
    // const [mobileOpen, setMobileOpen] = React.useState(false)
    const [open, setOpen] = useState(false)
    const [tabNumber, setTabNumber] = useState(1)
    
    // const [openAddExperiencePopup, setOpenAddExperiencePopup] = useState(false)

    const openTimelineHandler = (): void => {
        // setMobileOpen(!mobileOpen)
        setOpen(!open)
    }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    // const matches = useMediaQuery('(min-width: 1px) and (max-width:601px)')


    useEffect(() => {
        const CompanyDetailsRequestParams: OrganisationOverviewCompanyDetailsRequestParams = {
            id: idOrganisation,
        }
        const initialContacttimelineParam: OrganisationTimelineRequestParam = {
            organizationid: idOrganisation,
        }
        dispatch(handleOrganisationOverview(CompanyDetailsRequestParams))
        // dispatch(handleOrganisationContactInfoData(CompanyDetailsRequestParams))
        // dispatch(handleOrganisationDetail(initialOrganisationParam))
        dispatch(handleOrganisationTimeline(initialContacttimelineParam))
    }, [])
    useEffect (()=>{
        if (OrganisationInfoData) {
            setHeadName(OrganisationInfoData);
        }
        else{
            setHeadName(name)
        }
    },[OrganisationInfoData])

    const navigateHandler = (): void => {
        navigate('/organisations')
    }
    const onChangeTabHandler = (tabNumber: number): void => {
        // console.log('new tab handler',tabNumber);
        setTabNumber(tabNumber)
    }
    return (
        <Pagelayout>
            <div style={{ marginTop: '-10px' }}>
                <div className={`${isTablet && !isMobile ? styles.header_container : ''}`}>
                    <CommonHeaderComponent
                        heading={headname}
                        para=""
                        goBackImg={GoBack}
                        goBackText="Go back to overview"
                        goBackClickHandler={navigateHandler}
                    />
                </div>
            </div>

            <br />

            {!isMobile && !isTablet && (
                <div className={styles.parent_div}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CompanyDetails isDesktop={true} OrganisationId={idOrganisation} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MembershipDetails OrganisationId={idOrganisation}/>
                            </Grid>

                            <Grid item xs={12} md={12}></Grid>

                            <Grid item xs={12} md={12}>
                                <Nimbletab
                                    activeCardColor="#FFFFFF"
                                    activeColor="#003461"
                                    inActiveCardColor="rgba(0, 87, 162, 0.20)"
                                    onChangeTab={(tabNumber) => {
                                        onChangeTabHandler(tabNumber)
                                    }}
                                    tabs={[
                                        {
                                            label: 'Contact Person',
                                            value: 1,
                                        },
                                        // {
                                        //     label: 'Company Guide',
                                        //     value: 2,
                                        // },
                                    ]}
                                    type="card"
                                    width="200px"
                                    fontFamily="Raleway"
                                    fontSize="16px"
                                    color="#003461"
                                />
                                {tabNumber === 1 ? <OrganisationContact /> : tabNumber === 2 ? <CompanyGuide /> : ''}
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ width: '60%' }}>
                        <OrganisationTimelineInteraction />
                    </div>
                </div>
            )}

            {isTablet && (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                marginTop: '100px',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <OrganisationTimelineInteraction />
                    </Drawer>
                    <Main
                        open={open}
                        sx={{
                            minHeight: '50vh',
                            height: '70vh',
                            overflowY: 'auto',
                            '& .css-11egsm6': {
                                minHeight: '50vh',
                                height: '70vh',
                                overflowY: 'auto',
                            },
                        }}
                    >
                        <div className={styles.parent_div}>
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={6} style={{ marginBottom: isMobile ? '24px' : 0 }}>
                                        <CompanyDetails isDesktop={false} OrganisationId={idOrganisation} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <MembershipDetails OrganisationId={idOrganisation}/>
                                    </Grid>
                                    {isTablet && !isMobile && (
                                        <Grid item xs={12} md={12} style={{ marginTop: '24px' }}>
                                            <Nimbletab
                                                activeCardColor="#FFFFFF"
                                                activeColor="#003461"
                                                inActiveCardColor="rgba(0, 87, 162, 0.20)"
                                                onChangeTab={(tabNumber) => {
                                                    onChangeTabHandler(tabNumber)
                                                }}
                                                tabs={[
                                                    {
                                                        label: 'Contact Person',
                                                        value: 1,
                                                    },
                                                    // {
                                                    //     label: 'Company Guide',
                                                    //     value: 2,
                                                    // },
                                                ]}
                                                type="card"
                                                width={'400px'}
                                                fontFamily="Raleway"
                                                fontSize="16px"
                                                color="#003461"
                                            />
                                            {tabNumber === 1 ? (
                                                <OrganisationContact />
                                            ) : tabNumber === 2 ? (
                                                <CompanyGuide />
                                            ) : (
                                                ''
                                            )}
                                        </Grid>
                                    )}

                                    {isMobile && (
                                        <Grid item xs={12} md={12} style={{ marginTop: '24px' }}>
                                            <Nimbletab
                                                activeCardColor="#FFFFFF"
                                                activeColor="#003461"
                                                inActiveCardColor="rgba(0, 87, 162, 0.20)"
                                                onChangeTab={function noRefCheck() {}}
                                                tabs={[
                                                    {
                                                        label: 'Contact Person',
                                                        value: 1,
                                                    },
                                                    // {
                                                    //     label: 'Company Guide',
                                                    //     value: 2,
                                                    // },
                                                ]}
                                                type="card"
                                                width="100px"
                                                fontFamily="Raleway"
                                                fontSize="16px"
                                                color="#003461"
                                            />
                                            <OrganisationContactMobile />
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </Main>
                </Box>
            )}

            {isTablet && (
                <img
                    src={notificationIcon}
                    alt=""
                    className={`${styles.notification_icon}`}
                    onClick={openTimelineHandler}
                ></img>
            )}

            {/* <PersistentDrawerLeft /> */}
        </Pagelayout>
    )
}

export default OrganisationOverview
