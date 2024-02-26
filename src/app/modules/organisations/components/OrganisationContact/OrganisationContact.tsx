import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

// import PopUp from '@shared/components/PopUp/PopUp'
import CommonHeaderFilter from '@shared/components/CommonHeaderFilter/CommonHeaderFilter'
import SearchBar from '@shared/components/SearchBar/SearchBar'
import SortHeader from '@shared/components/SortHeader/SortHeader'
// import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'
// import AddOrganisation from '@organisations/components/AddOrganisation/AddOrganisation'

// css
import styles from './OrganisationContact.module.css'

// from material ui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@store/store'
import { ContactRequestParams } from '@app-types/ContactResponse.types'
import { handleContact } from '@contacts/store/contactStore/contact.slice'

// images

import CommonPagination from '@shared/components/CommonPagination/CommonPagination'

// component
import AddContact from '@contacts/components/AddContact/AddContact'

// const tableColumnData = [
//     { id: 1, label: 'Name', width: '30%' },
//     { id: 2, label: 'Organisation', width: '20%' },
//     { id: 3, label: 'Function name', width: '20%' },
//     { id: 4, label: 'E-mail', width: '15%' },
//     { id: 5, label: 'Phone number', width: '15%' },
// ]

const OrganisationContact: React.FC = () => {
    const location = useLocation()

    const { idOrganisation } = location.state
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:820px)')
    const navigate = useNavigate()
    const [showFilter, setShowFilter] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)

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
        orgid: idOrganisation,
    }

    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('Name')
    const [isAscending, setIsAscending] = useState(true)
    const [tableColumnData, setTableColumnData] = useState([
        { id: 1, label: 'Name', width: '30%' },
        { id: 2, label: 'Function name', width: '20%' },
        { id: 3, label: 'Function level', width: '20%' },
        { id: 4, label: 'E-mail', width: '15%' },
        { id: 5, label: 'Tel. number', width: '15%' },
    ])

    const contactData = useSelector((state: RootState) => state.contact.contactData?.contact)
    const TotalPage = useSelector((state: RootState) => state.contact.contactData?.totalPages) ?? 0

    useEffect(() => {
        if (matches) {
            setTableColumnData([
                { id: 1, label: 'Name', width: '30%' },
                { id: 2, label: 'Function name', width: '20%' },
            ])
        } else {
            setTableColumnData([
                { id: 1, label: 'Name', width: '30%' },
                { id: 2, label: 'Function name', width: '20%' },
                { id: 3, label: 'Function level', width: '20%' },
                { id: 4, label: 'E-mail', width: '15%' },
                { id: 5, label: 'Tel. number', width: '15%' },
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

    useEffect(() => {
        if (!showFilter) {
            dispatch(handleContact(initialFilterParam))
            setFilterParam(initialFilterParam)
        }
    }, [showFilter])

    const tableSortHandler = (colName: string): void => {
        setSortColumn(colName)
        setIsAscending(!isAscending)
        setFilterParam((prevState: ContactRequestParams) => ({
            ...prevState,
            Keyproperty:
                colName === 'E-mail'
                    ? 'Email'
                    : colName === 'Tel. number'
                    ? 'Tel. number'
                    : colName === 'Function name'
                    ? 'function name'
                    : colName === 'Function level'
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
        // console.log(isAddPopup);
        // setEditUserData(null)
        setOpenPopUp(true)
    }

    const RowClickHandler = (contactId: number, organisationId: number, name: string): void => {
        navigate('/contactPersonDetail', {
            state: { idContact: contactId, idOrganisation: organisationId, name: name },
        })
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
                                        placeholder="Filter Function name..."
                                        onChangeHandler={organisationChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <SearchBar
                                        placeholder="Filter function..."
                                        onChangeHandler={functionChangeHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <SearchBar placeholder="Filter email..." onChangeHandler={emailChangeHandler} />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <SearchBar placeholder="Filter mobile..." onChangeHandler={phoneNumChangeHandler} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {contactData?.map((row: any, index) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={styles.table_body_row}
                                key={`contactTable ${index}`}
                                onClick={() => {
                                    RowClickHandler(row.contactperson, row.organizationid, row.name)
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    {row.fuctionname}
                                </TableCell>
                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
                                    >
                                        {row.functionlevel}
                                    </TableCell>
                                )}

                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
                                    >
                                        <span
                                        // className={`${styles.authorization} ${
                                        //     row.authorization === 'Admin'
                                        //         ? styles.admin
                                        //         : row.authorization === 'User'
                                        //         ? styles.user
                                        //         : row.authorization === 'Disabled'
                                        //         ? styles.disabled
                                        //         : ''
                                        // }`}
                                        >
                                            {row.email}
                                        </span>
                                    </TableCell>
                                )}

                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={styles.table_body_content}
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

            <AddContact
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                isDesktop={true}
                orgId={idOrganisation}
            />
        </div>
    )
}

export default OrganisationContact
