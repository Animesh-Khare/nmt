import React, { useState, useEffect } from 'react'

// components
import CommonHeaderFilterMobile from '@shared/components/CommonHeaderFilterMobile/CommonHeaderFilterMobile'
import OrganisationMobileCard from '@organisations/modals/OrganisationMobileCard/OrganisationMobileCard'
import SortHeader from '@shared/components/SortHeader/SortHeader'

// css
import styles from './OrganisationMobileTable.module.css'
import addUser from '@assets/images/addUser.svg'

// external package
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/store'

// types
import { OrganizationRequestParams } from '@app-types/OrganisationResponse.types'

// from store
import { handleOrganisation, handleOrganisationMobileData } from '@organisations/store/organisation.slice'

// shared components
import AddOrganisation from '@organisations/components/AddOrganisation/AddOrganisation'

const initialFilterParam: OrganizationRequestParams = {
    isAscending: true,
    Keyproperty: 'Name',
    Searchkey: '',
    organizationnmae: '',
    location: '',
    pagenumber: 1,
}

const OrganisationMobileTable: React.FC = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [openPopUp, setOpenPopUp] = useState(false)

    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [isAscending, setIsAscending] = useState(true)

    // const userOverviewLoading = useSelector((state: RootState) => state.user.userLoading)
    // const userOverviewData = useSelector((state: RootState) => state.user.userData?.userdisplays)
    // const totalPage = useSelector((state: RootState) => state.user.userData?.totalPages)
    // const userMobileData = useSelector((state: RootState) => state.user.userMobileData)

    const organisationLoading = useSelector((state: RootState) => state.organisation.organisationLoading)
    const organisationData = useSelector((state: RootState) => state.organisation.organisationData?.organization)
    const totalPage = useSelector((state: RootState) => state.organisation.organisationData?.totalPages) ?? 0
    const organisationMobileData = useSelector((state: RootState) => state.organisation.organisationMobileData)

    useEffect(() => {
        if (organisationData) {
            dispatch(handleOrganisationMobileData(organisationData))
        }
    }, [organisationData])

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleOrganisationMobileData([]))
            dispatch(handleOrganisation(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])

    const tableSortHandler = (colName: string): void => {
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            Keyproperty: colName,
            isAscending: !isAscending,
            pagenumber: 1,
        }))
        setIsAscending(!isAscending)
        setPage(1)
    }

    const handleUserPagination = (): void => {
        if (totalPage && totalPage >= page + 1) {
            dispatch(handleOrganisation({ ...filterParam, pagenumber: page + 1 }))
            setPage(page + 1)
        }
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: OrganizationRequestParams) => ({
            ...prevState,
            Searchkey: e.target.value,
            pagenumber: 1,
        }))
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
                placeholder="Search organisation..."
                onChangeHandler={onCommonSearchHandler}
                onButtonClickHandler={onButtonClickHandler}
                btnIcon={addUser}
            />

            <br />

            <div
                className={styles.user_name_div}
                onClick={() => {
                    tableSortHandler('Name')
                }}
            >
                Name &nbsp;
                <div className={styles.sortIconWrapper}>
                    <SortHeader column="Name" sortColumn="Name" isAscending={isAscending} />
                </div>
            </div>

            <div id="scrollableDiv" className={styles.accordian_cards_container}>
                <InfiniteScroll
                    scrollableTarget={'scrollableDiv'}
                    dataLength={organisationMobileData ? organisationMobileData.length : 0}
                    next={handleUserPagination}
                    hasMore={true}
                    loader={organisationLoading && <h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {organisationMobileData?.map((item, index) => (
                        <OrganisationMobileCard key={index} item={item} />
                    ))}
                </InfiniteScroll>
            </div>

            <AddOrganisation openPopUp={openPopUp} handleClose={addOrEditDialogHandler} isDesktop={false} />
        </div>
    )
}

export default OrganisationMobileTable
