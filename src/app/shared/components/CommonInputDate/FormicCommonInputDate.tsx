import React from 'react'

import styles from './FormikCommonInputDate.module.css'

import ValidationError from '@shared/components/ValidationError/ValidationError'
import { useField } from 'formik'

interface CommonInputDateProps {
    label: string
    name: string
}

const FormicCommonInputDate: React.FC<CommonInputDateProps> = (props) => {
    const { label, name } = props

    const [field, meta] = useField(name)
    // console.log('field data-> ', field)
    // console.log('meta data-> ', meta)
    // console.log('field value ===>', field.value)


    
    return (
        <div className={styles.container_div}>
            <div className={styles.preferences_text}>{label}</div>
            <input type="date" {...field} className={styles.date_tag} value={field.value} ></input>
            {meta.touched && meta.error ? <ValidationError validationMessage={meta.error} /> : null}
        </div>
    )
}

export default FormicCommonInputDate
