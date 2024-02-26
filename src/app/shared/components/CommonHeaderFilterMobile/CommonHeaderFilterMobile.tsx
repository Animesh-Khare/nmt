import React from 'react'

import styles from './CommonHeaderFilterMobile.module.css'

// images

import searchIcon from '@assets/images/searchIcon.svg'

// shared components
// import PopUp from '@shared/components/PopUp/PopUp'
// import Dropdown from '@shared/components/Dropdown/Dropdown'
// import MultiSelect from '@shared/components/MultiSelect/MultiSelect'
// import CommonInputField from '@shared/components/CommonInputField/CommonInputField'

// from material ui

// import Button from '@mui/material/Button'

interface propsType {
    placeholder: string
    onChangeHandler: (e: any) => void
    onButtonClickHandler: () => void
    btnIcon: string
}

const CommonHeaderFilterMobile: React.FC<propsType> = (props) => {
    const BtnClickHandler = (): void => {
        props.onButtonClickHandler()
    }

    return (
        <div className={styles.parent_div}>
            <div className={styles.search_bar_container}>
                <input
                    type="text"
                    placeholder={props.placeholder}
                    className={styles.input_type}
                    onChange={props.onChangeHandler}
                ></input>
                <img src={searchIcon} alt=""></img>
            </div>

            {/* <Button
                variant="contained"
                startIcon={<img src={addUser} alt=""></img>}
                className={styles.button_tag}
            ></Button> */}

            <div className={styles.button_tag} >
                <img src={props.btnIcon} alt="" onClick={BtnClickHandler}></img>
            </div>
        </div>
    )
}

export default CommonHeaderFilterMobile
