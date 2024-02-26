import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './GeneralDetails.module.css'
import { RootState } from '@store/store'
import { useLocation, useNavigate } from 'react-router-dom'

import CommonDeletePopup from '@shared/components/CommonDeletePopup/CommonDeletePopup'
import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'
import { NimbleDialog, Nimbletab, NimbleButtonProps, NimbleButton } from 'nimble-design-system'
import PersonalDetails from '@contacts/components/PersonalDetails/PersonalDetails'
import ContactDetails from '@contacts/components/ContactDetails/ContactDetails'
import FunctionDetails from '@contacts/components/FunctionDetails/FunctionDetails'

import {
    handleDeleteContact,
    handleInactiveContact,
    handleContactInfoData,
    handleContactDetail,
    handleOrganisationDetail,
    handleContactTimeline,
    handleGetFunctionOverview,
    handleSecretaryDropdown,
} from '@contacts/store/contactDetailStore/contactDetail.slice'

import search_status_icon from '@assets/images/contacts/search_status_icon.svg'

import person_icon from '@assets/images/contacts/person_icon.svg'

import person24selected from '@assets/images/contacts/person24selected.svg'
import phoneIcon24 from '@assets/images/contacts/phoneIcon24.svg'

import telephoneIconActive from '@assets/images/contacts/telephoneIconActive.svg'
import Function24 from '@assets/images/contacts/function24.svg'
import function_icon_active from '@assets/images/contacts/function_icon_active.svg'

import callImg from '@assets/images/contacts/call.svg'
import smsImg from '@assets/images/contacts/smsedit.svg'
import personalCard from '@assets/images/contacts/personalcard.svg'
import { Button, Drawer, Hidden } from '@mui/material'

import {
    ContactDetailRequestParam,
    ContactInfoRequestParams,
    ContactTimelineRequestParam,
    GetFunctionQueryParams,
    OrganisationDetailRequestParam,
} from '@app-types/ContactDetailResponse.types'
import { ContactRequestParams } from '@app-types/ContactResponse.types'
// import { ContactRequestParams } from '@app-types/ContactResponse.types'

interface PropType {
    isDesktop: boolean
    active: boolean
}

const GeneralDetails: React.FC<PropType> = ({ isDesktop, active }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [contactDetailsPopup, setContactDetailsPopup] = useState(false)
    const [tabNumber, setTabNumber] = useState(1)
    const [inActivePopup, setInactivePopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [isPersonSubmit, setIsPersonSubmit] = useState<boolean | number>(false)
    const [isContactSubmit, setIsContactSubmit] = useState<boolean | number>(false)
    const [isFunctionSubmit, setIsFunctionSubmit] = useState<boolean | number>(false)
    // const [showDelete, setShowDelete] = useState<boolean>(false)

    const { idContact, name } = location.state

    const contactDetailData = useSelector((state: RootState) => state.contactDetail.contactDetailData)

    const contactDeleted = useSelector((state: RootState) => state.contactDetail.deleteContactData)

    // const contactInfoData = useSelector((state: RootState) => state.contactDetail.contactInfoData)

    console.log('contactDetailData ========>', contactDetailData)

    useMemo(() => {
        if (contactDeleted !== null) navigate('/contacts')
    }, [contactDeleted])

    const onContactDetailsCloseHandler = (): void => {
        setContactDetailsPopup(false)
        if (tabNumber === 1) {
            setIsPersonSubmit(false)
        } else if (tabNumber === 2) {
            setIsContactSubmit(false)
        } else if (tabNumber === 3) {
            setIsFunctionSubmit(false)
        }
    }

    const setStatusOnClickHandler = (): void => {
        setContactDetailsPopup(true)

        const initialContactInfoParam: ContactInfoRequestParams = {
            contactId: idContact,
        }

        dispatch(handleContactInfoData(initialContactInfoParam))
    }

    const tabData = [
        {
            value: 1,
            label: 'Person',
            activeImage: <img src={person24selected} alt="person icon" />,
            inactiveImage: <img src={person_icon} alt="person icon" />,
        },
        {
            value: 2,
            label: 'Contact',
            activeImage: <img src={telephoneIconActive} alt="person icon" />,
            inactiveImage: <img src={phoneIcon24} alt="person icon" />,
        },
        {
            value: 3,
            label: 'Function',
            activeImage: <img src={function_icon_active} alt="person icon" />,
            inactiveImage: <img src={Function24} alt="person icon" />,
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

    const inactivePopupHandler = (): void => {
        setInactivePopup(false)
    }

    const inActiveContactHandler = (): void => {
        setInactivePopup(true)
    }

    const deleteContactHandler = (): void => {
        setDeletePopup(true)
    }

    useEffect(() => {
        if (active) {
            setTopActionData([
                {
                    color: '#0057A2',
                    label: 'Inactive',
                    size: 'small',
                    variant: 'outlined',
                    fontWeight: '700',
                    onClick: inActiveContactHandler,
                },
            ])
        } else {
            setTopActionData([
                {
                    color: '#E3000A',
                    label: 'Delete',
                    size: 'small',
                    variant: 'contained',
                    fontWeight: '700',
                    onClick: deleteContactHandler,
                },
            ])
        }
    }, [active])

    const [topActionData, setTopActionData] = useState<NimbleButtonProps[]>([
        {
            color: '#0057A2',
            label: 'Inactive',
            size: 'small',
            variant: 'outlined',
            fontWeight: '700',
            onClick: inActiveContactHandler,
        },
    ])

    const inactiveButtonkHandler = (): void => {
        const sendData = {
            clientid: idContact,
            Inactive: true,
        }
        dispatch(handleInactiveContact(sendData))
        setTopActionData([
            {
                color: '#E3000A',
                label: 'Delete',
                size: 'small',
                variant: 'contained',
                fontWeight: '700',
                onClick: deleteContactHandler,
            },
        ])
        // setShowDelete(true)
        setInactivePopup(false)
    }

    const deletePopupHandler = (): void => {
        setDeletePopup(false)
    }

    const deleteButtonkHandler = (): void => {
        dispatch(handleDeleteContact(idContact))
        setDeletePopup(false)
    }

    const saveButtonHandler = (): void => {
        if (tabNumber === 1) {
            setIsPersonSubmit(Math.random())
        } else if (tabNumber === 2) {
            setIsContactSubmit(Math.random())
        } else if (tabNumber === 3) {
            setIsFunctionSubmit(Math.random())
        }
    }

    const navigateToPerson = (orgId: number, contactId: number): void => {
        const initialContactDetailParams: ContactDetailRequestParam = {
            idContactPerson: contactId,
        }
        const initialOrganisationParam: OrganisationDetailRequestParam = {
            idOrganisationPerson: orgId,
        }
        const initialContacttimelineParam: ContactTimelineRequestParam = {
            idcontact: contactId,
        }
        const initialSecretaryDropdownParam: ContactRequestParams = {
            isAscending: true,
            Keyproperty: 'Name',
            Searchkey: '',
            pagenumber: 1,
            organization: '',
            function: '',
            email: '',
            phonenumber: '',
            Name: '',
            orgid: orgId,
        }
        const initialGetFunctionOverview: GetFunctionQueryParams = {
            idContact: contactId,
            keyproperty: '',
            searchkey: '',
            pagenumber: 1,
        }
        dispatch(handleContactDetail(initialContactDetailParams))
        dispatch(handleOrganisationDetail(initialOrganisationParam))
        dispatch(handleContactTimeline(initialContacttimelineParam))
        dispatch(handleGetFunctionOverview(initialGetFunctionOverview))
        dispatch(handleSecretaryDropdown(initialSecretaryDropdownParam))
    }

    return (
        <>
            <div className={styles.card_heading}>
                <span>General details</span>{' '}
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
                        Function
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Function name
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        {contactDetailData?.functionName}
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Function category
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        {contactDetailData?.functionLevel}
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Contact information
                    </Grid>

                    {contactDetailData?.secretary && (
                        <Grid item xs={4} md={4} className={styles.grid_title}>
                            Secretary
                        </Grid>
                    )}

                    {contactDetailData?.secretary && (
                        <Grid item xs={8} md={8} className={styles.grid_value}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src={personalCard} alt=""></img>{' '}
                                <span
                                    style={{ color: '#EE7000' }}
                                    onClick={() => {
                                        navigateToPerson(
                                            contactDetailData?.organization,
                                            contactDetailData?.secretaryid
                                        )
                                    }}
                                >
                                    {contactDetailData?.secretary}
                                </span>
                            </div>
                        </Grid>
                    )}

                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Email
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {contactDetailData?.email && <img src={smsImg} alt=""></img>}

                            {/* <a href={contactDetailData?.email}>{contactDetailData?.email}</a> */}
                            <a
                                href=""
                                target="_blank"
                                style={{ textDecoration: 'none', color: 'black' }}
                                onClick={() => {
                                    handleEmailClick(contactDetailData?.email ? contactDetailData?.email : '')
                                }}
                            >
                                {contactDetailData?.email}
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Mobile
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {contactDetailData?.mobile && <img src={callImg} alt=""></img>}

                            <a
                                style={{ textDecoration: 'none', color: 'black' }}
                                href={`tel:${contactDetailData?.mobile}`}
                            >
                                {contactDetailData?.mobile}
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Phone number
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {contactDetailData?.phonenumber && <img src={callImg} alt=""></img>}

                            <a
                                style={{ textDecoration: 'none', color: 'black' }}
                                href={`tel:${contactDetailData?.phonenumber}`}
                            >
                                {contactDetailData?.phonenumber}
                            </a>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.invitations_msg}>
                        {(contactDetailData?.events || contactDetailData?.clipper || contactDetailData?.magazine) &&
                            ' Receives invitations for'}

                        {contactDetailData?.events && ' the events'}
                        {contactDetailData?.events && contactDetailData?.clipper && !contactDetailData?.magazine
                            ? ' and the clipper'
                            : contactDetailData?.events && contactDetailData?.clipper && contactDetailData?.magazine
                            ? ', the clipper'
                            : !contactDetailData?.events && contactDetailData?.clipper && !contactDetailData?.magazine
                            ? ' the clipper'
                            : !contactDetailData?.events && contactDetailData?.clipper && contactDetailData?.magazine
                            ? ' the clipper'
                            : ''}
                        {contactDetailData?.events && contactDetailData?.clipper && contactDetailData?.magazine
                            ? ' and the magazine (print)'
                            : !contactDetailData?.events && !contactDetailData?.clipper && contactDetailData?.magazine
                            ? ' the magazine (print)'
                            : !contactDetailData?.events && contactDetailData?.clipper && contactDetailData?.magazine
                            ? ' and the magazine (print)'
                            : contactDetailData?.events && !contactDetailData?.clipper && contactDetailData?.magazine
                            ? ' and the magazine (print)'
                            : ''}
                    </Grid>
                </Grid>
            </CommonCard>

            {isDesktop && (
                <NimbleDialog
                    open={contactDetailsPopup}
                    maxWidth={'sm'}
                    title={`Edit ${name}`}
                    parimaryActionLabel="SAVE"
                    onClickClose={onContactDetailsCloseHandler}
                    topActionPanel
                    titleSize="26px"
                    titleWeight="600"
                    // onClickSecondaryAction={() => {
                    //     alert('secondary Action ')
                    // }}
                    onClickPrimaryAction={saveButtonHandler}
                    // onClickSecondaryAction={cancelButtonHandler}
                    topActionPanalData={topActionData}
                    fontFamily="Lato"
                >
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
                            <PersonalDetails isSubmit={isPersonSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 2 ? (
                            <ContactDetails isSubmit={isContactSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 3 ? (
                            <FunctionDetails isSubmit={isFunctionSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : (
                            ''
                        )}
                        {/* <PersonalDetails  formSubmitHandler={demoData}/> */}
                    </div>
                </NimbleDialog>
            )}

            <CommonDeletePopup
                open={inActivePopup}
                handleClose={inactivePopupHandler}
                name={name}
                isDesktop
                onClickHandler={inactiveButtonkHandler}
                actionType="Inactive"
            />
            <CommonDeletePopup
                open={deletePopup}
                handleClose={deletePopupHandler}
                name={name}
                isDesktop
                onClickHandler={deleteButtonkHandler}
                actionType="Delete"
            />

            {/* {!isDesktop && (
                <Drawer anchor={'bottom'} open={contactDetailsPopup} onClose={onContactDetailsCloseHandler}>
                    <div style={{ padding: '20px' }}>
                        <div className={styles.header_div}>
                            <div className={styles.heading_text}>{`Edit ${name}`}</div>

                            <div className={styles.btn_container}>
                                {!showDelete && (
                                    <NimbleButton
                                        label="inactive"
                                        onClick={inActiveContactHandler}
                                        size="small"
                                        variant="outlined"
                                        fontFamily="Lato"
                                    />
                                )}

                                {showDelete && (
                                    <NimbleButton
                                        label="Delete"
                                        color="#E3000A"
                                        onClick={deleteContactHandler}
                                        size="small"
                                        variant="contained"
                                        fontFamily="Lato"
                                    />
                                )}
                            </div>
                        </div>
                        <br />

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
                            <PersonalDetails isSubmit={isPersonSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 2 ? (
                            <ContactDetails isSubmit={isContactSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 3 ? (
                            <FunctionDetails isSubmit={isFunctionSubmit} closeHandler={onContactDetailsCloseHandler} />
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
            <Hidden only={['xs']}>
                <NimbleDialog
                    open={contactDetailsPopup}
                    maxWidth={'sm'}
                    title={`Edit ${name}`}
                    parimaryActionLabel="SAVE"
                    onClickClose={onContactDetailsCloseHandler}
                    topActionPanel
                    titleSize="26px"
                    titleWeight="600"
                    // onClickSecondaryAction={() => {
                    //     alert('secondary Action ')
                    // }}
                    onClickPrimaryAction={saveButtonHandler}
                    // onClickSecondaryAction={cancelButtonHandler}
                    topActionPanalData={topActionData}
                    fontFamily="Lato"
                >
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
                            <PersonalDetails isSubmit={isPersonSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 2 ? (
                            <ContactDetails isSubmit={isContactSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 3 ? (
                            <FunctionDetails isSubmit={isFunctionSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : (
                            ''
                        )}
                        {/* <PersonalDetails  formSubmitHandler={demoData}/> */}
                    </div>
                </NimbleDialog>
            </Hidden>
            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                <Drawer anchor={'bottom'} open={contactDetailsPopup} onClose={onContactDetailsCloseHandler}>
                    <div style={{ padding: '20px' }}>
                        <div className={styles.header_div}>
                            <div className={styles.heading_text}>{`Edit ${name}`}</div>

                            <div className={styles.btn_container}>
                                <NimbleButton
                                    label="inactive"
                                    onClick={inActiveContactHandler}
                                    size="small"
                                    variant="outlined"
                                    fontFamily="Lato"
                                />
                                <NimbleButton
                                    label="Delete"
                                    color="#E3000A"
                                    onClick={deleteContactHandler}
                                    size="small"
                                    variant="contained"
                                    fontFamily="Lato"
                                />
                            </div>
                        </div>
                        <br />

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
                            <PersonalDetails isSubmit={isPersonSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 2 ? (
                            <ContactDetails isSubmit={isContactSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : tabNumber === 3 ? (
                            <FunctionDetails isSubmit={isFunctionSubmit} closeHandler={onContactDetailsCloseHandler} />
                        ) : (
                            ''
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', margin: '20px' }}>
                        <Button onClick={onContactDetailsCloseHandler} size="small" variant="text">
                            CANCEL
                        </Button>

                        <Button onClick={saveButtonHandler} variant="contained" size="small">
                            SAVE
                        </Button>
                    </div>
                </Drawer>
            </Hidden>
        </>
    )
}

export default GeneralDetails
