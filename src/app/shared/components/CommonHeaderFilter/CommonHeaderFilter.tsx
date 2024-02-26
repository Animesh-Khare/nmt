import React from 'react'
import styles from './CommonHeaderFilter.module.css'

// images
import filterIcon from '@assets/images/filterIcon.svg'
import searchIcon from '@assets/images/searchIcon.svg'

// from material ui
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'


interface propsType {
    showFilterHandler: () => void
    placeholder: string
    onChangeHandler: (e: any) => void
    onButtonClickHandler : () => void
    btnLable: string
    btnIcon: string
}  

const CommonHeaderFilter: React.FC<propsType> = (props) => {

    const filterIconHandler = (): void => {
        props.showFilterHandler()
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

            <IconButton color="primary" aria-label="add to shopping cart" onClick={filterIconHandler}>
                <img src={filterIcon} alt="" className={styles.filter_icon}></img>
            </IconButton>

            <Button
                variant="contained"
                startIcon={<img src={props.btnIcon} alt=""></img>}
                className={styles.button_tag}
                onClick={props.onButtonClickHandler}
            >
                {props.btnLable}
            </Button>

        </div>
    )
}

export default CommonHeaderFilter
