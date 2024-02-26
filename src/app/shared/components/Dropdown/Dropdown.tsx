import React, { useState } from 'react'
import styles from './Dropdown.module.css'

interface optionType {
    label: string
    value: number
}
interface PropsType {
    placeholder: string
    options: optionType[]
    onSelectHandler: (e: any) => void
}

const Dropdown: React.FC<PropsType> = ({ placeholder, options, onSelectHandler }) => {
    const [dropdownvalue, setDropdownvalue] = useState<any>(0)

    return (
        <>
            <select
                className={`${styles.select_tag} ${dropdownvalue === 0 ? styles.filterPlaceholder : ''}`}
                onChange={(e) => {
                    setDropdownvalue(e.target.value)
                    onSelectHandler(e)
                }}
                // name={name}
                // {...field}
                // value={field.value}
            >
                <option value={0}>{placeholder}</option>
                {options?.map((item) => (
                    <option key={`dropkey-${item.value}`} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default Dropdown
