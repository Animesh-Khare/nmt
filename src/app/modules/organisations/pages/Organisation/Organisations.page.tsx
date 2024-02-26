import React, { useEffect } from 'react'

// css
import styles from './Organisationspage.module.css'

// components
import Pagelayout from '@layout/PageLayout'
import OrganisationMobileTable from '@organisations/components/OrganisationMobileTable/OrganisationMobileTable'
import OrganisationTable from '@organisations/components/OrganisationTable/OrganisationTable'
// from material ui
import { Hidden } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

// shared component
import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'

// package
import { useDispatch } from 'react-redux'

// from slice
import { handleOrganisation } from '@organisations/store/organisation.slice'

// from types
import { OrganizationRequestParams } from '@app-types/OrganisationResponse.types'
// import { handleHoldings, handlefunctionClassification } from '@contacts/store/contactStore/contact.slice'

const organizationRequestParams: OrganizationRequestParams = {
    isAscending: true,
    Keyproperty: 'Name',
    Searchkey: '',
    organizationnmae: '',
    location: '',
    pagenumber: 1,
}

const organisationspage: React.FC = () => {
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:600px)')
    const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)')

  

    useEffect(() => {
        dispatch(handleOrganisation(organizationRequestParams))
        // dispatch(handleCountry())
        // dispatch(handlefunctionClassification())
        // dispatch(handleStakeholder())
        // dispatch(handleHoldings())
    }, [])
  
    return (
        <Pagelayout>
            <div
                className={`${styles.common_header_component_container} ${matches ? styles.AddPadding : ''} ${
                    isMediumScreen ? styles.TopMargin : ''
                }`}
            >
                <CommonHeaderComponent
                    heading="Organisations"
                    para="An overview of all organisations"
                    goBackImg=""
                    goBackText=""
                    goBackClickHandler={()=>{}}
                />
            </div>

            <br />

            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                <OrganisationMobileTable />
            </Hidden>

            <Hidden only={['xs']}>
                {/* <div className={styles.organisations_table_container}> */}
                <OrganisationTable />
                {/* </div> */}
            </Hidden>
        </Pagelayout>
    )
}

export default organisationspage
