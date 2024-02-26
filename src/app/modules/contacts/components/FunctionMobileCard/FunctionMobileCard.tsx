import React, { useState } from 'react'
// css
import styles from './FunctionMobileCard.module.css'

// from material ui
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Slide, Box } from '@mui/material'

// import { useNavigate } from 'react-router-dom'

// images
import expandIcon from '@assets/images/UserMobileCardImages/expandIcon.svg'
import editIcon from '@assets/images/UserMobileCardImages/editIcon.svg'

// shared components
import { FunctionOverviewObj } from '@app-types/ContactDetailResponse.types'
import AddorEditExperience from '../AddorEditExperience/AddorEditExperience'

const FunctionMobileCard: React.FC<{ item: FunctionOverviewObj }> = (props) => {
    const [openAddExperiencePopup, setOpenAddExperiencePopup] = useState(false)
    const [editExperienceData, setEditExperienceData] = useState<FunctionOverviewObj | null>(null)
    const [expandCard, setExpandCard] = useState<any>()
    // const navigate = useNavigate()

    

    const handleAddorEditExperience = (): void => {
        setOpenAddExperiencePopup(false)
    }

    const editIconHandler = (item: any): void => {
        setEditExperienceData(item)
        setOpenAddExperiencePopup(true)
    }

    // const nameClickHandler = (contactId: number, organisationId: number, name: string): void => {
    //     navigate('/contactPersonDetail', {
    //         state: { idContact: contactId, idOrganisation: organisationId, name: name },
    //     })
    // }

    return (
        <div>
            <Accordion
                expanded={expandCard === props.item.idfunction}
                style={{ boxShadow: 'none' }}
                onChange={() => {
                    setExpandCard(expandCard !== props.item.idfunction ? props.item.idfunction : null)
                }}
            >
                <AccordionSummary
                    expandIcon={
                        expandCard !== props.item.idfunction ? (
                            <img src={expandIcon} alt="expand" />
                        ) : (
                            <Slide
                                in={expandCard === props.item.idfunction}
                                direction="left"
                                // container={containerRef.current}
                                timeout={500}
                            >
                                <Box>
                                    {/* <IconButton> */}
                                    <img
                                        src={editIcon}
                                        alt=""
                                        className={styles.card_inside_icon}
                                        onClick={() => {
                                            editIconHandler(props.item)
                                        }}
                                    ></img>
                                    {/* </IconButton> */}
                                </Box>
                            </Slide>
                        )
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div>
                        <Typography
                            className={styles.typography_tag}
                            onClick={() => {
                                // nameClickHandler(props.item.contactperson, props.item.organizationid, props.item.name)
                            }}
                        >
                            {props.item.functionName}
                        </Typography>
                        <Typography className={styles.organization_name}>{props.item.organization}</Typography>
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
                                    <span className={styles.text}>{props.item.functionName}</span>
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Function level
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.functionlevel}</span>
                                </Grid>

                                <Grid item xs={5} className={styles.card_key_text}>
                                    Function class.
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{/* {props.item.phoneNumber} */}</span>
                                </Grid>

                                <Grid item xs={5} className={styles.card_key_text}>
                                    Start date
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.startdate}</span>
                                </Grid>

                                <Grid item xs={5} className={styles.card_key_text}>
                                    End date
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.text}>{props.item.enddate}</span>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <AddorEditExperience
                openPopUp={openAddExperiencePopup}
                handleClose={handleAddorEditExperience}
                experienceData={editExperienceData}
                isDesktop={false}
            />
        </div>
    )
}

export default FunctionMobileCard
