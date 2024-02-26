import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// components
import CommonHeaderFilterMobile from '@shared/components/CommonHeaderFilterMobile/CommonHeaderFilterMobile'
import ContactMobileCard from '@contacts/modal/ContactMobileCard/ContactMobileCard'
import SortHeader from '@shared/components/SortHeader/SortHeader'

// css
import styles from './OrganisationContactMobile.module.css'
import addUser from '@assets/images/addUser.svg'

// external package
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/store'

// types
import { ContactRequestParams } from '@app-types/ContactResponse.types'

// from store
import { handleContact, handleContactMobileData } from '@contacts/store/contactStore/contact.slice'

// shared components
// import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'

// component
import AddContact from '@contacts/components/AddContact/AddContact'



const ContactMobileTable: React.FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { idOrganisation  } = location.state
    const [page, setPage] = useState(1)
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
        orgid: idOrganisation
    }

    const [filterParam, setFilterParam] = useState(initialFilterParam)
    const [isAscending, setIsAscending] = useState(true)

    const contactLoading = useSelector((state: RootState) => state.contact.contactLoading)
    const contactData = useSelector((state: RootState) => state.contact.contactData?.contact)
    const totalPage = useSelector((state: RootState) => state.contact.contactData?.totalPages) ?? 0
    const contactMobileData = useSelector((state: RootState) => state.contact.contactMobileData)

    useEffect(() => {
        if (contactData) {
            dispatch(handleContactMobileData(contactData))
        }
    }, [contactData])

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            dispatch(handleContactMobileData([]))
            dispatch(handleContact(filterParam))
        }, 500)

        return () => {
            clearTimeout(idTimeOut)
        }
    }, [filterParam])

    const tableSortHandler = (colName: string): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
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
            dispatch(handleContact({ ...filterParam, pagenumber: page + 1 }))
            setPage(page + 1)
        }
    }

    const onCommonSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilterParam((prevState: ContactRequestParams) => ({
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
                placeholder="Search for contact persons..."
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
                    dataLength={contactMobileData ? contactMobileData.length : 0}
                    next={handleUserPagination}
                    hasMore={true}
                    loader={contactLoading && <h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {contactMobileData?.map((item, index) => (
                        <ContactMobileCard key={index} item={item} />
                    ))}
                </InfiniteScroll>
            </div>

            {/* <AddorEditUser
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                userData={null}
                isDesktop={false}
            /> */}

            <AddContact openPopUp={openPopUp} handleClose={addOrEditDialogHandler} isDesktop={false} />
        </div>
    )
}

export default ContactMobileTable
