import React, { useState } from 'react'
import styles from './FunctionMobileTable.module.css'

import SortHeader from '@shared/components/SortHeader/SortHeader'

// common
import { NimbleMobileSearch } from 'nimble-design-system'

import FunctionMobileCard from '../FunctionMobileCard/FunctionMobileCard'

// import InfiniteScroll from 'react-infinite-scroll-component'

import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

import AddorEditExperience from '../AddorEditExperience/AddorEditExperience'

const FunctionMobileTable: React.FC = () => {   
    const [isAscending, setIsAscending] = useState(true)
    const [openAddExperiencePopup, setOpenAddExperiencePopup] = useState(false)

    const functionOverviewData = useSelector((state: RootState) => state.contactDetail.functionOverviewData?.functions)

    // const contactLoading = useSelector((state: RootState) => state.contact.contactLoading)
    // const contactData = useSelector((state: RootState) => state.contact.contactData?.contact)
    // const totalPage = useSelector((state: RootState) => state.contact.contactData?.totalPages) ?? 0
    // const contactMobileData = useSelector((state: RootState) => state.contact.contactMobileData)

    const tableSortHandler = (colName: string): void => {
        // setFilterParam((prevState: ContactRequestParams) => ({
        //     ...prevState,
        //     Keyproperty: colName,
        //     isAscending: !isAscending,
        //     pagenumber: 1,
        // }))
        setIsAscending(!isAscending)
        // setPage(1)
    }

    // const handleUserPagination = (): void => {
    //     if (totalPage && totalPage >= page + 1) {
    //         dispatch(handleContact({ ...filterParam, pagenumber: page + 1 }))
    //         setPage(page + 1)
    //     }
    // }

    const addFunctionHandler = (): void => {
        setOpenAddExperiencePopup(true)
    }

    const handleAddorEditExperience = (): void => {
        setOpenAddExperiencePopup(false)
    }

    return (
        <div className={styles.parent_div}>
            <NimbleMobileSearch
                isPrimaryActionAvailable
                onClickPrimaryAction={addFunctionHandler}
                onSearch={function noRefCheck() {}}
                placeholder="Search name or email..."
                primaryColor="#0057A2"
            />
    
            <br />

            <div
                className={styles.user_name_div}
                onClick={() => {
                    tableSortHandler('Name')
                }}
            >
                Function Name &nbsp;
                <div className={styles.sortIconWrapper}>
                    <SortHeader column="Name" sortColumn="Name" isAscending={isAscending} />
                </div>
            </div>

            <div id="scrollableDiv" className={styles.accordian_cards_container}>
                {/* <InfiniteScroll
                    scrollableTarget={'scrollableDiv'}
                    dataLength={contactMobileData ? contactMobileData.length : 0}
                    next={handleUserPagination}
                    hasMore={true}
                    loader={contactLoading && <h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                > */}
                {functionOverviewData?.map((item, index) => (
                    <FunctionMobileCard key={index} item={item} />
                ))}
                {/* </InfiniteScroll> */}
            </div>

            <AddorEditExperience
                openPopUp={openAddExperiencePopup}
                handleClose={handleAddorEditExperience}
                experienceData={null}
                isDesktop={false}
            />
        </div>
    )
}

export default FunctionMobileTable
