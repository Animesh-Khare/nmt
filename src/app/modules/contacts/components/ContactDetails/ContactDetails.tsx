import React, { useRef, useMemo } from 'react'
import styles from './ContactDetails.module.css'

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
// import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
// import FormicSwitch from '@shared/components/Switch/FormicSwitch'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { handlePostContactDetail } from '@contacts/store/contactDetailStore/contactDetail.slice'
import { PostContactDetailData } from '@app-types/ContactDetailResponse.types'

import { useLocation } from 'react-router-dom'

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface PropType {
    isSubmit: boolean | number
    closeHandler: () => void
}
const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/
const ContactDetails: React.FC<PropType> = ({ isSubmit, closeHandler }) => {
    const location = useLocation()
    const { idContact } = location.state
    const formikRef = useRef<FormikProps<any>>(null)

    const dispatch = useDispatch()
    const contactInfoData = useSelector((state: RootState) => state.contactDetail.contactInfoData)

  

    const initialValues = {
        Mobile: contactInfoData ? contactInfoData.mobile : '',
        Phonenumber: contactInfoData ? contactInfoData.phoneNumber : '',
        Emailaddress: contactInfoData ? contactInfoData.email : '',
        InviteToEvents: contactInfoData ? contactInfoData.events : false,
        Clipper: contactInfoData ? contactInfoData.clipper : false,
        Magazine: contactInfoData ? contactInfoData.magazine : false,
    }

    const validationSchema = Yup.object({
        Phonenumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        Mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
        Emailaddress: Yup.string().matches(emailRegEx, 'Email is not valid').required('Required'),
    })

    useMemo(() => {
        if (isSubmit && formikRef.current) {
            // if (formikRef.current) {
            formikRef.current
                .submitForm()
                .then(() => {
                    // debugger
                    // closeHandler();
                })
                .catch((error) => {
                    console.error('Form submission error:', error)
                })
            //   }
            // closeHandler()
        }
    }, [isSubmit])

    const handleSubmit = (values: any): void => {
        
        const initialPostContactDetail: PostContactDetailData = {
            idPersons: idContact,
            mobile: values.Mobile,
            phoneNumber: values.Phonenumber,
            email: values.Emailaddress,
        }

        dispatch(handlePostContactDetail(initialPostContactDetail))
        closeHandler()
    }

    return (
        <div style={{ height: '350px'}}>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
                style={{ border: '2px solid red' }}
            >
                <Form>
                    <div className={styles.popUp_title}>Contact details</div>

                    <FormicCommonInputField
                        label="Mobile"
                        placeholder="Enter mobile number..."
                        name="Mobile"
                        emailValid={false}
                        isDisabled={false}
                    />

                    <FormicCommonInputField
                        label="Phone number"
                        placeholder="Enter phone number"
                        name="Phonenumber"
                        emailValid={false}
                        isDisabled={false}
                    />

                    <FormicCommonInputField
                        label="Email address*"
                        placeholder="Enter email address..."
                        name="Emailaddress"
                        emailValid={false}
                        isDisabled={false}
                    />

                    {/* <div>
                    <div className={styles.preferences_text}>Preferences</div>
                    <FormicSwitch placeholder="Invite to events" name="InviteToEvents" />
                    <FormicSwitch placeholder="Clipper" name="Clipper" />
                    <FormicSwitch placeholder="Magazine (print)" name="Magazine" />
                </div> */}

                    {/* <div className={styles.footer_div}>
                    <button type="submit">save</button>
                </div> */}
                </Form>
            </Formik>
        </div>
    )
}

export default ContactDetails
