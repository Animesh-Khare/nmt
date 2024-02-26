import React from 'react'
import styles from './CommonInputField.module.css'


interface CommonInputFieldProps {
    label: string
    placeholder: string
    emailValid: boolean
    // onChange: (value: string, placeholder: string) => void
    // name: string
    // value: string
}

const CommonInputField: React.FC<CommonInputFieldProps> = (props) => {
    const { label, placeholder, emailValid=false } = props
    // const [field, meta] = useField(name)
    // console.log('field data-> ',field);
    // console.log('meta data-> ',meta);
    // const inputChangeHandler = (e: any): void => {
    //     props.onChange(e.target.value, props.placeholder)
    // }

    return (
        <div className={styles.container_div}>
            <label className={styles.label_tag}>{label}</label>
            <br />
            <input
                type="text"
                className={styles.input_tag}
                placeholder={placeholder}
                // onChange={(e) => {
                //     inputChangeHandler(e)
                // }}
                // {...field}
                // value={value}
            ></input>
   
            {emailValid && (
                <span className={styles.email_validation}>This email is used to authenticate the user with SSO</span>
            )}
        </div>
    )
}

export default CommonInputField
