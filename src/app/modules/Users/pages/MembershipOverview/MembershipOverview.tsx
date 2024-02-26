import React from 'react'
// css
import styles from './MembershipOverview.module.css'

// components
import Pagelayout from '@layout/PageLayout'
import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'
import MembershipTimeline from '@users/components/MembershipTimeline/MembershipTimeline'
// details cards
import MembershipDetails from '@users/components/MembershipDetails/MembershipDetails'
import ContributionDetails from '@users/components/ContributionDetails/ContributionDetails'

// mui
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { Hidden } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'

// nimble design system
import { Nimbletab, NimbleDataTable } from 'nimble-design-system'

// images
import GoBack from '@assets/images/goBack.svg'

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

const MembershipOverview: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    const navigateHandler = (): void => {}

    return (
        <Pagelayout>
            <div className={`${isTablet && !isMobile ? styles.header_container : ''}`}>
                <CommonHeaderComponent
                    heading={'Membership 600.03 of Ferus Smit B.V.'}
                    para=""
                    goBackImg={GoBack}
                    goBackText="Go back"
                    goBackClickHandler={navigateHandler}
                />
            </div>

            <br />

            <Hidden only={['xs', 'sm']}>
                <div className={styles.parent_div}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <MembershipDetails />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ContributionDetails />
                            </Grid>

                            <Grid item xs={12} md={12}></Grid>

                            <Grid item xs={12} md={12}>
                                <Nimbletab
                                    activeCardColor="#FFFFFF"
                                    activeColor="#003461"
                                    inActiveCardColor="rgba(0, 87, 162, 0.20)"
                                    onChangeTab={function noRefCheck() {}}
                                    tabs={[
                                        {
                                            label: 'Memberships',
                                            value: 1,
                                        },
                                        {
                                            label: 'Statement',
                                            value: 2,
                                        },
                                    ]}
                                    type="card"
                                    width="300px"
                                    fontFamily="Raleway"
                                    fontSize="16px"
                                    color="#003461"
                                />

                                {/* new table */}

                                <NimbleDataTable
                                    clickCustomPagination={function noRefCheck() {}}
                                    columnData={[
                                        {
                                            dataPoint: 'name',
                                            filter: true,
                                            label: 'Name',
                                            sort: true,
                                            width: '20%',
                                        },
                                        {
                                            dataPoint: 'email',
                                            filter: true,
                                            label: 'Email',
                                            sort: true,
                                            width: '30%',
                                        },
                                        {
                                            customFilterSelections: [
                                                {
                                                    label: 'super-admin',
                                                    value: '1',
                                                },
                                                {
                                                    label: 'admin',
                                                    value: '2',
                                                },
                                            ],
                                            dataPoint: 'roles',
                                            filter: true,
                                            filterType: 'select',
                                            label: 'User Roles',
                                            sort: true,
                                            width: '20%',
                                        },
                                        {
                                            component: function noRefCheck() {},
                                            dataPoint: 'autherization',
                                            filter: true,
                                            filterType: 'select',
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
                                    mainActionLabel="Add Some Data"
                                    onChangeColumnFilters={function noRefCheck() {}}
                                    onChangeSearchText={function noRefCheck() {}}
                                    onClickMainAction={function noRefCheck() {}}
                                    paginationData={{
                                        onPageChnage: function noRefCheck() {},
                                        page: 3,
                                        totalPage: 10,
                                    }}
                                    rowActions={[
                                        {
                                            icon: (
                                                <svg
                                                    fill="none"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M2.11328 4.95999L7.99995 8.36666L13.8466 4.97999M7.99995 14.4067V8.35999"
                                                        stroke="#9FC540"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="0.9"
                                                    />
                                                    <path
                                                        d="M14.4066 8.55334V6.11334C14.4066 5.19334 13.7466 4.07334 12.9399 3.62668L9.37993 1.65334C8.61993 1.22668 7.37993 1.22668 6.61993 1.65334L3.05993 3.62668C2.25326 4.07334 1.59326 5.19334 1.59326 6.11334V9.88668C1.59326 10.8067 2.25326 11.9267 3.05993 12.3733L6.61993 14.3467C6.99993 14.56 7.49993 14.6667 7.99993 14.6667C8.49993 14.6667 8.99993 14.56 9.37993 14.3467"
                                                        stroke="#9FC540"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="0.9"
                                                    />
                                                    <path
                                                        d="M15.3332 14.6667L14.6665 14M12.7998 14.2667C13.3656 14.2667 13.9083 14.0419 14.3083 13.6418C14.7084 13.2418 14.9332 12.6991 14.9332 12.1333C14.9332 11.5675 14.7084 11.0249 14.3083 10.6248C13.9083 10.2248 13.3656 10 12.7998 10C12.234 10 11.6914 10.2248 11.2913 10.6248C10.8913 11.0249 10.6665 11.5675 10.6665 12.1333C10.6665 12.6991 10.8913 13.2418 11.2913 13.6418C11.6914 14.0419 12.234 14.2667 12.7998 14.2667Z"
                                                        stroke="#9FC540"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="0.9"
                                                    />
                                                </svg>
                                            ),
                                            onClick: function noRefCheck() {},
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    fill="none"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_14_3499)">
                                                        <path
                                                            d="M7.3335 1.33334H6.00016C2.66683 1.33334 1.3335 2.66668 1.3335 6.00001V10C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 10V8.66668"
                                                            stroke="#536891"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="0.9"
                                                        />
                                                        <path
                                                            d="M10.6933 2.01332L5.43992 7.26665C5.23992 7.46665 5.03992 7.85999 4.99992 8.14665L4.71325 10.1533C4.60659 10.88 5.11992 11.3867 5.84659 11.2867L7.85325 11C8.13325 10.96 8.52659 10.76 8.73325 10.56L13.9866 5.30665C14.8933 4.39999 15.3199 3.34665 13.9866 2.01332C12.6533 0.679985 11.5999 1.10665 10.6933 2.01332Z"
                                                            stroke="#536891"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="0.9"
                                                        />
                                                        <path
                                                            d="M9.93994 2.76666C10.161 3.55164 10.5799 4.26671 11.1566 4.84336C11.7332 5.42001 12.4483 5.83894 13.2333 6.06"
                                                            stroke="#536891"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="0.9"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_14_3499">
                                                            <rect fill="white" height="16" width="16" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            ),
                                            onClick: function noRefCheck() {},
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    fill="none"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14 3.98668C11.78 3.76668 9.54667 3.65334 7.32 3.65334C6 3.65334 4.68 3.72001 3.36 3.85334L2 3.98668M5.66667 3.31334L5.81333 2.44001C5.92 1.80668 6 1.33334 7.12667 1.33334H8.87333C10 1.33334 10.0867 1.83334 10.1867 2.44668L10.3333 3.31334M12.5667 6.09334L12.1333 12.8067C12.06 13.8533 12 14.6667 10.14 14.6667H5.86C4 14.6667 3.94 13.8533 3.86667 12.8067L3.43333 6.09334M6.88667 11H9.10667M6.33333 8.33334H9.66667"
                                                        stroke="#EC4C29"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="0.9"
                                                    />
                                                </svg>
                                            ),
                                            onClick: function noRefCheck() {},
                                        },
                                    ]}
                                    searchPlaceHolder="Search user data"
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ width: '70%' }}>
                        <MembershipTimeline />
                    </div>
                </div>
            </Hidden>

            <Hidden only={['md', 'lg', 'xl']}>
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
                        open={true}
                    >
                        <MembershipTimeline />
                    </Drawer>
                    <Main
                        open={true}
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
                                <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <MembershipDetails />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <ContributionDetails/>
                                    </Grid>
                                    {/* {isTablet && !isMobile && (
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

                                            <NimbleDataTable
                                                clickCustomPagination={function noRefCheck() {}}
                                                columnData={[
                                                    {
                                                        dataPoint: 'organization',
                                                        filter: true,
                                                        label: 'Organisation name',
                                                        sort: true,
                                                        width: '30%',
                                                    },
                                                    {
                                                        component: (item: any) => (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '5px',
                                                                }}
                                                            >
                                                                {item.mainFunction && (
                                                                    <img src={mainFunctionIcon} alt=""></img>
                                                                )}
                                                                <span>{item.functionName}</span>
                                                            </div>
                                                        ),

                                                        dataPoint: 'functionName',
                                                        filter: true,
                                                        label: 'Function name',
                                                        sort: true,
                                                        width: '20%',
                                                    },
                                                    {
                                                        dataPoint: 'functionlevel',
                                                        filter: true,
                                                        label: 'Function level',
                                                        sort: true,
                                                        width: '20%',
                                                    },
                                                    {
                                                        dataPoint: 'startdate',
                                                        filter: true,
                                                        label: 'Start ',
                                                        sort: true,
                                                        width: '20%',
                                                    },
                                                    {
                                                        // component: function noRefCheck() {},
                                                        dataPoint: 'enddate',
                                                        filter: true,
                                                        label: 'End ',
                                                        sort: true,
                                                        width: '20%',
                                                    },
                                                ]}
                                                data={functionOverviewData ?? []}
                                                mainActionIcon={addUserImg}
                                                mainActionLabel={'Add function'}
                                                primaryColor="#0057A2"
                                                fontFamily="Lato"
                                                headerFontWeight="700"
                                                headerFontSize={14}
                                                dataFontSize={16}
                                                searchBarFontSize={16}
                                                // dataFontWeight="400"
                                                onChangeColumnFilters={(e) => {
                                                    tableSortHandler(e)
                                                }}
                                                onChangeSearchText={(e) => {
                                                    SearchTextHandler(e)
                                                }}
                                                onClickMainAction={addFunctionHandler}
                                                paginationData={{
                                                    onPageChnage: function noRefCheck() {},
                                                    page: functionpage,
                                                    totalPage: totalPage ?? 0,
                                                }}
                                                rowActions={[
                                                    {
                                                        icon: (
                                                            <svg
                                                                fill="none"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                width="16"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g clipPath="url(#clip0_14_3499)">
                                                                    <path
                                                                        d="M7.3335 1.33334H6.00016C2.66683 1.33334 1.3335 2.66668 1.3335 6.00001V10C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 10V8.66668"
                                                                        stroke="#536891"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="0.9"
                                                                    />
                                                                    <path
                                                                        d="M10.6933 2.01332L5.43992 7.26665C5.23992 7.46665 5.03992 7.85999 4.99992 8.14665L4.71325 10.1533C4.60659 10.88 5.11992 11.3867 5.84659 11.2867L7.85325 11C8.13325 10.96 8.52659 10.76 8.73325 10.56L13.9866 5.30665C14.8933 4.39999 15.3199 3.34665 13.9866 2.01332C12.6533 0.679985 11.5999 1.10665 10.6933 2.01332Z"
                                                                        stroke="#536891"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        strokeWidth="0.9"
                                                                    />
                                                                    <path
                                                                        d="M9.93994 2.76666C10.161 3.55164 10.5799 4.26671 11.1566 4.84336C11.7332 5.42001 12.4483 5.83894 13.2333 6.06"
                                                                        stroke="#536891"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        strokeWidth="0.9"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_14_3499">
                                                                        <rect fill="white" height="16" width="16" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        ),
                                                        onClick: (value: any) => {
                                                            tableEditClickHandler(value)
                                                        },
                                                    },
                                                ]}
                                                searchPlaceHolder={'Search for companies...'}
                                            />
                                        </Grid>
                                    )} */}

                                    <br />
                                    <br />

                                    {/* {isMobile && (
                                        <Grid item xs={12} md={12} style={{ marginTop: '24px' }}>
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
                                            <FunctionMobileTable />
                                        </Grid>
                                    )} */}
                                </Grid>
                            </div>
                        </div>
                    </Main>
                </Box>
            </Hidden>
        </Pagelayout>
    )
}

export default MembershipOverview
