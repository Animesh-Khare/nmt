import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// css
import styles from './UserMobileCard.module.css'

// from material ui
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Slide, Box } from '@mui/material'

// images
import expandIcon from '@assets/images/UserMobileCardImages/expandIcon.svg'
import deleteIcon from '@assets/images/UserMobileCardImages/deleteIcon.svg'
import editIcon from '@assets/images/UserMobileCardImages/editIcon.svg'

// shared components
import CommonDeletePopup from '@shared/components/CommonDeletePopup/CommonDeletePopup'
import { userdisplay } from '@app-types/UserResponse.types'
import { handleDeleteUser } from '@users/store/user.slice'
import AddorEditUser from '@users/components/AddorEditUser/AddorEditUser'

interface userData {
    idUser: number
    userName: string
}

interface userData {
    idUser: number
    userName: string
}

const UserMobileCard: React.FC<{ item: any }> = (props) => {
    const [openPopUp, setOpenPopUp] = useState(false)
    const dispatch = useDispatch()
    const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
    const [deleteUserData, setDeleteUserData] = useState<userData | null>(null)
    const [editUserData, setEditUserData] = useState<userdisplay | null>(null)
    const [expandCard, setExpandCard] = useState()

    const editIconHandler = (item: any): void => {
        setEditUserData(item)
        setOpenPopUp(true)
    }

    const addOrEditDialogHandler = (): void => {
        setOpenPopUp(false)
    }

    const deleteIconHandler = (item: userdisplay): void => {
        setDeleteUserData({ idUser: item.idUser, userName: item.fullName })
        setOpenDeletePopUp(true)
    }

    const closeDeletePopUpHandler = (): void => {
        setOpenDeletePopUp(false)
    }

    const onDeleteHandler = (): void => {
        dispatch(handleDeleteUser(deleteUserData?.idUser ?? 0))
        setOpenDeletePopUp(false)
    }

    return (
        <div>
            {/* <Accordion style={{ boxShadow: 'none' }}> */}

            <Accordion
                expanded={expandCard === props.item.idUser}
                style={{ boxShadow: 'none' }}
                onChange={() => {
                    setExpandCard(expandCard !== props.item.idUser ? props.item.idUser : null)
                }}
            >
                <AccordionSummary
                    // expandIcon={<img src={expandIcon} alt="expand" />}

                    expandIcon={
                        expandCard !== props.item.idUser ? (
                            <img src={expandIcon} alt="expand" />
                        ) : (
                            <Slide
                                in={expandCard === props.item.idUser}
                                direction="left"
                                // container={containerRef.current}
                                timeout={500}
                            >
                                <Box>
                                    {/* <IconButton> */}
                                    <img
                                        src={deleteIcon}
                                        alt=""
                                        className={styles.card_inside_icon}
                                        onClick={() => {
                                            deleteIconHandler(props.item)
                                        }}
                                    ></img>
                                    {/* </IconButton> */}
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
                    <Typography className={styles.typography_tag}>{props.item.fullName}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: '8px 1px' }}>
                    <Typography>
                        <div className={styles.accordian_grid_innercard_div}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12}>
                                    <div className={styles.inside_icon_container}>
                                        <img
                                            src={deleteIcon}
                                            alt=""
                                            className={styles.card_inside_icon}
                                            onClick={() => {
                                                deleteIconHandler(props.item)
                                            }}
                                        ></img>
                                        <img
                                            src={editIcon}
                                            alt=""
                                            className={styles.card_inside_icon}
                                            onClick={() => {
                                                editIconHandler(props.item)
                                            }}
                                        ></img>
                                    </div>
                                </Grid> */}
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Email
                                </Grid>
                                <Grid item xs={7} className={styles.email_value}>
                                    {props.item.email}
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Role
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.card_items}>{props.item.userRoles}</span>
                                </Grid>
                                <Grid item xs={5} className={styles.card_key_text}>
                                    Authorization
                                </Grid>
                                <Grid item xs={7}>
                                    <span className={styles.authorization_text}>{props.item.authorization}</span>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <AddorEditUser
                openPopUp={openPopUp}
                handleClose={addOrEditDialogHandler}
                userData={editUserData}
                isDesktop={false}
            />

            <CommonDeletePopup
                open={openDeletePopUp}
                handleClose={closeDeletePopUpHandler}
                name={deleteUserData?.userName ?? ''}
                isDesktop={false}
                onClickHandler={onDeleteHandler}
            />
        </div>
    )
}

export default UserMobileCard
