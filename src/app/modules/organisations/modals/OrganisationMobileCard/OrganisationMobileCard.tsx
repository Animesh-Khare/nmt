import React, { useState } from 'react'
// css
import styles from './OrganisationMobileCard.module.css'

// from material ui
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { useNavigate } from 'react-router-dom'
// images
import expandIcon from '@assets/images/UserMobileCardImages/expandIcon.svg'

// shared components
import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'

const OrganisationMobileCard: React.FC<{ item: any }> = (props) => {
    const [openPopUp, setOpenPopUp] = useState(false)
    const navigate = useNavigate()
 

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }
    
    const nameClickHandler = (idorganization:number , Name:string): void => {
        navigate('/organisationOverview', { state: { idOrganisation: idorganization , name:Name } })

      
        
    }
    return (
        <div>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<img src={expandIcon} alt="expand" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={styles.typography_tag}
                     onClick={() => {
                        nameClickHandler( props.item.idorganization , props.item.name)
                    }}
                    >{props.item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: '8px 1px' }}>
                    <Typography>
                        <div className={styles.accordian_grid_innercard_div}>
                            <Grid container spacing={2}>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Membership
                                </Grid>
                                <Grid item xs={7} className={styles.text}>
                                    {props.item.membership}
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Status membership
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.statusmembership}</span>
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Location
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.city}</span>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <AddorEditUser
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                userData={null}
                isDesktop={false}
            />
        </div>
    )
}

export default OrganisationMobileCard
