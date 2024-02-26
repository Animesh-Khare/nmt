import React, { useState, useEffect } from 'react'

// components
import CommonHeaderFilterMobile from '@shared/components/CommonHeaderFilterMobile/CommonHeaderFilterMobile'
import UserMobileCard from '../../modals/UserMobileCard/UserMobileCard'
import SortHeader from '@shared/components/SortHeader/SortHeader'

// css
import styles from './UserDisplayMobile.module.css'
import addUser from '@assets/images/addUser.svg'
  
// external package
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/store'

// types
import { UserRequestParams } from '@app-types/UserResponse.types'

// from store
import { handleUser, handleUserMobileData } from '@users/store/user.slice'

// shared components
import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'


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

const UserDisplayMobile: React.FC = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [openPopUp, setOpenPopUp] = useState(false)
   
    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [isAscending, setIsAscending] = useState(true)

    const userOverviewLoading = useSelector((state: RootState) => state.user.userLoading)
    const userOverviewData = useSelector((state: RootState) => state.user.userData?.userdisplays)
    const totalPage = useSelector((state: RootState) => state.user.userData?.totalPages)
    const userMobileData = useSelector((state: RootState) => state.user.userMobileData)

    useEffect(() => {
        if (userOverviewData) {
            dispatch(handleUserMobileData(userOverviewData))
        }
    }, [userOverviewData])

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleUserMobileData([]))
            dispatch(handleUser(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])


    const tableSortHandler = (colName: string): void => {
        setFilterParam((prevState: UserRequestParams) => ({
            ...prevState,
            Keyproperty: colName,
            isAscending: !isAscending,
            pagenumber: 1,
        }))
        setIsAscending(!isAscending)
        setPage(1)
    }

    const handleUserPagination = (): void => {
        if (totalPage && (totalPage >= page + 1)) {
                dispatch(handleUser({...filterParam,pagenumber: page + 1,}))
                setPage(page + 1)
        }
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: UserRequestParams) => ({ ...prevState, searchkey: e.target.value, pagenumber: 1 }))
        setPage(1)
    }

    const onButtonClickHandler = (): void => {
        setOpenPopUp(true)
    }

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    return (
        <div className={styles.parent_div}>
            <CommonHeaderFilterMobile
                placeholder="Search name or email..."
                onChangeHandler={onCommonSearchHandler}
                onButtonClickHandler={onButtonClickHandler}
                btnIcon={addUser}
            />

            <br />

            <div className={styles.user_name_div} onClick={() => {tableSortHandler('Name')}}>
                Name &nbsp;
                <div className={styles.sortIconWrapper}>
                    <SortHeader column='Name' sortColumn='Name' isAscending={isAscending} />
                </div>
            </div>

            <div id="scrollableDiv" className={styles.accordian_cards_container}>
                <InfiniteScroll
                    scrollableTarget={'scrollableDiv'}
                    dataLength={userMobileData ? userMobileData.length : 0}
                    next={handleUserPagination}
                    hasMore={true}
                    loader={userOverviewLoading && <h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {userMobileData?.map((item, index) => (
                        <UserMobileCard key={index} item={item} />
                    ))}
                </InfiniteScroll>  
            </div>

            <AddorEditUser
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                userData={null}
                isDesktop={false}
            />
  
        </div>
    )
}

export default UserDisplayMobile
