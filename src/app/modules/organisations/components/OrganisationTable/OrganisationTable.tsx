import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// shared component
// import PopUp from '@shared/components/PopUp/PopUp'
import CommonHeaderFilter from '@shared/components/CommonHeaderFilter/CommonHeaderFilter'
import SearchBar from '@shared/components/SearchBar/SearchBar'
import Dropdown from '@shared/components/Dropdown/Dropdown'
import SortHeader from '@shared/components/SortHeader/SortHeader'
// import SingleSelect from '@shared/components/MultiSelect/SingleSelect'
// import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'
import AddOrganisation from '@organisations/components/AddOrganisation/AddOrganisation'

// css
import styles from './OrganisationTable.module.css'

// from material ui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { RootState } from '@store/store'
import { OrganizationRequestParams } from '@app-types/OrganisationResponse.types'

// images
import addOrgan from '@assets/images/organisations/addOrganisations.svg'

import CommonPagination from '@shared/components/CommonPagination/CommonPagination'
import { handleOrganisation } from '@organisations/store/organisation.slice'

const tableColumnData = [
    { id: 1, label: 'Name', width: '45%' },
    { id: 2, label: 'Membership', width: '20%' },
    { id: 3, label: 'Status membership', width: '20%' },
    { id: 4, label: 'City', width: '15%' },
]

const UserRoleOption = [
    {
        label: 'member',
        value: 1,
    },
    {
        label: 'finance',
        value: 2,
    },
]

// const AuthOptions = [
//     {
//         label: 'admin',
//         value: 1,
//     },
//     {
//         label: 'user',
//         value: 2,
//     },
// ]
const initialFilterParam: OrganizationRequestParams = {
    isAscending: true,
    Keyproperty: 'Name',
    Searchkey: '',
    organizationnmae: '',
    location: '',
    pagenumber: 1,
}

const OrganisationTable: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showFilter, setShowFilter] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)

    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('Name')
    const [isAscending, setIsAscending] = useState(true)

    // const userOverviewData = useSelector((state: RootState) => state.user.userData?.userdisplays)

    const TotalPage = useSelector((state: RootState) => state.organisation.organisationData?.totalPages) ?? 0

    const organisationData = useSelector((state: RootState) => state.organisation.organisationData?.organization)

    const countryData = useSelector((state: RootState) => state.organisation.countryData) ?? []

    const countryDropdownData = countryData?.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleOrganisation(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])
    // useEffect(() => {
    //     if (!showFilter) {
    //         dispatch(handleOrganisation(initialFilterParam))
    //         dispatch(handleCountry())
    //         dispatch(handleStakeholder())
    //         setFilterParam(initialFilterParam)
    //     }
    // }, [showFilter])

    const tableSortHandler = (colName: string): void => {
        setSortColumn(colName)
        setIsAscending(!isAscending)
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            Keyproperty: colName,
            isAscending: !isAscending,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const showFilterHandler = (): void => {
        setShowFilter(!showFilter)
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            Searchkey: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            organizationnmae: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    // const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     console.log(e.target.value)
    //     setFilterParam((prevState: UserRequestParams) => ({ ...prevState, Email: e.target.value, pagenumber: 1 }))
    //     setPage(1)
    // }

    const roleSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        // console.log(e.target.value)
        // setFilterParam((prevState: OrganizationRequestParams) => ({ ...prevState, searchrole: e.target.value, pagenumber: 1 }))
        // setPage(1)
    }

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    // const locationSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    //     console.log(e.target.value)
    //     setFilterParam((prevState: OrganizationRequestParams) => ({
    //         ...prevState,
    //         location: e.target.value,
    //         pagenumber: 1,
    //     }))
    //     setPage(1)
    // }

    // const SingleSelectHandler = (value: any): void => {
    //     console.log('value of single select=====>', value)
    //     setFilterParam((prevState: OrganizationRequestParams) => ({
    //         ...prevState,
    //         location: value.label,
    //         pagenumber: 1,
    //     }))
    //     setPage(1)
    // }

    const onPageClickHandler = (e: any, page: number): void => {
        setPage(page)
        setFilterParam((prevState: OrganizationRequestParams) => ({ ...prevState, pagenumber: page }))
    }

    // const handleOnChange = (): void => {}
    const onGoHandler = (pagenum: number): void => {
        setPage(pagenum === 0 ? 1 : pagenum)
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            pagenumber: pagenum === 0 ? 1 : pagenum,
        }))
    }

    const onButtonClickHandler = (): void => {
        // console.log(isAddPopup);
        // setEditUserData(null)
        setOpenPopUp(true)
    }

    const onSelectHandler = (e: string): void => {
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            location: e,
            pagenumber: 1,
        }))
        setPage(1)
    }
    const RowClickHandler = (idorganization: number, Name: string): void => {
        navigate('/organisationOverview', { state: { idOrganisation: idorganization, name: Name } })
    }

    return (
        <div className={styles.parent_div}>
            <CommonHeaderFilter
                showFilterHandler={showFilterHandler}
                placeholder="Search organisation..."
                onChangeHandler={onCommonSearchHandler}
                onButtonClickHandler={onButtonClickHandler}
                btnLable="add organisation"
                btnIcon={addOrgan}
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
                                    {/* <SearchBar placeholder="Filter membership" onChangeHandler={emailChangeHandler} /> */}
                                    <Dropdown
                                        placeholder="Filter membership..."
                                        options={UserRoleOption}
                                        onSelectHandler={roleSelectHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    <Dropdown
                                        placeholder="Filter status membership..."
                                        options={UserRoleOption}
                                        onSelectHandler={roleSelectHandler}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '5px' }}>
                                    {/* <Dropdown
                                        placeholder="Filter location..."
                                        options={countryData}
                                        onSelectHandler={locationSelectHandler}
                                    /> */}

                                    <select
                                        className={styles.select_tag}
                                        onChange={(e) => {
                                            onSelectHandler(e.target.value)
                                        }}
                                    >
                                        <option value={''}>Select country...</option>
                                        {countryDropdownData?.map((item) => (
                                            <option key={`dropkey-${item.value}`} value={item.label}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>

                                    {/* <SingleSelect
                                        onSelectHandler={SingleSelectHandler}
                                        options={countryData}
                                        defaultValues={null}
                                        isValid={true}
                                    /> */}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {organisationData?.map((row: any) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={styles.table_body_row}
                                key={`userTable ${row.idUser}`}
                                onClick={() => {
                                    RowClickHandler(row.idorganization, row.name)
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
                                    {row.membership}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    {row.statusmembership}
                                </TableCell>
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
                                        {row.city}
                                    </span>
                                </TableCell>
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

            {openPopUp && (
                <AddOrganisation openPopUp={openPopUp} handleClose={addOrEditDialogHandler} isDesktop={true} />
            )}
        </div>
    )
}

export default OrganisationTable
