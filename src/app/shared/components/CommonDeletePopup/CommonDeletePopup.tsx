import React from 'react'
import styles from './CommonDeletePopup.module.css'

// from material ui
import Dialog from '@mui/material/Dialog'

import { Button, Drawer } from '@mui/material'

interface DeletePopUpProps {
    open: boolean
    handleClose: () => void
    name: string
    isDesktop: boolean
    onClickHandler: () => void
    actionType?: string
    // children: React.ReactNode
    // footerBtnLabel: string
    // BtnIconRequired: boolean
}

const CommonDeletePopup: React.FC<DeletePopUpProps> = ({
    onClickHandler,
    handleClose,
    actionType = 'desable',
    ...props
}) => {
    return (
        <div>
            {props.isDesktop ? (
                <Dialog onClose={handleClose} open={props.open}>
                    <div className={styles.parent_div}>
                        <div className={styles.text_container_div}>
                            {actionType === 'reactivate' ? (
                                <span className={styles.intro_heading}>Do you want to {actionType}: </span>
                            ) : (
                                <span className={styles.intro_heading}>Are you sure you want to {actionType}: </span>
                            )}
                            <span className={styles.name}>{props.name}</span>
                        </div>

                        <div className={styles.footer_div}>
                            <Button className={styles.cancel_btn} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button className={styles.disable_btn} onClick={onClickHandler}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Dialog>
            ) : (
                <Drawer anchor={'bottom'} onClose={handleClose} open={props.open}>
                    <div className={styles.parent_div}>
                        <div className={styles.text_container_div}>
                            <span className={styles.intro_heading}>Are you sure you want to {actionType}: </span>
                            <span className={styles.name}>{props.name}</span>
                        </div>

                        <div className={styles.footer_div}>
                            <Button className={styles.cancel_btn} onClick={()=>{handleClose()}}>
                                Cancel
                            </Button>
                            <Button className={styles.disable_btn} onClick={onClickHandler}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Drawer>
            )}
        </div>
    )
}

// CommonDeletePopup.defaultProps = {
//     actionType: 'Desable',
//   };

export default CommonDeletePopup