import React from 'react'

// packages
// import { useDispatch } from 'react-redux'

// from material ui
import Dialog from '@mui/material/Dialog'
import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'

// css
import styles from './PopUp.module.css'

// images
import closeIcon from '@assets/images/PopUpImages/closeIcon.svg'
// import addUser from '@assets/images/addUser.svg'

// from slice
// import { handleAddUser } from '@users/store/user.slice'

interface PopUpProps {
    open: boolean
    handleClose: () => void
    headerLabel: string
    children: React.ReactNode
    footerBtnLabel: string
    BtnIconRequired: boolean
    isDesktop: boolean
    submitHandler: () => void
    isMember: boolean
}

const PopUp: React.FC<PopUpProps> = ({
    open,
    handleClose,
    headerLabel,
    children,
    footerBtnLabel,
    BtnIconRequired,
    isDesktop,
    submitHandler,
    isMember,
}) => {
    // const dispatch = useDispatch()

    // const postNewuser: {
    //     fullName: string
    //     email: string
    //     roleId: number
    //     message: string
    //     roles: [
    //         {
    //             role: number
    //         }
    //     ]
    // } = {
    //     fullName: props.name,
    //     email: props.email,
    //     roleId: 0,
    //     message: 'string',
    //     roles: [
    //         {
    //             role: 0,
    //         },
    //     ],
    // }

    // const closePopupHandler = (): void => {
    //     props.handleClose()
    // }

    // const btnClickHandler = (): void => {
    //     console.log('btn clicked handler')

    //     dispatch(handleAddUser(postNewuser))
    // }
   
    return (
        <div>
            {isDesktop ? (
                <Dialog open={open}>
                    <div className={styles.parent_div} style={{ width: isMember?'600px':'450px' }}>
                        <div className={styles.header_div}>
                            <span className={styles.create_user_text}>{headerLabel}</span>
                            <img src={closeIcon} alt="" onClick={handleClose} style={{ cursor: 'pointer' }}></img>
                        </div>
                        {children}
                    </div>
                </Dialog>
            ) : (
                <Drawer anchor={'bottom'} onClose={handleClose} open={open}>
                    <div className={styles.parent_div}>
                        <div className={styles.header_div}>
                            <span className={styles.create_user_text}>{headerLabel}</span>
                            <img src={closeIcon} alt="" onClick={handleClose} style={{ cursor: 'pointer' }}></img>
                        </div>

                        {children}

                        {/* <div className={styles.footer_div}>
                            <span className={styles.cancel_btn} onClick={handleClose}>
                                Cancel
                            </span>

                            <Button
                                variant="contained"
                                startIcon={BtnIconRequired && <img src={addUser} alt=""></img>}
                                className={styles.button_tag}
                                onClick={submitHandler}
                                type='submit'
                            >
                                {footerBtnLabel}
                            </Button>
                        </div> */}
                    </div>
                </Drawer>
            )}
        </div>
    )
}

export default PopUp
