import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ContactOrganization.module.css'

import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'

import buildingImg from '@assets/images/contacts/buildings.svg'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface propType {
    OrganisationId?: number
    Name?: string
}
const ContactOrganization: React.FC<propType> = ({ OrganisationId, Name }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const organisationDetail = useSelector((state: RootState) => state.contactDetail.organisationDetailData)
    const organisationName= organisationDetail?.orgname
    const organisationAddress = useSelector((state: RootState) => state.contactDetail.organisationDetailData?.address)

 

    const ClickHandlerForOrganisation = (idorganization: number, Name: string): void => {
        navigate('/organisationOverview', { state: { idOrganisation: idorganization, name: Name } })

       
    }  
    return (
        <div className={styles.card}>
            <div className={styles.card_heading}>Organisation details</div>
            <CommonCard>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Organisation
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Name
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div
                            className={styles.img_text_container}
                            onClick={() => {
                                if (OrganisationId && organisationName) {
                                    ClickHandlerForOrganisation(OrganisationId,organisationName);
                                }
                            }}
                        >
                            {organisationDetail?.orgname && <img src={buildingImg} alt=""></img>}{' '}
                            <span style={{ color: '#EE7000' }}>{organisationDetail?.orgname}</span>
                        </div>
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Address
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div className={`${styles.organisation_address} ${isMobile ? styles.mobile : ''}`}>
                            {' '}
                            {/* {organisationAddress?.idAddress ?? ''} */}
                            {/* <br /> */}
                            {organisationAddress?.streetName ?? ''}&nbsp;
                            {organisationAddress?.number ?? ''}
                            <br />
                            {organisationAddress?.zipcode ?? ''} &nbsp;
                            {organisationAddress?.addition ?? ''} &nbsp;
                            {organisationAddress?.city ?? ''}
                            <br />
                            {organisationAddress?.country ?? ''}
                        </div>
                    </Grid>
                </Grid>
            </CommonCard>
        </div>  
    )
}

export default ContactOrganization
