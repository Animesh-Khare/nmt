import React from 'react'
import styles from './MembershipDetails.module.css'

// images
import search_status_icon from '@assets/images/contacts/search_status_icon.svg'
// mui
import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'

const MembershipDetails: React.FC = () => {
    const setStatusOnClickHandler = (): void => {}

    return (
        <>
            <div className={styles.card_heading}>
                <span>Membership details</span>{' '}
                <img
                    src={search_status_icon}
                    alt="status_icon"
                    onClick={setStatusOnClickHandler}
                    style={{ cursor: 'pointer' }}
                ></img>
            </div>

            <CommonCard>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Membership
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Status
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Status
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        ID
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        600.03
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Member type
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Honorary member
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Contact person
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Peter Bakker
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Advisor
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Sandra Thornhill
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Last membership visit
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        01-02-2023
                    </Grid>
                </Grid>
            </CommonCard>
        </>
    )
}

export default MembershipDetails
