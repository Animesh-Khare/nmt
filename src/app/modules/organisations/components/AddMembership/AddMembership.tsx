import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './AddMembership.module.css'
import { makeStyles } from '@material-ui/core/styles'
// packages
import { Formik, Form, FormikProps, Field } from 'formik'
import * as Yup from 'yup'

// from material ui
import { Button, Hidden } from '@mui/material'
// import Switch from '@mui/material/Switch'

// shared components
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'
// import SearchBar from '@shared/components/SearchBar/SearchBar'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import PopUp from '@shared/components/PopUp/PopUp'
import Steps from '@shared/components/Stepper/Steps'
import SingleSelect from '@shared/components/MultiSelect/SingleSelect'
import {
    PostOrganizationBodyParam,
    OrganisationOverviewCompanyDetailsRequestParams,
} from '@app-types/OrganisationResponse.types'

import { handlePostOrganization, handleOrganisationContactInfoData } from '@organisations/store/organisation.slice'
import { RootState } from '@store/store'

// import axios from 'axios'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@assets/images/searchIcon.svg'

// const phoneRegExp = /^(?:\+\d{2}\d{9}|\(\d{1,}\)\d{9}|\+\d{9})$/
const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface propType {
    openPopUp: boolean
    handleClose: () => void
    isDesktop: boolean
    organisationId: number
}

interface optionType {
    label: string
    value: number
}

interface FormValues {
    searchOrganisationName: string
    phoneNumber: string
    organizationEmail: string
    invoiceEmail: string
    website: string

    ZipCode: string
    Number: number
    Addition: string
    City: string
    StreetName: string
    // above is form 1
    searchMembershipCoordinator: string
    searchContactPerson: string

    EmailAddress: string
    MemberShipType: number

    filterParam: string
    companyName: string
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

    issameaddress: boolean
}
const useStyles = makeStyles((theme) => ({
    searchBarStyle: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                boxShadow: '0px 0px 0px 2px #dbf2fb, inset 0px 0px 0px 1px #77cbed',
                border: 'none',
            },
        },
    },
}))
const AddOrganisation: React.FC<propType> = ({ openPopUp, handleClose, isDesktop, organisationId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const OrganisationAddressInfoData = useSelector(
        (state: RootState) => state.organisation.OrganisationContactInfoData
    )
    // const [MemberShipType,setMemberShipType] =useState<string>('')
    const [activeStep, setActiveStep] = useState<number>()
    const stepsRef = useRef<any>(null)
    const [country, setCountry] = useState('')
    const [singleSelectValid, setSingleSelectValid] = useState(true)
    const [singleSelectValidPostal, setSingleSelectValidPostal] = useState(true)
    // const [filterParam, setFilterParam] = useState('')
    // const [autocompleteResults, setAutocompleteResults] = useState<string[]>([])
    const [selectedCountry, SetSelectedCountry] = useState<optionType | null>(null)

    const {zipcode, city, streetName, number, addition } = OrganisationAddressInfoData?.visitorAddress?? {
        zipcode: '',
        city: '',
        streetName: '',
        number: '',
        addition: '',
      };
      const {email, invoiceMail, name, phoneNumber } = OrganisationAddressInfoData??{
        email: '', invoiceMail: '', name: '', phoneNumber: ''
      };

    const initialValues = {
        searchOrganisationName: name,
        phoneNumber: phoneNumber,
        organizationEmail: email,
        invoiceEmail: invoiceMail,
        website: '',

        ZipCode: zipcode,
        Number: Number(number),
        Addition: addition,
        City: city,
        StreetName: streetName,

        searchMembershipCoordinator: '',
        searchContactPerson: '',

        companyName: '',
        idStakeHolder: 0,
        holding: 0,
        oOfund: '',
        filterParam: '',
        EmailAddress: '',
        MemberShipType: 0,
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

        issameaddress: true,
    }

    const countryData = useSelector((state: RootState) => state.organisation.countryData)
    const holdingData = useSelector((state: RootState) => state.contact.HoldingsData)
    const zipcodeData = useSelector((state: RootState) => state.organisation.zipData)
    const zipcodeStreetname = useSelector((state: RootState) => state.organisation.zipData?.response.docs[0].straatnaam)
    const zipcodeCity = useSelector((state: RootState) => state.organisation.zipData?.response.docs[0].woonplaatsnaam)

    console.log('zipcodeStreetname ======>', zipcodeStreetname)

    console.log('zipcodeCity =======>', zipcodeCity)

    console.log('zipcodeData ========>', zipcodeData)

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

    useEffect(() => {
        const initialContactInfoParam: OrganisationOverviewCompanyDetailsRequestParams = {
            id: organisationId,
        }

        dispatch(handleOrganisationContactInfoData(initialContactInfoParam))
    }, [])

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
        MemberShipType: Yup.number()
            .required('Filter parameter is required')
            .test('notZero', 'Please select a organisation', (value) => value !== 0),

        companyName: Yup.string().required('Name field required'),
        idStakeHolder: Yup.number()
            .required('Stakeholder required')
            .test('notZero', 'Please select a organisation', (value) => value !== 0),
        // country: Yup.string().required('Country required'),
        ZipCode: Yup.string().required('Zip code required'),
        Number: Yup.number().integer().min(1).required('Number required'),
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
        EmailAddress: Yup.string().matches(emailRegEx, 'Email is not valid').required('Email address is required'),
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
                          country: 'test',
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
                    console.log('formik props data ======>', formikProps.values)

                    // useEffect(() => {
                    //     console.log('visitor zip code ======>', formikProps.values.Visitorzipcode)
                    //     localStorage.setItem('Visitorzipcode', `${formikProps.values.Visitorzipcode}`)
                    // }, [formikProps.values.Visitorzipcode])

                    // useEffect(() => {
                    //     console.log('visitor number ======>', formikProps.values.Visitornumber)
                    //     localStorage.setItem('Visitornumber', `${formikProps.values.Visitornumber}`)
                    // }, [formikProps.values.Visitornumber])

                    return (
                        <PopUp
                            open={openPopUp}
                            handleClose={() => {
                                formikProps.resetForm()
                                handleClose()
                            }}
                            headerLabel="Add membership"
                            footerBtnLabel="string"
                            BtnIconRequired={true}
                            isDesktop={isDesktop}
                            submitHandler={submitHandler}
                            isMember={true}
                        >
                            <Steps
                                activeStepHandler={activeStepHandler}
                                ref={stepsRef}
                                steps={['Organisation information', 'Contact person', 'Statement']}
                                isAddMembership={false}
                            >
                                {activeStep === 0 && (
                                    <Form>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                            <Hidden only={['xs']}>
                                                <div style={{ width: '45%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Organisation</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>
                                                                Organisation name*
                                                            </label>
                                                            <br />
                                                            <Field name="searchOrganisationName">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px', // Adjust the font size
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="Phone number organisation"
                                                            placeholder="Sprint/sprint-3"
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
                                                            label="Invoice e-mail address organisation "
                                                            placeholder="Search email address"
                                                            name="invoiceEmail"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Website "
                                                            placeholder="Search website"
                                                            name="website"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
                                            <Hidden only={['xs']}>
                                                <div style={{ width: '45%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Address</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Country*</label>
                                                            <br />
                                                            <SingleSelect
                                                                onSelectHandler={SingleSelectHandler}
                                                                options={countryDropdownData ?? []}
                                                                defaultValues={selectedCountry}
                                                                // isValid={singleSelectValidPostal}
                                                                isValid={
                                                                    singleSelectValidPostal && selectedCountry !== null
                                                                }
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="ZIP code*"
                                                            placeholder="8921GJ"
                                                            name="ZipCode"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <div className={styles.input_field_container}>
                                                            <FormicCommonInputField
                                                                label="Number*"
                                                                placeholder="44"
                                                                name="Number"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="Addition"
                                                                placeholder="14"
                                                                name="Addition"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="Street name"
                                                            placeholder="Promenade"
                                                            name="StreetName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <FormicCommonInputField
                                                            label="City"
                                                            placeholder="Amsterdam"
                                                            name="City"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>

                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Organisation</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>
                                                                Organisation name*
                                                            </label>
                                                            <br />
                                                            <Field name="searchOrganisationName">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                        <FormicCommonInputField
                                                            label="Phone number organisation"
                                                            placeholder="Enter phone number"
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
                                                            label="Invoice e-mail address organisation "
                                                            placeholder="Search email address"
                                                            name="invoiceEmail"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Website "
                                                            placeholder="Search website"
                                                            name="website"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Address</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Country*</label>
                                                            <br />
                                                            <SingleSelect
                                                                onSelectHandler={SingleSelectHandler}
                                                                options={countryDropdownData ?? []}
                                                                defaultValues={selectedCountry}
                                                                // isValid={singleSelectValidPostal}
                                                                isValid={
                                                                    singleSelectValidPostal && selectedCountry !== null
                                                                }
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="ZIP code*"
                                                            placeholder="8921GJ"
                                                            name="ZipCode"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <div className={styles.input_field_container}>
                                                            <FormicCommonInputField
                                                                label="Number*"
                                                                placeholder="44"
                                                                name="Number"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />

                                                            <FormicCommonInputField
                                                                label="Addition"
                                                                placeholder="14"
                                                                name="Addition"
                                                                emailValid={false}
                                                                isDisabled={false}
                                                            />
                                                        </div>

                                                        <FormicCommonInputField
                                                            label="Street name"
                                                            placeholder="Promenade"
                                                            name="StreetName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <FormicCommonInputField
                                                            label="City"
                                                            placeholder="Amsterdam"
                                                            name="City"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
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

                                            <Button
                                                variant="contained"
                                                className={styles.button_tag}
                                                // onClick={submitHandler}
                                                // type="submit"
                                                onClick={onNextButtonHandler}
                                                disabled={
                                                    // formikProps.values.companyName === '' ||
                                                    // !!formikProps.errors.companyName ||
                                                    formikProps.values.ZipCode === '' ||
                                                    !!formikProps.errors.ZipCode ||
                                                    !!formikProps.errors.Number ||
                                                    !formikProps.values.searchOrganisationName
                                                }
                                            >
                                                NEXT
                                            </Button>
                                        </div>
                                    </Form>
                                )}

                                {activeStep === 1 && (
                                    <Form>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                            <Hidden only={['xs']}>
                                                <div style={{ width: '45%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Membership </div>

                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>
                                                                Membership coordinator*
                                                            </label>
                                                            <br />
                                                            <Field name="searchMembershipCoordinator">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Membership type*</label>
                                                            <br />
                                                            <FormicDropdown
                                                                placeholder="Select Membership type..."
                                                                options={
                                                                    [
                                                                        {
                                                                            label: 'Membership shipyards',
                                                                            value: 1,
                                                                        },
                                                                        {
                                                                            label: 'Membership maritime suppliers',
                                                                            value: 2,
                                                                        },
                                                                        {
                                                                            label: 'Membership associated organisations',
                                                                            value: 3,
                                                                        },
                                                                    ] ?? []
                                                                }
                                                                onSelectHandler={() => {}}
                                                                name="MemberShipType"
                                                            />
                                                        </div>

                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Contact person*</label>
                                                            <br />
                                                            <Field name="searchContactPerson">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                        <FormicCommonInputField
                                                            label="E-mail address*"
                                                            placeholder="Enter e-mail address"
                                                            name="EmailAddress"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Function name"
                                                            placeholder="Enter Function name"
                                                            name="FunctionName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Direct phone"
                                                            placeholder="Enter Direct phone"
                                                            name="DirectPhone"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Mobile phone"
                                                            placeholder="Mobile phone"
                                                            name="MobilePhone"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
                                            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                                                <div style={{ width: '100%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Membership</div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>
                                                                Membership coordinator*
                                                            </label>
                                                            <br />
                                                            <Field name="searchMembershipCoordinator">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Membership type*</label>
                                                            <br />
                                                            <FormicDropdown
                                                                placeholder="Select Membership type..."
                                                                options={
                                                                    [
                                                                        {
                                                                            label: 'Membership shipyards',
                                                                            value: 1,
                                                                        },
                                                                        {
                                                                            label: 'Membership maritime suppliers',
                                                                            value: 2,
                                                                        },
                                                                        {
                                                                            label: 'Membership associated organisations',
                                                                            value: 3,
                                                                        },
                                                                    ] ?? []
                                                                }
                                                                onSelectHandler={() => {}}
                                                                name="MemberShipType"
                                                            />
                                                        </div>
                                                        <div className={styles.container_div}>
                                                            <label className={styles.label_tag}>Contact person*</label>
                                                            <br />
                                                            <Field name="searchContactPerson">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: {
                                                                    field: {
                                                                        name: string
                                                                        value: any
                                                                        onChange: Function
                                                                    }
                                                                    form: any
                                                                }) => (
                                                                    <Autocomplete
                                                                        {...field}
                                                                        freeSolo
                                                                        options={['Option 1', 'Option 2', 'Option 3']}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                className={classes.searchBarStyle}
                                                                                {...params}
                                                                                label=" "
                                                                                InputLabelProps={{
                                                                                    shrink: false,
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: (
                                                                                        <>
                                                                                            {/* <SearchIcon /> */}
                                                                                            <img
                                                                                                src={SearchIcon}
                                                                                                alt=""
                                                                                            />
                                                                                            {
                                                                                                params.InputProps
                                                                                                    .endAdornment
                                                                                            }
                                                                                        </>
                                                                                    ),
                                                                                    style: {
                                                                                        height: '35px', // Adjust the height as needed
                                                                                        paddingTop: '0', // Adjust to control the vertical position of text and icon
                                                                                        paddingBottom: '0', // Adjust to control the vertical position of text and icon
                                                                                        fontSize: '13.5px',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                        onChange={(event, newValue) => {
                                                                            form.setFieldValue(field.name, newValue)
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                        <FormicCommonInputField
                                                            label="E-mail address*"
                                                            placeholder="Enter e-mail address"
                                                            name="EmailAddress"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Function name"
                                                            placeholder="Enter Function name"
                                                            name="FunctionName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Direct phone"
                                                            placeholder="Enter Direct phone"
                                                            name="DirectPhone"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Mobile phone"
                                                            placeholder="Mobile phone"
                                                            name="MobilePhone"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
                                            <Hidden only={['xs']}>
                                                <div style={{ width: '45%' }}>
                                                    <div>
                                                        <div className={styles.popUp_title}>Statement</div>
                                                        <FormicCommonInputField
                                                            label="Number of employees"
                                                            placeholder="Enter number of employees"
                                                            name="NumberofEmployees"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />

                                                        <FormicCommonInputField
                                                            label="Maritime turnover in euros"
                                                            placeholder="Enter maritime turnover "
                                                            name="MariTimeTurnover"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                        <FormicCommonInputField
                                                            label="Company CAO"
                                                            placeholder="Enter Company CAO name "
                                                            name="CompanyCaoName"
                                                            emailValid={false}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Hidden>
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
                                                    // formikProps.values.companyName === '' ||
                                                    // !!formikProps.errors.companyName ||
                                                    formikProps.values.EmailAddress === '' ||
                                                    !!formikProps.errors.EmailAddress ||
                                                    formikProps.values.MemberShipType === 0 ||
                                                    !!formikProps.errors.MemberShipType
                                                }
                                            >
                                                NEXT
                                            </Button>
                                        </div>
                                    </Form>
                                )}

                                {activeStep === 2 && (
                                    <Form>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                            <Hidden only={['xs']}>
                                                <div
                                                    style={{ width: formikProps.values.issameaddress ? '100%' : '45%' }}
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
                                                </div>
                                            </Hidden>

                                            <Hidden only={['xs']}>
                                                <div style={{ width: '45%' }}>
                                                    {!formikProps.values.issameaddress && (
                                                        <div>
                                                            <div className={styles.popUp_title}>Postal Address</div>
                                                            <div className={styles.container_div}>
                                                                <label className={styles.label_tag}>Country*</label>
                                                                <br />
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
                                                <div style={{ width: '100%' }}>
                                                    <FormicSwitch
                                                        placeholder="Postal address is the same as visitor address"
                                                        name="issameaddress"
                                                    />
                                                </div>
                                                <div style={{ width: '100%', position: 'sticky', bottom: 0 }}>
                                                    <div className={styles.footer_div}>
                                                        <span
                                                            className={styles.cancel_btn}
                                                            onClick={() => {
                                                                formikProps.resetForm()
                                                                handleClose()
                                                                SetSelectedCountry(null)
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

export default AddOrganisation
