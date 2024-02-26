import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import PopUp from '@shared/components/PopUp/PopUp'
import CommonHeaderFilter from '@shared/components/CommonHeaderFilter/CommonHeaderFilter'
import SearchBar from '@shared/components/SearchBar/SearchBar'
import SortHeader from '@shared/components/SortHeader/SortHeader'

import CommonDeletePopup from '@shared/components/CommonDeletePopup/CommonDeletePopup'

// import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'
// import AddOrganisation from '@organisations/components/AddOrganisation/AddOrganisation'

// css
import styles from './ContactTable.module.css'

// from material ui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { RootState } from '@store/store'
import { ContactDisplay, ContactRequestParams } from '@app-types/ContactResponse.types'

// images

import CommonPagination from '@shared/components/CommonPagination/CommonPagination'
import maleIcon from '@assets/images/contacts/maleIcon.svg'
import femaleIcon from '@assets/images/contacts/femaleIcon.svg'
import buildingImg from '@assets/images/contacts/buildings.svg'
import mainFunctionIcon from '@assets/images/contacts/mainFunctionIcon.svg'
// component
import AddContact from '@contacts/components/AddContact/AddContact'
// const tableColumnData = [
//     { id: 1, label: 'Name', width: '30%' },
//     { id: 2, label: 'Organisation', width: '20%' },
//     { id: 3, label: 'Function name', width: '20%' },
//     { id: 4, label: 'E-mail', width: '15%' },
//     { id: 5, label: 'Phone number', width: '15%' },
// ]

import {
    handleContact,
    // handleGender,
    // handleHoldings,
    // handlefunctionClassification,
    // handlefunctionLevel,
    handleReactivateContactPerson,
} from '@contacts/store/contactStore/contact.slice'
const initialFilterParam: ContactRequestParams = {
    isAscending: true,
    Keyproperty: 'Name',
    Searchkey: '',
    pagenumber: 1,
    organization: '',
    function: '',
    email: '',
    phonenumber: '',
    Name: '',
    orgid: 0,
}

const ContactTable: React.FC = () => {
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:820px)')
    const navigate = useNavigate()

    const theme = useTheme()
    const [showFilter, setShowFilter] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [ReactivatePopUP, setReactivatePopUP] = useState(false)
    const [clientId, setClientId] = useState<number | null>(null)

    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('Name')
    const [isAscending, setIsAscending] = useState(true)
    const [userNameforReactivate, setUserNameforReactivate] = useState('')
    const [tableColumnData, setTableColumnData] = useState([
        { id: 1, label: 'Name', width: '30%' },
        { id: 2, label: 'Organisation', width: '20%' },
        { id: 3, label: 'Function name', width: '20%' },
        { id: 4, label: 'E-mail', width: '15%' },
        { id: 5, label: 'Phone number', width: '15%' },
    ])

    const contactData = useSelector((state: RootState) => state.contact.contactData?.contact)
    const TotalPage = useSelector((state: RootState) => state.contact.contactData?.totalPages) ?? 0

    useEffect(() => {
        if (matches) {
            setTableColumnData([
                { id: 1, label: 'Name', width: '30%' },
                { id: 2, label: 'Organisation', width: '20%' },
            ])
        } else {
            setTableColumnData([
                { id: 1, label: 'Name', width: '30%' },
                { id: 2, label: 'Organisation', width: '20%' },
                { id: 3, label: 'Function name', width: '20%' },
                { id: 4, label: 'E-mail', width: '15%' },
                { id: 5, label: 'Phone number', width: '15%' },
            ])
        }
    }, [matches])

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleContact(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])

    // useEffect(() => {
    //     if (!showFilter) {
    //         dispatch(handleContact(initialFilterParam))
    //         dispatch(handlefunctionClassification())
    //         dispatch(handlefunctionLevel())
    //         dispatch(handleHoldings())
    //         dispatch(handleGender())
    //         setFilterParam(initialFilterParam)
    //     }
    // }, [showFilter])

    const tableSortHandler = (colName: string): void => {
        setSortColumn(colName)
        setIsAscending(!isAscending)
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            Keyproperty:
                colName === 'E-mail'
                    ? 'Email'
                    : colName === 'Phone number'
                    ? 'Phone Number'
                    : colName === 'Function name'
                    ? 'function name'
                    : colName === 'Organisation'
                    ? 'Organization name'
                    : colName,
            isAscending: !isAscending,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const showFilterHandler = (): void => {
        setShowFilter(!showFilter)
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            Searchkey: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            Name: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const organisationChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            organization: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const functionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            function: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({ ...prevState, email: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const phoneNumChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            phonenumber: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    const onPageClickHandler = (e: any, page: number): void => {
        setPage(page)
        setFilterParam((prevState: ContactRequestParams) => ({ ...prevState, pagenumber: page }))
    }

    // const handleOnChange = (): void => {}
    const onGoHandler = (pagenum: number): void => {
        setPage(pagenum === 0 ? 1 : pagenum)
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            pagenumber: pagenum === 0 ? 1 : pagenum,
        }))
    }

    const onButtonClickHandler = (): void => {
        setOpenPopUp(true)
    }

    const RowClickHandler = (contactId: number, organisationId: number, name: string, active: boolean): void => {
        navigate('/contactPersonDetail', {
            state: { idContact: contactId, idOrganisation: organisationId, name: name, active: active },
        })
    }

    const RowClickHandlerForOrganisation = (idorganization: number, Name: string): void => {
        navigate('/organisationOverview', { state: { idOrganisation: idorganization, name: Name } })
    }
    const OpenReactivateHandler = (name: string, clientId: number): void => {
        setReactivatePopUP(true)
        setUserNameforReactivate(name)
        setClientId(clientId)
    }
    const CancelReactivatePopupHandler = (): void => {
        setReactivatePopUP(false)
    }

    const ReactivateButtonHnadler = (): void => {
        const sendData = {
            clientid: clientId,
            Inactive: false,
        }

        dispatch(handleReactivateContactPerson(sendData))
        setReactivatePopUP(false)
    }
    return (
        <div className={styles.parent_div}>
            <CommonHeaderFilter
                showFilterHandler={showFilterHandler}
                placeholder="Search for contact persons..."
                onChangeHandler={onCommonSearchHandler}
                onButtonClickHandler={onButtonClickHandler}
                btnLable="Add contact person"
                btnIcon={''}
            />
            <br />
            <TableContainer component={Paper} style={{ boxShadow: 'none', maxHeight: '60vh' }}>
                <Table sx={{ minWidth: 650 }} style={{ border: 'none' }} stickyHeader>
                    <TableHead style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        <TableRow>
                            {tableColumnData.map((item) => (
                                <TableCell
                                    onClick={() => {
                                        tableSortHandler(item.label)
                                    }}
                                    style={{ width: `${item.width}`, borderBottom: 'none' }}
                                    key={item.id}
                                >
                                    <div className={styles.table_heading}>
                                        <span style={{ cursor: 'pointer', marginRight: '6px' }}>{item.label}</span>
                                        <div className={styles.sortIconWrapper}>
                                            <SortHeader
                                                column={item.label}
                                                sortColumn={sortColumn}
                                                isAscending={isAscending}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>

                        {showFilter && (
                            <TableRow>
                                <TableCell style={{ padding: '5px' }}>
                                    <SearchBar placeholder="Filter name..." onChangeHandler={nameChangeHandler} />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <SearchBar
                                        placeholder="Filter organisation..."
                                        onChangeHandler={organisationChangeHandler}
                                    />
                                </TableCell>
                                {!isTablet && (
                                    <TableCell style={{ padding: '5px' }}>
                                        <SearchBar
                                            placeholder="Filter function..."
                                            onChangeHandler={functionChangeHandler}
                                        />
                                    </TableCell>
                                )}

                                {!isTablet && (
                                    <TableCell style={{ padding: '5px' }}>
                                        <SearchBar placeholder="Filter email..." onChangeHandler={emailChangeHandler} />
                                    </TableCell>
                                )}

                                {!isTablet && (
                                    <TableCell style={{ padding: '5px' }}>
                                        <SearchBar
                                            placeholder="Filter mobile..."
                                            onChangeHandler={phoneNumChangeHandler}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {contactData?.map((row: ContactDisplay, index) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={styles.table_body_row}
                                key={`contactTable ${index}`}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                    // onClick={
                                    //     row.active ? () => {
                                    //     RowClickHandler(row.contactperson, row.organizationid, row.name, row.active);
                                    // } : undefined}
                                    // onClick={() => {
                                    //     RowClickHandler(
                                    //         row.contactperson,
                                    //         row.organizationid,
                                    //         row.name,
                                    //         row.active
                                    //     )
                                    // }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {row.idGender === 1 && (
                                            <img
                                                src={maleIcon}
                                                alt=""
                                                onClick={() => {
                                                    RowClickHandler(
                                                        row.contactperson,
                                                        row.organizationid,
                                                        row.name,
                                                        row.active
                                                    )
                                                }}
                                            />
                                        )}
                                        {row.idGender === 2 && (
                                            <img
                                                src={femaleIcon}
                                                alt=""
                                                onClick={() => {
                                                    RowClickHandler(
                                                        row.contactperson,
                                                        row.organizationid,
                                                        row.name,
                                                        row.active
                                                    )
                                                }}
                                            />
                                        )}
                                        <span
                                            onClick={() => {
                                                RowClickHandler(
                                                    row.contactperson,
                                                    row.organizationid,
                                                    row.name,
                                                    row.active
                                                )
                                            }}
                                        >
                                            {row.name}
                                        </span>
                                        {!row.active && (
                                            <span
                                                className={styles.inactive_text}
                                                onClick={() => {
                                                    OpenReactivateHandler(row.name, row.contactperson)
                                                }}
                                            >
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ borderBottom: 'none', color: '#EE7000' }}
                                    className={styles.table_body_content}
                                    onClick={() => {
                                        RowClickHandlerForOrganisation(row.organizationid, row.organizationname)
                                    }}
                                >
                                    <div className={styles.img_text_container}>
                                        <img src={buildingImg} alt=""></img>{' '}
                                        <span style={{ color: '#EE7000' }}> {row.organizationname} </span>
                                    </div>
                                </TableCell>
                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
                                        onClick={() => {
                                            RowClickHandler(row.contactperson, row.organizationid, row.name, row.active)
                                        }}
                                    >
                                        <div className={styles.img_function_name_div}>
                                            {row.currentfuncount > 1 && <img src={mainFunctionIcon} alt=""></img>}

                                            {row.fuctionname}
                                        </div>
                                    </TableCell>
                                )}

                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
                                        onClick={() => {
                                            RowClickHandler(row.contactperson, row.organizationid, row.name, row.active)
                                        }}
                                    >
                                        <span>{row.email}</span>
                                    </TableCell>
                                )}

                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
                                        onClick={() => {
                                            RowClickHandler(row.contactperson, row.organizationid, row.name, row.active)
                                        }}
                                    >
                                        {row.phoneNumber}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={styles.pagination_container_div}>
                <CommonPagination
                    totalPage={TotalPage}
                    onPageClickHandler={onPageClickHandler}
                    page={page}
                    onGoHandler={onGoHandler}
                />
            </div>

            {openPopUp && <AddContact openPopUp={openPopUp} handleClose={addOrEditDialogHandler} isDesktop={true} />}

            <CommonDeletePopup
                open={ReactivatePopUP}
                handleClose={CancelReactivatePopupHandler}
                name={userNameforReactivate}
                isDesktop
                onClickHandler={ReactivateButtonHnadler}
                actionType="reactivate"
            />
        </div>
    )
}

export default ContactTable
