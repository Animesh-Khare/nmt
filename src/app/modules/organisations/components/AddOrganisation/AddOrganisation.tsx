import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './AddOrganisation.module.css'

// packages
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

// from material ui
import { Button, Hidden } from '@mui/material'
// import Switch from '@mui/material/Switch'
// import { makeStyles } from '@material-ui/core/styles';

// shared components
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'
import PopUp from '@shared/components/PopUp/PopUp'
import Steps from '@shared/components/Stepper/Steps'
import SingleSelect from '@shared/components/MultiSelect/SingleSelect'
import { PostOrganizationBodyParam } from '@app-types/OrganisationResponse.types'

import { handlePostOrganization, handleCountry, handleStakeholder } from '@organisations/store/organisation.slice'
import { handleHoldings, handlefunctionClassification } from '@contacts/store/contactStore/contact.slice'
import { RootState } from '@store/store'
// import axios from 'axios'

// const phoneRegExp = /^(?:\+\d{2}\d{9}|\(\d{1,}\)\d{9}|\+\d{9})$/
const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface propType {
    openPopUp: boolean
    handleClose: () => void
    isDesktop: boolean
}

interface optionType {
    label: string
    value: number
}

interface FormValues {
    companyName: string
    phoneNumber: string
    organizationEmail: string
    invoiceEmail: string
    idStakeHolder: number
    holding: number
    oOfund: string

    Visitoraddition: string
    Visitornumber: number
    VisitorstreetName: string
    Visitorcity: string
    Visitorzipcode: string

    Postaladdition: string
    Postalnumber: number
    PostalstreetName: string
    Postalcity: string
    Postalzipcode: string

    // addition: string
    // number: number
    // streetName: string
    // city: string
    // zipcode: string
    country: string
    countryPostal: string
    issameaddress: boolean
}

const AddMembership: React.FC<propType> = ({ openPopUp, handleClose, isDesktop }) => {
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState<number>()
    const stepsRef = useRef<any>(null)
    const [country, setCountry] = useState('')
    const [countryPostal, setCountryPostal] = useState('')
    const [singleSelectValid, setSingleSelectValid] = useState(true)
    const [singleSelectValidPostal, setSingleSelectValidPostal] = useState(true)
    const [selectedCountry, SetSelectedCountry] = useState<optionType | null>(null)

    const [selectedCountryPostal, SetSelectedCountryPostal] = useState<optionType | null>(null)

    useEffect(() => {
        dispatch(handleCountry())
        dispatch(handlefunctionClassification())
        dispatch(handleStakeholder())
        dispatch(handleHoldings())
    }, [])

    const initialValues = {
        companyName: '',
        phoneNumber: '',
        organizationEmail: '',
        invoiceEmail: '',
        idStakeHolder: 0,
        holding: 0,
        oOfund: '',

        Visitoraddition: '',
        Visitornumber: 0,
        VisitorstreetName: '',
        Visitorcity: '',
        Visitorzipcode: '',

        Postaladdition: '',
        Postalnumber: 0,
        PostalstreetName: '',
        Postalcity: '',
        Postalzipcode: '',
        country: '',
        countryPostal: '',
        issameaddress: true,
    }

    const countryData = useSelector((state: RootState) => state.organisation.countryData)
    const stackholderType = useSelector((state: RootState) => state.organisation.stakeholderData)
    const holdingData = useSelector((state: RootState) => state.contact.HoldingsData)
    const zipcodeData = useSelector((state: RootState) => state.organisation.zipData)
    const zipcodeStreetname = useSelector((state: RootState) => state.organisation.zipData?.response.docs[0].straatnaam)
    const zipcodeCity = useSelector((state: RootState) => state.organisation.zipData?.response.docs[0].woonplaatsnaam)

    console.log('zipcodeStreetname ======>', zipcodeStreetname)

    console.log('zipcodeCity =======>', zipcodeCity)

    console.log('zipcodeData ========>', zipcodeData)

    console.log('stack holder data =====>', stackholderType)
    console.log('country data =======>', countryData)
    console.log('selected country ====>', selectedCountry)

    const countryDropdownData = countryData?.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })

    useEffect(() => {
        console.log('countryDropdownData ====>', countryDropdownData)
        if (countryDropdownData) {
            SetSelectedCountry(countryDropdownData[0])
            setCountry(countryDropdownData[0].label)
            localStorage.setItem('idCountry', `${countryDropdownData[0].value}`)
        }
    }, [countryData])

    useEffect(() => {
        if (country === 'Nederland') {
            // alert('call api')
        }
    }, [country])

    const stackholder = stackholderType?.map((item) => {
        return {
            label: item.stakeHolderType,
            value: item.idStakeHolder,
        }
    })

    const holdings = holdingData?.map((item) => {
        return {
            label: item.name,
            value: item.idOrganization,
        }
    })

    console.log('holdings ============>', holdings)

    useMemo(() => {
        console.log('formic data', initialValues)
    }, [openPopUp])

    const validationSchema = Yup.object({
        companyName: Yup.string().required('Name field required'),
        idStakeHolder: Yup.number()
            .required('Stakeholder required')
            .test('notZero', 'Please select a organisation', (value) => value !== 0),
        // country: Yup.string().required('Country required'),
        Visitorzipcode: Yup.string().required('Zip code required'),
        Postalzipcode: Yup.string().when('issameaddress', (issameaddress, schema) => {
            return issameaddress
                ? schema.notRequired() // No validation needed when issameaddress is true
                : schema.required('Zip code required') // Validation when issameaddress is false
        }),
        Visitornumber: Yup.number().integer().min(1).required('Number required'),
        Postalnumber: Yup.number().when('issameaddress', (issameaddress, schema) => {
            return issameaddress
                ? schema.notRequired() // No validation needed when issameaddress is true
                : schema.integer().min(1).required('Number required') // Validation when issameaddress is false
        }),
        // phoneNumber: Yup.string().required('Number Field Required'),
        organizationEmail: Yup.string().matches(emailRegEx, 'Email is not valid'),
        invoiceEmail: Yup.string().matches(emailRegEx, 'Email is not valid'),
        // invoice: Yup.string().required('Invoice Field Required'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // .min(12, 'Too short')
        // .max(12, 'Too long'),
    })

    const submitHandler = (): void => {}

    const handleSubmit = (values: FormValues): void => {
        console.log('values form form submit handler =============>', values)

        if (activeStep !== 2) {
            if (stepsRef.current) {
                stepsRef.current.childFunction() // Call the child function using the ref
            }
        } else if (country !== '') {
            const response: PostOrganizationBodyParam = {
                name: values.companyName,
                phoneNumber: values.phoneNumber,
                organizationEmail: values.organizationEmail,
                invoiceEmail: values.invoiceEmail,
                idStakeHolder: Number(values.idStakeHolder),
                holding: values.holding,
                oOfund: values.oOfund,
                issameaddress: values.issameaddress,
                postalAddress: values.issameaddress
                    ? null // Set postalAddress to null if issameaddress is true
                    : {
                          idAddress: 0,
                          country: countryPostal,
                          zipcode: values.Postalzipcode,
                          city: values.Postalcity,
                          streetName: values.PostalstreetName,
                          number: values.Postalnumber,
                          addition: values.Postaladdition,
                      },
                visitorAddress: {
                    idAddress: 0,
                    country: country,
                    zipcode: values.Visitorzipcode,
                    city: values.Visitorcity,
                    streetName: values.VisitorstreetName,
                    number: values.Visitornumber,
                    addition: values.Visitoraddition,
                },
            }
            console.log('submit button handler RESPONSE BODY', response)
            dispatch(handlePostOrganization(response))
            handleClose()
        } else {
            setSingleSelectValid(false)
            setSingleSelectValidPostal(false)
        }
    }

    const onNextButtonHandler = (): void => {
        if (activeStep !== 2) {
            if (stepsRef.current) {
                stepsRef.current.childFunction() // Call the child function using the ref
            }
        }
    }

    const backBtnHandler = (): void => {
        stepsRef.current.handleBack()
    }

    const activeStepHandler = (value: number): void => {
        console.log('active step value =======>', value)
        setActiveStep(value)
    }

    const SingleSelectHandler = (dropdownData: any): void => {
        console.log('checked data =====>', dropdownData)

        // getZipcode = countryData?.filter((item)=> item.code === "C01")

        localStorage.setItem('idCountry', `${dropdownData.value}`)

        SetSelectedCountry(dropdownData)
        setCountry(dropdownData.label)
        console.log(country)
        setSingleSelectValid(true)
    }

    const SingleSelectHandlerPostal = (value: any): void => {
        // console.log('checked data ====>', value)

        SetSelectedCountryPostal(value)
        setCountryPostal(value.label)
        console.log(country)
        setSingleSelectValidPostal(true)
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values)
                    resetForm({ values: { ...initialValues } })
                }}
                enableReinitialize
            >
                {(formikProps: FormikProps<FormValues>) => {
                    console.log('formik props data ======>', formikProps)

                    useEffect(() => {
                        console.log('visitor zip code ======>', formikProps.values.Visitorzipcode)
                        localStorage.setItem('Visitorzipcode', `${formikProps.values.Visitorzipcode}`)
                    }, [formikProps.values.Visitorzipcode])

                    useEffect(() => {
                        console.log('visitor number ======>', formikProps.values.Visitornumber)
                        localStorage.setItem('Visitornumber', `${formikProps.values.Visitornumber}`)
                    }, [formikProps.values.Visitornumber])

                    return (
                        <PopUp
                            open={openPopUp}
                            handleClose={() => {
                                formikProps.resetForm()
                                handleClose()
                            }}
                            headerLabel="Create organisation"
                            footerBtnLabel="string"
                            BtnIconRequired={true}
                            isDesktop={isDesktop}
                            submitHandler={submitHandler}
                            isMember={false}
                        >
                            <Steps
                                activeStepHandler={activeStepHandler}
                                ref={stepsRef}
                                steps={['Contact', 'Organisation', 'Address']}
                            >
                                {activeStep === 0 && (
                                    <Form>
                                        <div className={styles.popUp_title}>Contact details</div>
                                        <FormicCommonInputField
                                            label="Company name*"
                                            placeholder="Search company name"
                                            name="companyName"
                                            emailValid={false}
                                            isDisabled={false}
                                        />

                                        <FormicCommonInputField
                                            label="Phone number organisation"
                                            placeholder="Search phone number"
                                            name="phoneNumber"
                                            emailValid={false}
                                            isDisabled={false}
                                        />

                                        <FormicCommonInputField
                                            label="E-mail address organisation"
                                            placeholder="Search email address"
                                            name="organizationEmail"
                                            emailValid={false}
                                            isDisabled={false}
                                        />

                                        <FormicCommonInputField
                                            label="Invoice e-mail address"
                                            placeholder="Search email address"
                                            name="invoiceEmail"
                                            emailValid={false}
                                            isDisabled={false}
                                        />

                                        <div className={styles.footer_div}>
                                            <span
                                                className={styles.cancel_btn}
                                                onClick={() => {
                                                    formikProps.resetForm()
                                                    handleClose()
                                                }}
                                            >
                                                Cancel
                                            </span>

                                            <Button
                                                variant="contained"
                                                className={styles.button_tag}
                                                // onClick={submitHandler}
                                                // type="submit"
                                                onClick={onNextButtonHandler}
                                                disabled={
                                                    formikProps.values.companyName === '' ||
                                                    !!formikProps.errors.companyName
                                                }
                                            >
                                                NEXT
                                            </Button>
                                        </div>
                                    </Form>
                                )}

                                {activeStep === 1 && (
                                    <Form>
                                        <div className={styles.makeFlexBox}>
                                            <div>
                                                <div className={styles.popUp_title}>Organisation details</div>
                                                <div className={styles.container_div}>
                                                    <label className={styles.label_tag}>Stakeholder type*</label>
                                                    <br />
                                                    <FormicDropdown
                                                        placeholder="Select stakeholder..."
                                                        options={stackholder ?? []}
                                                        onSelectHandler={() => {}}
                                                        name="idStakeHolder"
                                                    />
                                                </div>

                                                <div className={styles.container_div}>
                                                    <label className={styles.label_tag}>Holding</label>
                                                    <br />
                                                    <FormicDropdown
                                                        placeholder="Select holding..."
                                                        options={holdings ?? []}
                                                        onSelectHandler={() => {}}
                                                        name="holding"
                                                    />
                                                </div>

                                                <FormicCommonInputField
                                                    label="O&O fund"
                                                    placeholder="Search o&o fund"
                                                    name="oOfund"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>

                                            <div className={styles.footer_div}>
                                                <span
                                                    className={styles.cancel_btn}
                                                    onClick={() => {
                                                        formikProps.resetForm()
                                                        handleClose()
                                                    }}
                                                >
                                                    Cancel
                                                </span>

                                                <Button variant="outlined" onClick={backBtnHandler}>
                                                    BACK
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    className={styles.button_tag}
                                                    // onClick={submitHandler}
                                                    // type="submit"
                                                    onClick={onNextButtonHandler}
                                                    disabled={
                                                        formikProps.values.idStakeHolder === 0 ||
                                                        !!formikProps.errors.idStakeHolder
                                                    }
                                                >
                                                    NEXT
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )}

                                {activeStep === 2 && (
                                    <Form>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                            <Hidden only={['xs']}>
                                                <div
                                                // style={{ width: formikProps.values.issameaddress ? '100%' : '45%' }}
                                                >
                                                    <div>
                                                        <div className={styles.popUp_title}> Visitor Address</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Country*</label>
                                                            <br />
                                                            <SingleSelect
                                                                onSelectHandler={SingleSelectHandler}
                                                                options={countryDropdownData ?? []}
                                                                defaultValues={selectedCountry}
                                                                isValid={singleSelectValid}
                                                            />
                                                        </div>

                                                        {/* <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Country*</label>
                                        <br />
                                        <FormicDropdown
                                            placeholder="Select country..."
                                            options={countryDropdownData ?? []}
                                            onSelectHandler={() => {}}
                                            name="idStakeHolder"
                                        />
                                    </div> */}

                                                        <FormicCommonInputField
                                                            label="ZIP code*"
                                                            placeholder="Search zip code"
                                                            name="Visitorzipcode"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <div className={styles.input_field_container}>
                                                            <FormicCommonInputField
                                                                label="Number*"
                                                                placeholder="Search number"
                                                                name="Visitornumber"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="Addition"
                                                                placeholder="Search addition"
                                                                name="Visitoraddition"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="Street name"
                                                            placeholder="Search street name"
                                                            name="VisitorstreetName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <FormicCommonInputField
                                                            label="City"
                                                            placeholder="Search city"
                                                            name="Visitorcity"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <FormicSwitch
                                                            placeholder="Postal address is the same as visitor address"
                                                            name="issameaddress"
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>

                                            <Hidden only={['xs']}>
                                                <div
                                                // style={{ width: '45%' }}
                                                >
                                                    {!formikProps.values.issameaddress && (
                                                        <div>
                                                            <div className={styles.popUp_title}>Postal Address</div>
                                                            <div className={styles.container_div}>
                                                                <label className={styles.label_tag}>Country*</label>
                                                                <br />
                                                                <SingleSelect
                                                                    onSelectHandler={SingleSelectHandlerPostal}
                                                                    options={countryDropdownData ?? []}
                                                                    defaultValues={selectedCountryPostal}
                                                                    isValid={singleSelectValidPostal}
                                                                />
                                                            </div>

                                                            <FormicCommonInputField
                                                                label="ZIP code*"
                                                                placeholder="8921GJ"
                                                                name="Postalzipcode"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <div className={styles.input_field_container}>
                                                                <FormicCommonInputField
                                                                    label="Number*"
                                                                    placeholder="44"
                                                                    name="Postalnumber"
                                                                    emailValid={false}
                                                                    isDisabled={false}
                                                                />

                                                                <FormicCommonInputField
                                                                    label="Addition"
                                                                    placeholder="14"
                                                                    name="Postaladdition"
                                                                    emailValid={false}
                                                                    isDisabled={false}
                                                                />
                                                            </div>

                                                            <FormicCommonInputField
                                                                label="Street name"
                                                                placeholder="Promenade"
                                                                name="PostalstreetName"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="City"
                                                                placeholder="Amsterdam"
                                                                name="Postalcity"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>
                                                    )}
                                                    {/* <Switch {...label} defaultChecked />
                                    <span className={styles.switch_text}>
                                        Postal address is the same as visitor address
                                    </span> */}
                                                </div>
                                            </Hidden>

                                            <Hidden only={['xs']}>
                                                <div style={{ width: '100%', position: 'sticky', bottom: 0 }}>
                                                    <div className={styles.footer_div}>
                                                        <span
                                                            className={styles.cancel_btn}
                                                            onClick={() => {
                                                                formikProps.resetForm()
                                                                handleClose()
                                                                SetSelectedCountry(null)
                                                                SetSelectedCountryPostal(null)
                                                            }}
                                                        >
                                                            Cancel
                                                        </span>

                                                        <Button variant="outlined" onClick={backBtnHandler}>
                                                            BACK
                                                        </Button>

                                                        {/* <button type='submit'>Submit</button> */}
                                                        <Button
                                                            variant="contained"
                                                            className={styles.button_tag}
                                                            // onClick={submitHandler}
                                                            type="submit"
                                                            disabled={
                                                                (!formikProps.dirty &&
                                                                    (formikProps.values.Visitorzipcode === '' ||
                                                                        formikProps.values.Visitornumber === 0)) ||
                                                                !!formikProps.errors.Visitorzipcode ||
                                                                !!formikProps.errors.Visitornumber
                                                            }
                                                        >
                                                            SAVE
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Hidden>
                                        </div>

                                        <div>
                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}> Visitor Address</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Country*</label>
                                                            <br />
                                                            <SingleSelect
                                                                onSelectHandler={SingleSelectHandler}
                                                                options={countryDropdownData ?? []}
                                                                defaultValues={selectedCountry}
                                                                isValid={singleSelectValid}
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="ZIP code*"
                                                            placeholder="8921GJ"
                                                            name="Visitorzipcode"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <div className={styles.input_field_container}>
                                                            <FormicCommonInputField
                                                                label="Number*"
                                                                placeholder="44"
                                                                name="Visitornumber"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="Addition"
                                                                placeholder="14"
                                                                name="Visitoraddition"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="Street name"
                                                            placeholder="Promenade"
                                                            name="VisitorstreetName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <FormicCommonInputField
                                                            label="City"
                                                            placeholder="Amsterdam"
                                                            name="Visitorcity"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    <FormicSwitch
                                                        placeholder="Postal address is the same as visitor address"
                                                        name="issameaddress"
                                                    />
                                                </div>
                                            </Hidden>
                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    {!formikProps.values.issameaddress && (
                                                        <div>
                                                            <div className={styles.popUp_title}>Postal Address</div>
                                                            <div className={styles.container_div}>
                                                                <label className={styles.label_tag}>Country*</label>
                                                                <br />
                                                                <SingleSelect
                                                                    onSelectHandler={SingleSelectHandlerPostal}
                                                                    options={countryDropdownData ?? []}
                                                                    defaultValues={selectedCountryPostal}
                                                                    isValid={singleSelectValidPostal}
                                                                />
                                                            </div>

                                                            <FormicCommonInputField
                                                                label="ZIP code*"
                                                                placeholder="Search zip code"
                                                                name="Postalzipcode"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <div className={styles.input_field_container}>
                                                                <FormicCommonInputField
                                                                    label="Number*"
                                                                    placeholder="Search number"
                                                                    name="Postalnumber"
                                                                    emailValid={false}
                                                                    isDisabled={false}
                                                                />

                                                                <FormicCommonInputField
                                                                    label="Addition"
                                                                    placeholder="Search addition"
                                                                    name="Postaladdition"
                                                                    emailValid={false}
                                                                    isDisabled={false}
                                                                />
                                                            </div>

                                                            <FormicCommonInputField
                                                                label="Street name"
                                                                placeholder="Search street name"
                                                                name="PostalstreetName"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="City"
                                                                placeholder="Amsterdam"
                                                                name="Postalcity"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>
                                                    )}
                                                    {/* <Switch {...label} defaultChecked />
                                    <span className={styles.switch_text}>
                                        Postal address is the same as visitor address
                                    </span> */}
                                                </div>
                                                <div className={styles.footer_div}>
                                                    <span
                                                        className={styles.cancel_btn}
                                                        onClick={() => {
                                                            formikProps.resetForm()
                                                            handleClose()
                                                            SetSelectedCountry(null)
                                                            SetSelectedCountryPostal(null)
                                                        }}
                                                    >
                                                        Cancel
                                                    </span>

                                                    <Button variant="outlined" onClick={backBtnHandler}>
                                                        BACK
                                                    </Button>

                                                    {/* <button type='submit'>Submit</button> */}
                                                    <Button
                                                        variant="contained"
                                                        className={styles.button_tag}
                                                        // onClick={submitHandler}
                                                        type="submit"
                                                        disabled={
                                                            (!formikProps.dirty &&
                                                                (formikProps.values.Visitorzipcode === '' ||
                                                                    formikProps.values.Visitornumber === 0)) ||
                                                            !!formikProps.errors.Visitorzipcode ||
                                                            !!formikProps.errors.Visitornumber
                                                        }
                                                    >
                                                        SAVE
                                                    </Button>
                                                </div>
                                            </Hidden>
                                        </div>
                                    </Form>
                                )}
                            </Steps>
                        </PopUp>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddMembership
