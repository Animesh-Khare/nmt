import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import styles from './CompanyDetails.module.css'
import { RootState } from '@store/store'
import { useLocation } from 'react-router-dom'
import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'
import { NimbleDialog, Nimbletab } from 'nimble-design-system'
import OrganisationDetails from '../OrganisationDetails/OrganisationDetails'
import AddressDetails from '../AddressDetails/AddressDetails'
import OrganisationActiveIcon from '@assets/images/PopUpImages/OrganisationActiveIcon.svg'
import OrganisationInactiveIcon from '@assets/images/PopUpImages/OrganisationInactiveIcon.svg'
import AddressActiveIcon from '@assets/images/PopUpImages/AddressActiveIcon.svg'
import AddressInactiveIcon from '@assets/images/PopUpImages/AddressInactiveIcon.svg'
import { handleOrganisationContactInfoData } from '@organisations/store/organisation.slice'
import search_status_icon from '@assets/images/contacts/search_status_icon.svg'
import closeIcon from '@assets/images/PopUpImages/closeIcon.svg'
import callImg from '@assets/images/contacts/call.svg'
import smsImg from '@assets/images/contacts/smsedit.svg'
import { Drawer, Hidden } from '@mui/material'
import { OrganisationOverviewCompanyDetailsRequestParams } from '@app-types/OrganisationResponse.types'
interface PropType {
    isDesktop: boolean
    OrganisationId: number
}

const CompanyDetails: React.FC<PropType> = ({ isDesktop, OrganisationId }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { name } = location.state
    // const navigate = useNavigate()
    const [contactDetailsPopup, setContactDetailsPopup] = useState(false)
    const [tabNumber, setTabNumber] = useState(1)
    const [isOrganisationSubmit, setIsOrganisationSubmit] = useState<boolean | number>(false)
    const [isOrganisationAddressSubmit, setIsOrganisationAddressSubmit] = useState<boolean | number>(false)

    const companyDetailData = useSelector((state: RootState) => state.organisation.organisationOverviewInfoData)

    // const contactDeleted = useSelector((state: RootState) => state.contactDetail.deleteContactData)

    // useMemo(() => {
    //     if (contactDeleted !== null) navigate('/contacts')
    // }, [contactDeleted])

    const onContactDetailsCloseHandler = (): void => {
        if (tabNumber === 1) {
            setIsOrganisationSubmit(false)
        } else if (tabNumber === 2) {
            setIsOrganisationAddressSubmit(false)
        }
        setContactDetailsPopup(false)
    }

    const setStatusOnClickHandler = (): void => {
        setContactDetailsPopup(true)

        const initialContactInfoParam: OrganisationOverviewCompanyDetailsRequestParams = {
            id: OrganisationId,
        }

        dispatch(handleOrganisationContactInfoData(initialContactInfoParam))
    }

    const tabData = [
        {
            value: 1,
            label: 'Organisation',
            activeImage: <img src={OrganisationActiveIcon} alt="person icon" />,
            inactiveImage: <img src={OrganisationInactiveIcon} alt="person icon" />,
        },
        {
            value: 2,
            label: 'Address',
            activeImage: <img src={AddressActiveIcon} alt="person icon" />,
            inactiveImage: <img src={AddressInactiveIcon} alt="person icon" />,
        },
    ]

    const handleEmailClick = (mail: string): void => {
        const subject = 'Your subject here'
        const body = 'Your email body here'

        const mailtoLink = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        // Open the default email client
        window.location.href = mailtoLink
    }

    const onChangeTabHandler = (tabNumber: number): void => {
        setTabNumber(tabNumber)
    }

    const saveButtonHandler = (): void => {
        if (tabNumber === 1) {
            setIsOrganisationSubmit(Math.random())
        } else if (tabNumber === 2) {
            setIsOrganisationAddressSubmit(Math.random())
        }
    }
    const closeModal = (): void => {
        setContactDetailsPopup(false)
    }

    return (
        <>
            <div className={styles.card_heading}>
                <span>Company details</span>{' '}
                <img
                    src={search_status_icon}
                    alt="status_icon"
                    onClick={setStatusOnClickHandler}
                    style={{ cursor: 'pointer' }}
                ></img>
            </div>
            <CommonCard>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Contact information
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Email
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        {companyDetailData?.email && <img src={smsImg} alt=""></img>}

                        {/* <a href={contactDetailData?.email}>{contactDetailData?.email}</a> */}
                        <a
                            href=""
                            target="_blank"
                            style={{ textDecoration: 'none', color: 'black', marginLeft: '5px', fontSize: '16px' }}
                            onClick={() => {
                                handleEmailClick(companyDetailData?.email ? companyDetailData?.email : '')
                            }}
                        >
                            {companyDetailData?.email}
                        </a>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Invoice email
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        {companyDetailData?.invoiceEmail && <img src={smsImg} alt=""></img>}

                        {/* <a href={contactDetailData?.email}>{contactDetailData?.email}</a> */}
                        <a
                            href=""
                            target="_blank"
                            style={{ textDecoration: 'none', color: 'black', marginLeft: '5px' }}
                            onClick={() => {
                                handleEmailClick(companyDetailData?.email ? companyDetailData?.email : '')
                            }}
                        >
                            {companyDetailData?.invoiceEmail}
                        </a>
                    </Grid>

                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Phone number
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        {companyDetailData?.phoneNumber && <img src={callImg} alt=""></img>}

                        <a
                            style={{ textDecoration: 'none', color: 'black', marginLeft: '5px' }}
                            href={`tel:${companyDetailData?.phoneNumber}`}
                        >
                            {companyDetailData?.phoneNumber}
                        </a>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Visitor address
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <p>
                            {/* {companyDetailData?.visitorAddress?.streetName}  {companyDetailData?.visitorAddress?.number} <br />
                            {companyDetailData?.visitorAddress?.city} {companyDetailData?.visitorAddress?.addition}  <br />
                            {companyDetailData?.visitorAddress?.country}{' '} */}
                            {companyDetailData?.visitorAddress?.streetName ?? ''}&nbsp;
                            {companyDetailData?.visitorAddress?.number ?? ''}
                            <br />
                            {companyDetailData?.visitorAddress?.zipcode ?? ''}{' '}
                            {companyDetailData?.visitorAddress?.zipcode && ' '}
                            {companyDetailData?.visitorAddress?.addition ?? ''}{' '}
                            {companyDetailData?.visitorAddress?.addition && ' '}
                            {companyDetailData?.visitorAddress?.city ?? ''}
                            <br />
                            {companyDetailData?.visitorAddress?.country ?? ''}
                        </p>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Postal address
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <p>
                            {companyDetailData?.sameaddress ? (
                                'Same as visitor address'
                            ) : (
                                <>
                                    {companyDetailData?.postalAddress?.streetName ?? ''}&nbsp;
                                    {companyDetailData?.postalAddress?.number ?? ''}
                                    <br />
                                    {companyDetailData?.postalAddress?.zipcode ?? ''}{' '}
                                    {companyDetailData?.postalAddress?.addition ?? ''}{' '}
                                    {companyDetailData?.postalAddress?.addition ?? ' '}
                                    {companyDetailData?.postalAddress?.city ?? ''}
                                    <br />
                                    {companyDetailData?.postalAddress?.country ?? ''}
                                </>
                            )}
                        </p>
                    </Grid>
                </Grid>

                {/* <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} className={styles.invitations_msg}>
                        Receives invitations for events, the clipper and the magazine (print)
                    </Grid>
                </Grid> */}
            </CommonCard>

            {isDesktop && (
                <NimbleDialog
                    open={contactDetailsPopup}
                    maxWidth={'sm'}
                    title={`Details ${name}`}
                    parimaryActionLabel="SAVE"
                    onClickClose={onContactDetailsCloseHandler}
                    topActionPanel
                    // onClickSecondaryAction={() => {
                    //     alert('secondary Action ')
                    // }}
                    onClickPrimaryAction={saveButtonHandler}
                    // topActionPanalData={topActionData}
                    fontFamily="Lato"
                >
                    <div style={{ position: 'absolute', top: '19px', right: '19px' }} onClick={closeModal}>
                        {' '}
                        <img src={closeIcon} />
                    </div>
                    <div>
                        <div style={{ marginBottom: '22px' }}>
                            <Nimbletab
                                tabs={tabData}
                                width={'400px'}
                                activeColor={'#EE7000'}
                                onChangeTab={(tabNumber) => {
                                    onChangeTabHandler(tabNumber)
                                }}
                            />
                        </div>
                        {tabNumber === 1 ? (
                            <OrganisationDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : tabNumber === 2 ? (
                            <AddressDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationAddressSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </NimbleDialog>
            )}

            {/* {!isDesktop && (
                <Drawer anchor={'bottom'} open={contactDetailsPopup} onClose={onContactDetailsCloseHandler}>
                    <div style={{ padding: '20px' }}>
                        <div style={{ marginBottom: '22px' }}>
                            <Nimbletab
                                tabs={tabData}
                                width={'320px'}
                                activeColor={'#EE7000'}
                                onChangeTab={(tabNumber) => {
                                    onChangeTabHandler(tabNumber)
                                }}
                            />
                        </div>
                        {tabNumber === 1 ? (
                            <OrganisationDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : tabNumber === 2 ? (
                            <AddressDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationAddressSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : (
                            ''
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', margin: '20px' }}>
                        <Button onClick={onContactDetailsCloseHandler} size="small" variant="text">
                            Cancel
                        </Button>

                        <Button onClick={saveButtonHandler} variant="contained" size="small">
                            save
                        </Button>
                    </div>
                </Drawer>
            )} */}

            {/* {!isDesktop && (
                <NimbleDialog
                    open={contactDetailsPopup}
                    maxWidth={'sm'}
                    title={`Details ${name}`}
                    parimaryActionLabel="save"
                    onClickClose={onContactDetailsCloseHandler}
                    topActionPanel
                    // onClickSecondaryAction={() => {
                    //     alert('secondary Action ')
                    // }}
                    onClickPrimaryAction={saveButtonHandler}
                    // topActionPanalData={topActionData}
                    fontFamily="Lato"
                >
                    <div style={{ position: 'absolute', top: '19px', right: '19px' }} onClick={closeModal}>
                        {' '}
                        <img src={closeIcon} />
                    </div>
                    <div>
                        <div style={{ marginBottom: '22px' }}>
                            <Nimbletab
                                tabs={tabData}
                                width={'400px'}
                                activeColor={'#EE7000'}
                                onChangeTab={(tabNumber) => {
                                    onChangeTabHandler(tabNumber)
                                }}
                            />
                        </div>
                        {tabNumber === 1 ? (
                            <OrganisationDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : tabNumber === 2 ? (
                            <AddressDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationAddressSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </NimbleDialog>
            )} */}

            <Hidden only={['xs']}>
                <NimbleDialog
                    open={contactDetailsPopup}
                    maxWidth={'sm'}
                    title={`Details ${name}`}
                    parimaryActionLabel="SAVE"
                    onClickClose={onContactDetailsCloseHandler}
                    topActionPanel
                    // onClickSecondaryAction={() => {
                    //     alert('secondary Action ')
                    // }}
                    onClickPrimaryAction={saveButtonHandler}
                    // topActionPanalData={topActionData}
                    fontFamily="Lato"
                >
                    <div style={{ position: 'absolute', top: '19px', right: '19px' }} onClick={closeModal}>
                        {' '}
                        <img src={closeIcon} />
                    </div>
                    <div>
                        <div style={{ marginBottom: '22px' }}>
                            <Nimbletab
                                tabs={tabData}
                                width={'400px'}
                                activeColor={'#EE7000'}
                                onChangeTab={(tabNumber) => {
                                    onChangeTabHandler(tabNumber)
                                }}
                            />
                        </div>
                        {tabNumber === 1 ? (
                            <OrganisationDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : tabNumber === 2 ? (
                            <AddressDetails
                                OrganisationId={OrganisationId}
                                isSubmit={isOrganisationAddressSubmit}
                                closeHandler={onContactDetailsCloseHandler}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </NimbleDialog>
            </Hidden>

            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                <Drawer anchor={'bottom'} open={contactDetailsPopup} onClose={onContactDetailsCloseHandler}>
                    <div style={{ width: '96%', maxHeight: '664px' }}>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.nimble_tab_container}>
                                <Nimbletab
                                    tabs={tabData}
                                    width={'320px'}
                                    activeColor={'#EE7000'}
                                    onChangeTab={(tabNumber) => {
                                        onChangeTabHandler(tabNumber)
                                    }}
                                />
                            </div>
                            {tabNumber === 1 ? (
                                <OrganisationDetails
                                    OrganisationId={OrganisationId}
                                    isSubmit={isOrganisationSubmit}
                                    closeHandler={onContactDetailsCloseHandler}
                                />
                            ) : tabNumber === 2 ? (
                                <AddressDetails
                                    OrganisationId={OrganisationId}
                                    isSubmit={isOrganisationAddressSubmit}
                                    closeHandler={onContactDetailsCloseHandler}
                                />
                            ) : (
                                ''
                            )}
                        </div>

                        <div className={styles.drawer_footer}>
                            <Button onClick={onContactDetailsCloseHandler} size="small" variant="text">
                                CANCEL
                            </Button>

                            <Button onClick={saveButtonHandler} variant="contained" size="small">
                                SAVE
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </Hidden>
        </>
    )
}

export default CompanyDetails
