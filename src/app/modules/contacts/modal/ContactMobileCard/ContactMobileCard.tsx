import React, { useState } from 'react'
// css
import styles from './ContactMobileCard.module.css'

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

const ContactMobileCard: React.FC<{ item: any }> = (props) => {
    const [openPopUp, setOpenPopUp] = useState(false)
    const navigate = useNavigate()

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    const nameClickHandler = (contactId: number, organisationId: number, name: string): void => {
        navigate('/contactPersonDetail', {
            state: { idContact: contactId, idOrganisation: organisationId, name: name },
        })
    }

    return (
        <div>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<img src={expandIcon} alt="expand" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div>
                        <Typography
                            className={styles.typography_tag}
                            onClick={() => {
                                nameClickHandler(props.item.contactperson, props.item.organizationid, props.item.name)
                            }}
                        >
                            {props.item.name}
                        </Typography>
                        <Typography className={styles.organization_name}> {props.item.organizationname}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails style={{ padding: '8px 1px' }}>
                    <Typography>
                        <div className={styles.accordian_grid_innercard_div}>
                            <Grid container spacing={2}>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Function
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.fuctionname}</span>
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    E-mail
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.email}</span>
                                </Grid>

                                <Grid item xs={5} className={styles.card_key_text}>
                                    Phone
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.phoneNumber}</span>
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

export default ContactMobileCard
