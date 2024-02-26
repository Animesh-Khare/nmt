import React from 'react'
import styles from './Dropdown.module.css'
import { useField } from 'formik'
import ValidationError from '@shared/components/ValidationError/ValidationError'

interface optionType {
    label: string
    value: number
}
interface PropsType {
    placeholder: string
    options: optionType[]
    onSelectHandler: (e: any) => void
    name: string
    isDesable?: boolean
}

const FormicDropdown: React.FC<PropsType> = ({ placeholder, options, onSelectHandler, name, isDesable = false }) => {
    const [field, meta] = useField(name)

    // const [selectedValue, setSelectedValue] = useState<any>(0)

    // console.log('selected value =>', selectedValue)

    // console.log('dropdown value', field)

    // console.log('field value ===============>', field.value)
    return (
        <>
            <select
                className={`${styles.select_tag} ${
                    field.value === 0 || field.value === '' ? styles.placeholderColor : ''
                } ${isDesable ? styles.disabled : ''}`}
                onChange={(e) => {
                    field.onChange(e)
                    onSelectHandler(e)

                    // setSelectedValue(e.target.value)
                }}
                name={name}
                // {...field}
                value={field.value}
                disabled={isDesable}
            >
                <option value={0}>{placeholder}</option>
                {options.map((item) => (
                    <option key={`dropkey-${item.value}`} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error ? <ValidationError validationMessage={meta.error} /> : null}
        </>
    )
}

export default FormicDropdown
