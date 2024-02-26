import React from 'react'
import styles from './SearchBar.module.css'

// images
import searchIcon from '@assets/images/searchIcon.svg'


interface propsType{
    placeholder: string,
    onChangeHandler : (e:any)=>void
    value?:string
    name?:string
}

const SearchBar: React.FC<propsType> = ({placeholder, onChangeHandler,value,name}) => {
    return (
        <div className={styles.search_bar_container}>
            <input type="text" placeholder={placeholder} className={styles.input_type} onChange={onChangeHandler} value={value} name={name}></input>
            <img src={searchIcon} alt=""></img>
        </div>
    )
}

export default SearchBar
