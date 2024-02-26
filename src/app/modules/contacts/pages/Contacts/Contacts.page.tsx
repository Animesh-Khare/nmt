import React, { useEffect } from 'react'

// package
import { useDispatch } from 'react-redux'

// css
import styles from './ContactPage.module.css'

// from mui
import { Hidden } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

// from slice
import {
    handleContact,
    // handleGender,
    // handleHoldings,
    // handlefunctionClassification,
    // handlefunctionLevel,
} from '@contacts/store/contactStore/contact.slice'

// types
import { ContactRequestParams } from '@app-types/ContactResponse.types'

// components
import Pagelayout from '@layout/PageLayout'
import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'
import ContactTable from '@contacts/components/ContactTable/ContactTable'
import ContactMobileTable from '@contacts/components/ContactMobileTable/ContactMobileTable'

const contactRequestParams: ContactRequestParams = {
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

const Contactspage: React.FC = () => {
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:600px)')
    const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)')

    useEffect(() => {
        dispatch(handleContact(contactRequestParams))
        // dispatch(handlefunctionClassification())
        // dispatch(handlefunctionLevel())
        // dispatch(handleHoldings())
        // dispatch(handleGender())
    }, [])
   
    return (   
        <Pagelayout>
            <div
                className={`${styles.common_header_component_container} ${matches ? styles.AddPadding : ''} ${
                    isMediumScreen ? styles.TopMargin : ''
                }`}
            >
                <CommonHeaderComponent
                    heading="Contact persons"
                    para="An overview of all contact persons"
                    goBackImg=""
                    goBackText=""
                    goBackClickHandler={() => {}}
                />
            </div>

            <br />

            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                <ContactMobileTable />
            </Hidden>

            <Hidden only={['xs']}>
                {/* <div className={styles.contact_table_container}> */}
                <ContactTable />
                {/* </div> */}
            </Hidden>
        </Pagelayout>
    )
}

export default Contactspage
