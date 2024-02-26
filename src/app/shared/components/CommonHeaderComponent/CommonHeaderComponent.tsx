import React from 'react'
import styles from './CommonHeaderComponent.module.css'

interface PropsType {
    heading: string
    para: string
    goBackImg: string
    goBackText: string
    goBackClickHandler: () => void
}

const CommonHeaderComponent: React.FC<PropsType> = (props) => {


    const onClickHandler = (): void => {
        
        props.goBackClickHandler()
    }

    return (
        <div>
            <div className={styles.Users_text}>{props.heading}</div>
            <div className={styles.Manage_user_text}>{props.para}</div>
            <div className={styles.img_goBack_container} onClick={onClickHandler}>
                <img src={props.goBackImg} alt=""></img>
                <span className={styles.go_back}>{props.goBackText}</span>
            </div>
        </div>
    )
}

export default CommonHeaderComponent
