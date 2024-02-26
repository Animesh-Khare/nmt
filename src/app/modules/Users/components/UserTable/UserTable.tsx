import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// shared component
// import PopUp from '@shared/components/PopUp/PopUp'
import CommonDeletePopup from '@shared/components/CommonDeletePopup/CommonDeletePopup'
import CommonHeaderFilter from '@shared/components/CommonHeaderFilter/CommonHeaderFilter'
import SearchBar from '@shared/components/SearchBar/SearchBar'
import Dropdown from '@shared/components/Dropdown/Dropdown'
import SortHeader from '@shared/components/SortHeader/SortHeader'
import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'

// css
import styles from './UserTable.module.css'

// from material ui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@store/store'
import { UserRequestParams, userdisplay } from '@app-types/UserResponse.types'
import { handleUser, handleDeleteUser, handleUserRole } from '@users/store/user.slice'
// images
import addUser from '@assets/images/addUser.svg'
import editIcon from '@assets/images/editIcon.svg'
import deleteIcon from '@assets/images/deleteIcon.svg'
import CommonPagination from '@shared/components/CommonPagination/CommonPagination'

// routing
import { useNavigate } from 'react-router-dom'

interface userData {
    idUser: number
    userName: string
}

const AuthOptions = [
    {
        label: 'admin',
        value: 1,
    },
    {
        label: 'user',
        value: 2,
    },
]

const initialFilterParam: UserRequestParams = {
    searchkey: '',
    Name: '',
    Email: '',
    Autherization: '',
    searchrole: '',
    Keyproperty: 'Name',
    isAscending: true,
    pagenumber: 1,
}

const UserTable: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const matches = useMediaQuery('(max-width:820px)')

    useEffect(() => {
        if (matches) {
            setTableColumnData([
                { id: 1, label: 'Name', width: '15%' },
                { id: 2, label: 'Email', width: '40%' },
                { id: 4, label: 'Authorization(s)', width: '10%' },
            ])
        } else {
            setTableColumnData([
                { id: 1, label: 'Name', width: '15%' },
                { id: 2, label: 'Email', width: '40%' },
                { id: 3, label: 'User roles', width: '22%' },
                { id: 4, label: 'Authorization(s)', width: '10%' },
            ])
        }
    }, [matches])

    const [tableColumnData, setTableColumnData] = useState([
        { id: 1, label: 'Name', width: '15%' },
        { id: 2, label: 'Email', width: '40%' },
        { id: 3, label: 'User roles', width: '22%' },
        { id: 4, label: 'Authorization(s)', width: '10%' },
    ])
    const [showFilter, setShowFilter] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
    const [deleteUserData, setDeleteUserData] = useState<userData | null>(null)
    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('Name')
    const [isAscending, setIsAscending] = useState(true)
    const [editUserData, setEditUserData] = useState<userdisplay | null>(null)

    const userRoleData = useSelector((state: RootState) => state.user.userRoleData) ?? []
    const userOverviewData = useSelector((state: RootState) => state.user.userData?.userdisplays)
    const TotalPage = useSelector((state: RootState) => state.user.userData?.totalPages) ?? 0

    const dropdowndata = userRoleData?.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleUser(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])

    useEffect(() => {
        if (!showFilter) {
            dispatch(handleUser(initialFilterParam))
            dispatch(handleUserRole())
            setFilterParam(initialFilterParam)
        }
    }, [showFilter])

    const tableSortHandler = (colName: string): void => {
        setSortColumn(colName)
        setFilterParam((prevState: UserRequestParams) => ({
            ...prevState,
            Keyproperty:
                colName === 'Authorization(s)' ? 'Authorization' : colName === 'User roles' ? 'User Role' : colName,
            isAscending: !isAscending,
            pagenumber: 1,
        }))
        setIsAscending(!isAscending)
        setPage(1)
    }

    const showFilterHandler = (): void => {
        setShowFilter(!showFilter)
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, searchkey: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, Name: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, Email: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const roleSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, searchrole: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    const closeDeletePopUpHandler = (): void => {
        setOpenDeletePopUp(false)
    }

    const authSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({
            ...prevState,
            Autherization: e.target.value,
            pagenumber: 1,
        }))
        setPage(1)
    }

    const editIconHandler = (item: userdisplay): void => {
        setEditUserData(item)
        setOpenPopUp(true)
    }

    const onPageClickHandler = (e: any, page: number): void => {
        setPage(page)
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, pagenumber: page }))
    }
    const deleteIconHandler = (item: userdisplay): void => {
        setDeleteUserData({ idUser: item.idUser, userName: item.fullName })
        setOpenDeletePopUp(true)
    }

    // const handleOnChange = (): void => {}
    const onGoHandler = (pagenum: number): void => {
        setPage(pagenum === 0 ? 1 : pagenum)
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, pagenumber: pagenum === 0 ? 1 : pagenum }))
    }

    const onButtonClickHandler = (): void => {
        setEditUserData(null)
        setOpenPopUp(true)
    }

    const onDeleteHandler = (): void => {
        dispatch(handleDeleteUser(deleteUserData?.idUser ?? 0))
        setOpenDeletePopUp(false)
    }

    // const onDeleteHandler=(): void =>{
    //    dispatch(handleDeleteUser(deleteUserData?.idUser ?? 0))
    //    setOpenDeletePopUp(false)
    // }

    const userRoleClickHandler = (userrole: string): void => {

        if (userrole.includes('Member advisor')) {
            navigate('/membershipOverview', {
                state: { idContact: 0, idOrganisation: 0 },
            })
        }
    }

    const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            // color: 'rgba(0, 0, 0, 0.87)',
            color: '#0C1B2A',
            boxShadow: theme.shadows[1],
            fontSize: 12,

            fontFamily: 'Montserrat',
            fontStyle: 'normal',

            fontWeight: '400',
            lineHeight: '148.9%',
        },
    }))

    return (
        <div className={styles.parent_div}>
            <CommonHeaderFilter
                showFilterHandler={showFilterHandler}
                placeholder="Search name or email..."
                onChangeHandler={onCommonSearchHandler}
                onButtonClickHandler={onButtonClickHandler}
                btnLable="Add user"
                btnIcon={addUser}
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
                                    <SearchBar placeholder="Filter email..." onChangeHandler={emailChangeHandler} />
                                </TableCell>
                                {!matches && (
                                    <TableCell style={{ padding: '5px' }}>
                                        <Dropdown
                                            placeholder="Filter user roles..."
                                            options={dropdowndata}
                                            onSelectHandler={roleSelectHandler}
                                        />
                                    </TableCell>
                                )}

                                <TableCell style={{ padding: '5px' }}>
                                    <Dropdown
                                        placeholder="Filter..."
                                        options={AuthOptions}
                                        onSelectHandler={authSelectHandler}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {userOverviewData?.map((row: any, index) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={styles.table_body_row}
                                key={`userTable ${index}`}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    {row.fullName}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    {row.email}
                                </TableCell>
                                {!matches && (
                                    <TableCell
                                        align="left"
                                        style={{ borderBottom: 'none' }}
                                        className={`${styles.table_body_content} ${
                                            row.userRoles === '' ? styles.emptyUserRole : styles.colorUserRole
                                        }`}
                                        onClick={() => {
                                            userRoleClickHandler(row.userRoles)
                                        }}
                                    >
                                        {row.userRoles.length > 0 ? row.userRoles : 'No roles selected'}
                                    </TableCell>
                                )}

                                <TableCell
                                    align="left"
                                    style={{ borderBottom: 'none' }}
                                    className={styles.table_body_content}
                                >
                                    <span
                                        className={`${styles.authorization} ${
                                            row.authorization === 'Admin'
                                                ? styles.admin
                                                : row.authorization === 'User'
                                                ? styles.user
                                                : row.authorization === 'Disabled'
                                                ? styles.disabled
                                                : ''
                                        }`}
                                    >
                                        {row.authorization}
                                    </span>
                                </TableCell>
                                <TableCell align="left" style={{ borderBottom: 'none' }}>
                                    <LightTooltip title="edit user">
                                        <img
                                            src={editIcon}
                                            style={{ cursor: 'pointer' }}
                                            className={styles.table_icon}
                                            onClick={() => {
                                                editIconHandler(row)
                                            }}
                                        ></img>
                                    </LightTooltip>
                                </TableCell>
                                <TableCell align="left" style={{ borderBottom: 'none' }}>
                                    <LightTooltip title="delete user">
                                        <img
                                            src={deleteIcon}
                                            style={{ cursor: 'pointer' }}
                                            className={styles.table_icon}
                                            onClick={() => {
                                                deleteIconHandler(row)
                                            }}
                                        ></img>
                                    </LightTooltip>
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
            <CommonDeletePopup
                open={openDeletePopUp}
                handleClose={closeDeletePopUpHandler}
                name={deleteUserData?.userName ?? ''}
                isDesktop={true}
                onClickHandler={onDeleteHandler}
            />

            <AddorEditUser
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                userData={editUserData}
                isDesktop={true}
            />
        </div>
    )
}

export default UserTable
