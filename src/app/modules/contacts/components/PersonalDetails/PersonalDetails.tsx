import React, { useMemo, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './PersonalDetails.module.css'

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@store/store'

// import { Button } from '@mui/material'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'

import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormikCommonRadioGroup from '@shared/components/CommonRadioGroup/FormikCommonRadioGroup'
import { handlePostPersonalInfo } from '@contacts/store/contactDetailStore/contactDetail.slice'
import { PostPersonalInfoData } from '@app-types/ContactDetailResponse.types'

import { useLocation } from 'react-router-dom'

interface PropType {
    isSubmit: boolean | number
    closeHandler: () => void
}

interface FormValues {
    GenderRadioBtn: number
    Firstname: string
    Insertion: string
    Lastname: string
}
const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/
// const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PersonalDetails: React.FC<PropType> = ({ isSubmit, closeHandler }) => {
    // debugger;
    const dispatch = useDispatch()
    const location = useLocation()
    const { idContact } = location.state
    const formikRef = useRef<FormikProps<any>>(null)

    const [firstnamevalue, setFirstnamevalue] = useState('')
    const [lastnamevalue, setLastnamevalue] = useState('')

    const contactInfoData = useSelector((state: RootState) => state.contactDetail.contactInfoData)

    const initialValues = {
        GenderRadioBtn: contactInfoData ? contactInfoData.idGender : 0,
        Firstname: contactInfoData ? contactInfoData.firstname : '',
        Insertion: contactInfoData ? contactInfoData.middlename : '',
        Lastname: contactInfoData ? contactInfoData.lastname : '',
    }

    const validationSchema = Yup.object({
        Firstname: Yup.string()
            .required('First name field required')
            .test('unique', 'first name must be unique from last name', function (value) {
                return value !== this.parent.Lastname
            }),
        Lastname: Yup.string()
            .required('Last name field required')
            .test('unique', 'last name must be unique from first name', function (value) {
                return value !== this.parent.Firstname
            }),
        Mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
        Phonenumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // // .min(12, 'Too short')
        // // .max(12, 'Too long'),
        // Emailaddress: Yup.string().matches(emailRegEx, 'Email is not valid'),
    })

    const Gender = useSelector((state: RootState) => state.contact.GenderData)

    const GenderData = Gender?.map((item) => {
        return {
            label: item.name,
            value: item.idGender,
        }
    })

    // const [value, setValue] = React.useState(`${contactInfoData ? contactInfoData.idGender : 0}`)

    // const handleChange = (value: string): void => {
    //     setValue(value)
    // }

    useMemo(() => {
        // debugger

        if (isSubmit && formikRef.current) {
            console.log('first name value =======>', firstnamevalue)
            console.log('last name value ======>', lastnamevalue)
            // if (formikRef.current) {

            // if (firstnamevalue.length > 1 && lastnamevalue.length > 1) {
            formikRef.current
                .submitForm()
                .then(() => {
                    // closeHandler();
                })
                .catch((error) => {
                    console.error('Form submission error:', error)
                })
        }
    }, [isSubmit])

    const handleSubmit = (values: any): void => {
        const initialValue: PostPersonalInfoData = {
            idPersons: idContact,
            name: `${values.Firstname} ${values.Insertion} ${values.Lastname}`,
            idGender: values.GenderRadioBtn,
        }

        dispatch(handlePostPersonalInfo(initialValue))

        closeHandler()
    }

    return (
        <div style={{ height: '350px' }}>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {(formikProps: FormikProps<FormValues>) => {
                    useEffect(() => {
                        setFirstnamevalue(formikProps.values.Firstname)
                        setLastnamevalue(formikProps.values.Lastname)
                    }, [formikProps.values.Firstname, formikProps.values.Lastname])

                    return (
                        <Form>
                            <div className={styles.makeFlexBox}>
                                <div>
                                    <div className={styles.popUp_title}>Personal information</div>

                                    <FormikCommonRadioGroup options={GenderData ?? []} name="GenderRadioBtn" />

                                    {/* <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="GenderRadioBtn"
                                //    defaultValue={`${contactInfoData ? contactInfoData.idGender : 0}`}
                                value={value}
                                onChange={(e: any) => {
                                    handleChange(e.target.value)
                                }}
                            >
                                {Gender?.map((item) => (
                                    <FormControlLabel
                                        key={item.idGender}
                                        value={`${item.idGender}`}
                                        control={<Radio size="small" />}
                                        label={item.name}
                                    />
                                ))}
                            </RadioGroup> */}

                                    <FormicCommonInputField
                                        label="First name*"
                                        placeholder="Enter first name..."
                                        name="Firstname"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                    <div style={{ width: '40%' }}>
                                        <FormicCommonInputField
                                            label="Insertion"
                                            placeholder="Enter insertion"
                                            name="Insertion"
                                            emailValid={false}
                                            isDisabled={false}
                                        />
                                    </div>

                                    <FormicCommonInputField
                                        label="Last name*"
                                        placeholder="Enter last name"
                                        name="Lastname"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                {/* <div className={styles.footer_div}>
                            <button type="submit">SAVE</button>
                        </div> */}
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default PersonalDetails
