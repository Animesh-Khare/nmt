import React, { useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './AddressDetails.module.css'

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@store/store'

// import { Button } from '@mui/material'

import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
// import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'
import { handlePostOrganisationAddressData } from '@organisations/store/organisation.slice'
import { PutOrganisationAddressParam } from '@app-types/OrganisationResponse.types'
import { Hidden } from '@mui/material'
interface PropType {
    isSubmit: boolean | number
    closeHandler: () => void
    OrganisationId: number
}
const AddressDetails: React.FC<PropType> = ({ isSubmit, closeHandler, OrganisationId }) => {
    const isAddressSimilar = useSelector(
        (state: RootState) => state.organisation.OrganisationContactInfoData?.sameAddress
    )
    const [isAddressSame, setIsAddressSame] = useState(isAddressSimilar ?? false)
    const handleSwitchToggle = (value: boolean): void => {
        setIsAddressSame(value)
    }
    const dispatch = useDispatch()
    const formikRef = useRef<FormikProps<any>>(null)

    const OrganisationAddressInfoData = useSelector(
        (state: RootState) => state.organisation.OrganisationContactInfoData
    )

    const initialValues = {
        visitorCountry: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.country : '',
        visitorZipCode: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.zipcode : '',
        visitorNumber: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.number : '',
        visitorAddition: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.addition : '',
        visitorStreetName: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.streetName : '',
        visitorCity: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.city : '',
        visitorIdAddress: OrganisationAddressInfoData ? OrganisationAddressInfoData.visitorAddress?.idAddress : '',

        postalCountry: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.country : '',
        postalZipCode: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.zipcode : '',
        postalNumber: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.number : '',
        postalAddition: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.addition : '',
        postalStreetName: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.streetName : '',
        postalCity: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.city : '',
        postalIdAddress: OrganisationAddressInfoData ? OrganisationAddressInfoData.postalAddress?.idAddress : '',

        isAddressSame: OrganisationAddressInfoData ? OrganisationAddressInfoData.sameAddress : false,
    }

    const validationSchema = Yup.object({
        visitorCountry: Yup.string()
            .required('Country field required')
            .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
        postalCountry: Yup.string()
            .required('Country field required')
            .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
        visitorZipCode: Yup.string().required('ZIP code field required'),
        postalZipCode: Yup.string().required('ZIP code field required'),
        visitorNumber: Yup.string().required('Number field required').matches(/^\d+$/, 'Only numbers are allowed'),
        postalNumber: Yup.string().required('Number field required').matches(/^\d+$/, 'Only numbers are allowed'),
        visitorCity: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
        postalCity: Yup.string().matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),
        // Lastname: Yup.string().required('Last name field required'),
        // Mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
        // Phonenumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // // .min(12, 'Too short')
        // // .max(12, 'Too long'),
        // Emailaddress: Yup.string().matches(emailRegEx, 'Email is not valid'),
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
        const initialValue: PutOrganisationAddressParam = {
            organization: OrganisationId,
            postalAddress: {
                idAddress: values.postalIdAddress,
                country: values.postalCountry,
                zipcode: values.postalZipCode,
                city: values.postalCity,
                streetName: values.postalStreetName,
                number: values.postalNumber,
                addition: values.postalAddition,
            },
            visitorAddress: {
                idAddress: values.visitorIdAddress,
                country: values.visitorCountry,
                zipcode: values.visitorZipCode,
                city: values.visitorCity,
                streetName: values.visitorStreetName,
                number: values.visitorNumber,
                addition: values.visitorAddition,
            },
            sameAddress: values.isAddressSame,
        }

        dispatch(handlePostOrganisationAddressData(initialValue))
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
                {(formikProps: FormikProps<any>) => {
                    if (formikProps.values.isAddressSame) {
                        formikProps.values.postalCountry = formikProps.values.visitorCountry
                        formikProps.values.postalZipCode = formikProps.values.visitorZipCode
                        formikProps.values.postalNumber = formikProps.values.visitorNumber
                        formikProps.values.postalAddition = formikProps.values.visitorAddition
                        formikProps.values.postalStreetName = formikProps.values.visitorStreetName
                        formikProps.values.postalCity = formikProps.values.visitorCity
                        formikProps.values.postalIdAddress = formikProps.values.visitorIdAddress
                    }

                    return (
                        <Form>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                <Hidden only={['xs']}>
                                    <div style={{ width: '45%' }}>
                                        <div>
                                            <span className={styles.Title}>Visitor address</span>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Country*"
                                                placeholder="Enter country"
                                                name="visitorCountry"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="ZIP code*"
                                                placeholder="Enter zip code"
                                                name="visitorZipCode"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Number*"
                                                    placeholder="Enter number"
                                                    name="visitorNumber"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Addition"
                                                    placeholder="Enter addition"
                                                    name="visitorAddition"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="Street name"
                                                placeholder="Enter street name"
                                                name="visitorStreetName"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="City"
                                                placeholder="Enter city"
                                                name="visitorCity"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                </Hidden>

                                <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                    <div style={{ width: '100%' }}>
                                        <div>
                                            <span className={styles.Title}>Visitor address</span>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Country*"
                                                placeholder="Enter country"
                                                name="visitorCountry"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="ZIP code*"
                                                placeholder="Enter zip code"
                                                name="visitorZipCode"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Number*"
                                                    placeholder="Enter number"
                                                    name="visitorNumber"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Addition"
                                                    placeholder="Enter addition"
                                                    name="visitorAddition"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="Street name"
                                                placeholder="Enter street name"
                                                name="visitorStreetName"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="City"
                                                placeholder="Enter city"
                                                name="visitorCity"
                                                emailValid={false}
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                </Hidden>

                                <Hidden only={['xs']}>
                                    <div style={{ width: '45%' }}>
                                        <div>
                                            <span className={styles.Title}>Postal address</span>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Country*"
                                                placeholder="Enter country"
                                                name="postalCountry"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="ZIP code*"
                                                placeholder="Enter zip code"
                                                name="postalZipCode"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Number*"
                                                    placeholder="Enter number"
                                                    name="postalNumber"
                                                    emailValid={false}
                                                    isDisabled={isAddressSame}
                                                />
                                            </div>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Addition"
                                                    placeholder="Enter addition"
                                                    name="postalAddition"
                                                    emailValid={false}
                                                    isDisabled={isAddressSame}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Street name"
                                                placeholder="Enter street name"
                                                name="postalStreetName"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="City"
                                                placeholder="Enter city"
                                                name="postalCity"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>
                                    </div>
                                </Hidden>
                                <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                    <div style={{ width: '100%' }}>
                                        <div>
                                            <FormicSwitch
                                                placeholder="Postal address is the same as visitor address"
                                                name="isAddressSame"
                                                onToggle={handleSwitchToggle}
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <span className={styles.Title}>Postal address</span>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Country*"
                                                placeholder="Enter country"
                                                name="postalCountry"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="ZIP code*"
                                                placeholder="Enter zip code"
                                                name="postalZipCode"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Number*"
                                                    placeholder="Enter number"
                                                    name="postalNumber"
                                                    emailValid={false}
                                                    isDisabled={isAddressSame}
                                                />
                                            </div>
                                            <div style={{ width: '40%' }}>
                                                <FormicCommonInputField
                                                    label="Addition"
                                                    placeholder="Enter addition"
                                                    name="postalAddition"
                                                    emailValid={false}
                                                    isDisabled={isAddressSame}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <FormicCommonInputField
                                                label="Street name"
                                                placeholder="Enter street name"
                                                name="postalStreetName"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>

                                        <div>
                                            <FormicCommonInputField
                                                label="City"
                                                placeholder="Enter city"
                                                name="postalCity"
                                                emailValid={false}
                                                isDisabled={isAddressSame}
                                            />
                                        </div>
                                    </div>
                                </Hidden>
                                <Hidden only={['xs']}>
                                    <div>
                                        <FormicSwitch
                                            placeholder="Postal address is the same as visitor address"
                                            name="isAddressSame"
                                            onToggle={handleSwitchToggle}
                                        />
                                    </div>
                                </Hidden>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddressDetails
