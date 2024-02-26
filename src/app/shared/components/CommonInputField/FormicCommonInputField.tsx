import React from 'react'
import styles from './CommonInputField.module.css'
import ValidationError from '@shared/components/ValidationError/ValidationError'
import { useField } from 'formik'
import { zipcodeRequestParam } from '@app-types/OrganisationResponse.types'
import { handleZipCode } from '@organisations/store/organisation.slice'
import { useDispatch } from 'react-redux'
// import classNames from 'classnames';

interface CommonInputFieldProps {
    label: string
    placeholder: string
    emailValid: boolean
    // onChange: (value: string, placeholder: string) => void
    name: string
    // value: string
    isDisabled: boolean
}

const FormicCommonInputField: React.FC<CommonInputFieldProps> = (props) => {
    const { label, placeholder, emailValid = false, name, isDisabled } = props

    const dispatch = useDispatch()

    const [field, meta] = useField(name)

    // console.log('name ============>', name)

    // console.log('field data from common input field ----> ', field)

    const handleBlurEvent = (event: any): void => {
        const countryapiId = localStorage.getItem('idCountry')

        const zipcode = localStorage.getItem('Visitorzipcode')
        const num = localStorage.getItem('Visitornumber')

        if (countryapiId === '1' && zipcode && num ) {
            const zipcodeRequestParam: zipcodeRequestParam = {
                zipcode: zipcode ?? '',
                houseNo: Number(num),
            }   

            dispatch(handleZipCode(zipcodeRequestParam))
        }
      
    }

    return (
        <div className={styles.container_div}>
            <label className={styles.label_tag}>{label}</label>
            <br />
            <input
                type="text"
                className={`${styles.input_tag} ${isDisabled ? styles.disable : ''}`}
                // className={classNames(styles.input_tag, {
                //     'dis': isDisabled,
                //   })}
                placeholder={placeholder}
                disabled={isDisabled}
                // onChange={(e) => {
                //     inputChangeHandler(e)
                // }}
                {...field}
                onBlur={handleBlurEvent}

                // value={value}
            ></input>
            {meta.touched && meta.error ? <ValidationError validationMessage={meta.error} /> : null}
            {/* <br /> */}
            {emailValid && (
                <span className={styles.email_validation}>This email is used to authenticate the user with SSO</span>
            )}
        </div>
    )
}

export default FormicCommonInputField
