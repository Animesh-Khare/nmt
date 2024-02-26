import React from 'react'
import styles from './ContributionDetails.module.css'

// images

// mui
import CommonCard from '@shared/components/CommonCard/CommonCard'
import Grid from '@mui/material/Grid'

const ContributionDetails: React.FC = () => {
    return (
        <>
            <div className={styles.card_heading}>
                <span>General details</span>{' '}
            </div>

            <CommonCard>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} className={styles.grid_heading}>
                        Contribution
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Contact person
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Iris van der Sluis
                    </Grid>
                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Holding pays contribution
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Ferus Smit
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Exempt from contribution
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        No
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Excempt from submitting statement
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Yes
                    </Grid>

                    <Grid item xs={6} md={4} className={styles.grid_title}>
                        Status statement
                    </Grid>
                    <Grid item xs={6} md={8} className={styles.grid_value}>
                        Definitive
                    </Grid>
                </Grid>
            </CommonCard>
        </>
    )
}

export default ContributionDetails
