import React, { useState } from 'react'
import styles from './MembershipDetails.module.css'

import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'
import AddMembership from '../AddMembership/AddMembership'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { NimbleButton } from 'nimble-design-system'

interface PropType {
    OrganisationId: number
}

const MembershipDetails: React.FC<PropType> = ({ OrganisationId }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [openPopup, setOpenPopup] = useState(false)
    const onButtonClickHandler = (): void => {
        setOpenPopup(true)
    }
    const addOrEditDialogHandler = (): void => {
        setOpenPopup(false)
    }

    // const organisationDetail = useSelector((state: RootState) => state.contactDetail.organisationDetailData) ignore this

    return (
        <div className={styles.card}>
            <div className={styles.card_heading}>Membership details</div>
            <CommonCard>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Membership
                    </Grid>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        <NimbleButton
                            label="Add membership"
                            onClick={onButtonClickHandler}
                            size="small"
                            variant="contained"
                        />
                    </Grid>
                    {/* <Grid item xs={4} md={4} className={styles.grid_title}>
                        Name
                    </Grid>
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <img src={buildingImg} alt=""></img> {organisationDetail?.orgname}
                    </Grid>
                    <Grid item xs={4} md={4} className={styles.grid_title}>
                        Address
                    </Grid> */}
                    <Grid item xs={8} md={8} className={styles.grid_value}>
                        <div className={`${styles.organisation_address} ${isMobile ? styles.mobile : ''}`}> </div>
                    </Grid>
                </Grid>
            </CommonCard>
            <AddMembership
                openPopUp={openPopup}
                handleClose={addOrEditDialogHandler}
                isDesktop={!isMobile}
                organisationId={OrganisationId}
            />
        </div>
    )
}

export default MembershipDetails
