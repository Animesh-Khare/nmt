import React, { useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './OrganisationDetails.module.css'

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@store/store'

// import { Button } from '@mui/material'
import { Hidden } from '@mui/material'
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import { handlePostOrganisationContactInfoData } from '@organisations/store/organisation.slice'
import { PutOrganisationalDataParam } from '@app-types/OrganisationResponse.types'
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/
interface PropType {
    isSubmit: boolean | number
    closeHandler: () => void
    OrganisationId: number
}
const OrganisationDetails: React.FC<PropType> = ({ isSubmit, closeHandler, OrganisationId }) => {
    const dispatch = useDispatch()
    const formikRef = useRef<FormikProps<any>>(null)
    const OrganisationInfoData = useSelector((state: RootState) => state.organisation.OrganisationContactInfoData)
    const holdingsData = useSelector((state: RootState) => state.contact.HoldingsData)

    const MultiSelectHoldingData = holdingsData?.map((item) => {
        return {
            label: item.name,
            value: item.idOrganization,
        }
    })

    const initialValues = {
        Name: OrganisationInfoData ? OrganisationInfoData.name : '',
        Email: OrganisationInfoData ? OrganisationInfoData.email : '',
        InvoiceEmail: OrganisationInfoData ? OrganisationInfoData.invoiceMail : '',
        PhoneNumber: OrganisationInfoData ? OrganisationInfoData.phoneNumber : '',
        Holding: OrganisationInfoData ? OrganisationInfoData.idHolding : 0,
        OAndoFund: OrganisationInfoData ? OrganisationInfoData.oOfund : '',
    }

    const validationSchema = Yup.object({
        Name: Yup.string().required('Name field required'),
        // Mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
        // PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // .min(12, 'Too short')
        // .max(12, 'Too long'),
        PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        Email: Yup.string().matches(emailRegEx, 'Email is not valid'),
        InvoiceEmail: Yup.string().matches(emailRegEx, 'Email is not valid'),

        // Holding: Yup.number()
        //     .required('Holding is required')
        //     .test('notZero', 'Please select a holding', (value) => value !== 0),
    })

    // const handleChange = (value: string): void => {
    //     setValue(value)
    //     console.log('type of ==>', typeof value)
    // }

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
        const initialValue: PutOrganisationalDataParam = {
            id: OrganisationId,
            name: values.Name,
            phoneNumber: values.PhoneNumber,
            organizationEmail: values.Email,
            invoiceEmail: values.InvoiceEmail,
            holding: values.Holding,
            oOfund: values.OAndoFund,
        }

       
        dispatch(handlePostOrganisationContactInfoData(initialValue))
        closeHandler()
    }

    return (
        <div style={{ height: '350px' }}>
            <div>
                <span className={styles.popUp_title}> Organisation information</span>
            </div>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <Form>
                    <Hidden only={['xs']}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            <div style={{ width: '45%' }}>
                                <div>
                                    <FormicCommonInputField
                                        label="Name*"
                                        placeholder="Enter name..."
                                        name="Name"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="E-mail"
                                        placeholder="Enter email..."
                                        name="Email"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Invoice e-mail"
                                        placeholder="Enter invoice e-mail..."
                                        name="InvoiceEmail"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>

                                <div>
                                    <FormicCommonInputField
                                        label="Phone number"
                                        placeholder="Enter phone number..."
                                        name="PhoneNumber"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div style={{ width: '45%' }}>
                                <div className={styles.container_div}>
                                    <label className={styles.label_tag}>Holding</label>
                                    <br />
                                    <FormicDropdown
                                        placeholder="Select holding..."
                                        options={MultiSelectHoldingData ?? []}
                                        onSelectHandler={() => {}}
                                        name="Holding"
                                        isDesable={false}
                                    />
                                </div>

                                <div>
                                    <FormicCommonInputField
                                        label="O&O Fund"
                                        placeholder="Enter 0&0 fund..."
                                        name="OAndoFund"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </Hidden>
                    <Hidden only={['lg', 'md', 'xl', 'sm']}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <FormicCommonInputField
                                        label="Name*"
                                        placeholder="Enter name..."
                                        name="Name"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="E-mail"
                                        placeholder="Enter email..."
                                        name="Email"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Invoice e-mail"
                                        placeholder="Enter invoice email..."
                                        name="InvoiceEmail"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>

                                <div>
                                    <FormicCommonInputField
                                        label="Phone number"
                                        placeholder="Enter phone number..."
                                        name="PhoneNumber"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className={styles.container_div}>
                                    <label className={styles.label_tag}>Holding*</label>
                                    <br />
                                    <FormicDropdown
                                        placeholder="Select Organisation..."
                                        options={MultiSelectHoldingData ?? []}
                                        onSelectHandler={() => {}}
                                        name="Holding"
                                        isDesable={false}
                                    />
                                </div>

                                <div>
                                    <FormicCommonInputField
                                        label="O&O Fund"
                                        placeholder="Enter o&o fund..."
                                        name="OAndoFund"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </Hidden>
                </Form>
            </Formik>
        </div>
    )
}

export default OrganisationDetails
