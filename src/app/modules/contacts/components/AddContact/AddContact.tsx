import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './AddContact.module.css'

// packages
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

// from material ui
import { Button } from '@mui/material'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Switch from '@mui/material/Switch'
// import { makeStyles } from '@material-ui/core/styles';

// shared components
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'
import FormikCommonRadioGroup from '@shared/components/CommonRadioGroup/FormikCommonRadioGroup'
import PopUp from '@shared/components/PopUp/PopUp'
import Steps from '@shared/components/Stepper/Steps'
// import SingleSelect from '@shared/components/MultiSelect/SingleSelect'
// import MultiSelect from '@shared/components/MultiSelect/MultiSelect'

// import { PostOrganizationBodyParam } from '@app-types/OrganisationResponse.types'

// import { handlePostOrganization } from '@organisations/store/organisation.slice'
import { RootState } from '@store/store'
import { PostContactBodyParamsOrganisation } from '@app-types/ContactResponse.types'

// from slice
import {
    handlePostContact,
    handleGender,
    handleHoldings,
    handlefunctionClassification,
    handlefunctionLevel,
} from '@contacts/store/contactStore/contact.slice'
// import { Root } from 'react-dom/client'

// const phoneRegExp = /^(?:\+\d{2}\d{9}|\(\d{1,}\)\d{9}|\+\d{9})$/
// const phoneRegExp = /^\+\d{12}$/

const phoneRegExp = /^(?:\+\d{11}|\+\d{12}|\d{10})$/
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface propType {
    openPopUp: boolean
    handleClose: () => void
    isDesktop: boolean
    orgId?: number
}

// interface optionType {
//     label: string
//     value: number
// }

interface FormValues {
    GenderRadioBtn: number
    Firstname: string
    Insertion: string
    Lastname: string
    Mobile: string
    Phonenumber: string
    Emailaddress: string
    InviteToEvents: boolean
    Clipper: boolean
    Magazine: boolean
    FunctionName: string
    Organisation: number
    FunctionClassification: number
    FunctionLevel: number
}

// const AuthOptions = [
//     {
//         label: 'admin',
//         value: 1,
//     },
//     {
//         label: 'user',
//         value: 2,
//     },
// ]

const AddContact: React.FC<propType> = ({ openPopUp, handleClose, isDesktop, orgId = 0 }) => {
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState<number>()
    // const [organisation, setOrganisation] = useState<number[]>([])

    // const [orgDropdownDesable,setOrgDropdownDesable] = useState(orgId===0?false:true)

    useEffect(() => {
        dispatch(handlefunctionClassification())
        dispatch(handlefunctionLevel())
        dispatch(handleHoldings())
        dispatch(handleGender())
    }, [])

    const stepsRef = useRef<any>(null)
    // const [country, setCountry] = useState('')
    // const [singleSelectValid, setSingleSelectValid] = useState(true)
    // const [selectedCountry, SetSelectedCountry] = useState<optionType | null>(null)

    // const [value, setValue] = React.useState('female')
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     setValue((event.target as HTMLInputElement).value)
    // }

    const initialValues = {
        GenderRadioBtn: 0,
        Firstname: '',
        Insertion: '',
        Lastname: '',
        Mobile: '',
        Phonenumber: '',
        Emailaddress: '',
        InviteToEvents: false,
        Clipper: false,
        Magazine: false,
        FunctionName: '',
        Organisation: orgId,
        FunctionClassification: 0,
        FunctionLevel: 0,
    }

    // const countryData = useSelector((state: RootState) => state.organisation.countryData)
    const functionClassification = useSelector((state: RootState) => state.contact.functionClassificationData)
    const functionLevel = useSelector((state: RootState) => state.contact.functionLevelData)
    const holdingsData = useSelector((state: RootState) => state.contact.HoldingsData)
    const Gender = useSelector((state: RootState) => state.contact.GenderData)

    const genderData = Gender?.map((item) => {
        return {
            label: item.name,
            value: item.idGender,
        }
    })

    const MultiSelectHoldingData = holdingsData?.map((item) => {
        return {
            label: item.name,
            value: item.idOrganization,
        }
    })

    const FunctionLevelData = functionLevel?.map((item) => {
        return {
            label: item.name,
            value: item.idFunctionLevel,
        }
    })

    const FunctionClassificationData = functionClassification?.map((item) => {
        return {
            label: item.name,
            value: item.idFunctionClassification,
        }
    })

    useMemo(() => {}, [openPopUp])

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
        // .min(12, 'Too short')
        // .max(12, 'Too long'),
        Emailaddress: Yup.string().matches(emailRegEx, 'Email is not valid'),

        Organisation: Yup.number()
            .required('Organisation is required')
            .test('notZero', 'Please select a organisation', (value) => value !== 0),
    })

    const submitHandler = (): void => {}

    const handleSubmit = (values: FormValues): void => {
        if (activeStep !== 2) {
            if (stepsRef.current) {
                stepsRef.current.childFunction() // Call the child function using the ref
            }
        } else {
            const response: PostContactBodyParamsOrganisation = {
                name: `${values.Firstname} ${values.Insertion} ${values.Lastname}`,
                idGender: values.GenderRadioBtn,
                mobile: values.Mobile,
                phoneNumber: values.Phonenumber,
                email: values.Emailaddress,
                events: values.InviteToEvents,
                clipper: values.Clipper,
                magazine: values.Magazine,
                functionName: values.FunctionName,
                idFunctionClassification: values.FunctionClassification,
                organization: values.Organisation,
                idFunctionLevel: values.FunctionLevel,
                isOrganisationContact: orgId !== 0,
            }

            dispatch(handlePostContact(response))
            handleClose()
        }
        // else setSingleSelectValid(false)
    }

    const onNextButtonHandler = (formikProps: any): void => {
        // formikProps.validateField('Firstname');
        // formikProps.validateField('Lastname');
        // formik.validateField('field2');

        // debugger;

        // if (formikProps.values.Firstname!=='' && formikProps.values.Lastname!=='' && !formikProps.errors.Firstname && !formikProps.errors.Lastname && activeStep !== 2) {
        if (stepsRef.current && activeStep !== 2) {
            stepsRef.current.childFunction() // Call the child function using the ref
        }
        // }
    }

    const backBtnHandler = (): void => {
        stepsRef.current.handleBack()
    }

    const activeStepHandler = (value: number): void => {
        setActiveStep(value)
    }

    // const SingleSelectHandler = (value: any): void => {

    //     SetSelectedCountry(value)
    //     setCountry(value.label)

    //     setSingleSelectValid(true)
    // }

    // const multiSelectHandler = (item: number[]): void => {

    //     setOrganisation(item)
    //     // setUserRole(item)
    // }

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
                {(formikProps: FormikProps<FormValues>) => (
                    // {formikProps.}
                    <PopUp
                        open={openPopUp}
                        handleClose={() => {
                            formikProps.resetForm()
                            handleClose()
                        }}
                        headerLabel="Create contact person"
                        footerBtnLabel="string"
                        BtnIconRequired={true}
                        isDesktop={isDesktop}
                        submitHandler={submitHandler}
                        isMember={false}
                    >
                        <Steps
                            activeStepHandler={activeStepHandler}
                            ref={stepsRef}
                            steps={['Person', 'Contact details', 'Function']}
                        >
                            {activeStep === 0 && (
                                <Form>
                                    <div className={styles.makeFlexBox}>
                                        <div>
                                            <div className={styles.popUp_title}>Personal information</div>

                                            <FormikCommonRadioGroup options={genderData ?? []} name="GenderRadioBtn" />

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
                                                    placeholder="Enter insertion..."
                                                    name="Insertion"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </div>

                                            <FormicCommonInputField
                                                label="Last name*"
                                                placeholder="Enter last name..."
                                                name="Lastname"
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

                                            <Button
                                                variant="contained"
                                                className={styles.button_tag}
                                                onClick={() => {
                                                    onNextButtonHandler(formikProps)
                                                }}
                                                disabled={
                                                    (!formikProps.dirty &&
                                                        (formikProps.values.Firstname === '' ||
                                                            formikProps.values.Lastname === '')) ||
                                                    !!formikProps.errors.Firstname ||
                                                    !!formikProps.errors.Lastname
                                                }
                                            >
                                                NEXT
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}

                            {activeStep === 1 && (
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
                                        placeholder="Enter email address"
                                        name="Emailaddress"
                                        emailValid={false}
                                        isDisabled={false}
                                    />

                                    <div>
                                        <div className={styles.preferences_text}>Preferences</div>

                                        <FormicSwitch placeholder="Invite to events" name="InviteToEvents" />
                                        <FormicSwitch placeholder="Clipper" name="Clipper" />
                                        <FormicSwitch placeholder="Magazine (print)" name="Magazine" />
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
                                            onClick={onNextButtonHandler}
                                            disabled={
                                                formikProps.values.Emailaddress === '' ||
                                                !!formikProps.errors.Emailaddress
                                            }
                                        >
                                            NEXT
                                        </Button>
                                    </div>
                                </Form>
                            )}

                            {activeStep === 2 && (
                                <Form>
                                    <div className={styles.popUp_title}>Function details</div>

                                    <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Organisation*</label>
                                        <br />
                                        <div className={`${orgId !== 0 ? styles.disable : ''}`}>
                                            <FormicDropdown
                                                placeholder="Select organisation..."
                                                options={MultiSelectHoldingData ?? []}
                                                onSelectHandler={() => {}}
                                                name="Organisation"
                                                // isDesable={orgId===0 ? false : true}
                                                isDesable={orgId !== 0}
                                            />
                                        </div>
                                    </div>

                                    <FormicCommonInputField
                                        label="Function name"
                                        placeholder="Enter function name..."
                                        name="FunctionName"
                                        emailValid={false}
                                        isDisabled={false}
                                    />

                                    <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Function classification</label>
                                        <br />
                                        <FormicDropdown
                                            placeholder="Select function classification..."
                                            options={FunctionClassificationData ?? []}
                                            onSelectHandler={() => {}}
                                            name="FunctionClassification"
                                        />
                                    </div>

                                    <div className={styles.popUp_title}>Function level</div>

                                    <FormikCommonRadioGroup options={FunctionLevelData ?? []} name="FunctionLevel" />

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

                                        {/* <button type='submit'>Submit</button> */}
                                        <Button
                                            variant="contained"
                                            className={styles.button_tag}
                                            // onClick={submitHandler}
                                            type="submit"
                                            disabled={
                                                formikProps.values.Organisation === 0 ||
                                                !!formikProps.errors.Organisation
                                            }
                                        >
                                            SAVE
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Steps>
                    </PopUp>
                )}
            </Formik>
        </div>
    )
}

export default AddContact
