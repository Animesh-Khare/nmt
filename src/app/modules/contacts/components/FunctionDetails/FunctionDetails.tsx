import React, { useRef, useMemo, useEffect, useState } from 'react'

// from mui
import Grid from '@mui/material/Grid'
// import Stack from '@mui/material/Stack'

import styles from './FunctionDetails.module.css'

import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'
import FormicCommonInputDate from '@shared/components/CommonInputDate/FormicCommonInputDate'

// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Radio from '@mui/material/Radio'
import { Hidden } from '@mui/material'
import moment from 'moment'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormikCommonRadioGroup from '@shared/components/CommonRadioGroup/FormikCommonRadioGroup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { handlePostFunctionalDetail } from '@contacts/store/contactDetailStore/contactDetail.slice'
import { PostFunctionalDetailBodyParam, SecretaryDropdownObj } from '@app-types/ContactDetailResponse.types'

import { useLocation } from 'react-router-dom'

interface PropType {
    isSubmit: boolean | number
    closeHandler: () => void
}

interface FormValues {
    Organisation: number
    Functionname: string
    Functionclassification: number
    FunctionLevel: number
    Secretary: number
    // Secretary: 0,
    Currentfunction: boolean
    Startdate: string
    Enddate: string
    Mainfunction: boolean

    InviteToEvents: boolean
    Clipper: boolean
    Magazine: boolean
}

const FunctionDetails: React.FC<PropType> = ({ isSubmit, closeHandler }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { idContact } = location.state
    const formikRef = useRef<FormikProps<any>>(null)

    const contactInfoData = useSelector((state: RootState) => state.contactDetail.contactInfoData)
    const FunctionLevel = useSelector((state: RootState) => state.contact.functionLevelData)
    const FunctionClassification = useSelector((state: RootState) => state.contact.functionClassificationData)
    const holdingsData = useSelector((state: RootState) => state.contact.HoldingsData)
    const secretaryDropdown = useSelector((state: RootState) => state.contactDetail.secretaryDropdownData?.contact)

    const [showenddate, setShowenddate] = useState(contactInfoData ? contactInfoData.currentfunction : false)

    const secretaryDropdownData = secretaryDropdown?.map((item: SecretaryDropdownObj) => {
        return {
            label: item.name,
            value: item.contactperson,
        }
    })

    const MultiSelectHoldingData = holdingsData?.map((item) => {
        return {
            label: item.name,
            value: item.idOrganization,
        }
    })

    const FunctionLevelData = FunctionLevel?.map((item) => {
        return {
            label: item.name,
            value: item.idFunctionLevel,
        }
    })

    const FunctionClassificationData = FunctionClassification?.map((item) => {
        return {
            label: item.name,
            value: item.idFunctionClassification,
        }
    })

  

    const initialValues = {
        Organisation: contactInfoData ? contactInfoData.organization : 0,
        Functionname: contactInfoData ? contactInfoData.functionName : '',
        Functionclassification: contactInfoData ? contactInfoData.idFunctionClassification : 0,
        FunctionLevel: contactInfoData ? contactInfoData.idFunctionLevel : 0,
        Secretary: contactInfoData ? contactInfoData.secretary : 0,
        // Secretary: 0,
        Currentfunction: contactInfoData ? contactInfoData.currentfunction : false,
        Startdate: contactInfoData ? moment(contactInfoData.startdate, 'MM/DD/YYYY').format('YYYY-MM-DD') : '',
        Enddate: contactInfoData?.enddate ? moment(contactInfoData.enddate, 'MM/DD/YYYY').format('YYYY-MM-DD') : '',
        Mainfunction: contactInfoData ? contactInfoData.mainfunction : false,

        InviteToEvents: contactInfoData ? contactInfoData.events : false,
        Clipper: contactInfoData ? contactInfoData.clipper : false,
        Magazine: contactInfoData ? contactInfoData.magazine : false,
    }

    const validationSchema = Yup.object({
        // Firstname: Yup.string().required('First name field required'),
        // Lastname: Yup.string().required('Last name field required'),
        // Mobile: Yup.string().matches(phoneRegExp, 'Mobile number is not valid'),
        // Phonenumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        // // .min(12, 'Too short')
        // // .max(12, 'Too long'),
        // Emailaddress: Yup.string().matches(emailRegEx, 'Email is not valid'),
    })

    // const [value, setValue] = React.useState('0')

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     setValue((event.target as HTMLInputElement).value)
    // }

    useMemo(() => {
        if (isSubmit && formikRef.current) {
            // if (formikRef.current) {
            formikRef.current
                .submitForm()
                .then(() => {
                    // closeHandler();
                })
                .catch((error) => {
                    console.error('Form submission error:', error)
                })
            //   }
        }
    }, [isSubmit])

    const handleSubmit = (values: any): void => {
        

        const username = localStorage.getItem('user name')
        const initialvalue: PostFunctionalDetailBodyParam = {
            idfunction: 0,
            functionName: values.Functionname,
            isPrimary: 0,
            organization: values.Organisation,
            spotterId: 'string',
            idFunctionClassification: values.Functionclassification,
            idFunctionLevel: values.FunctionLevel,
            currentFunction: values.Currentfunction,
            mainFunction: values.Mainfunction,
            idPerson: idContact,
            events: values.InviteToEvents,
            clipper: values.Clipper,
            magazine: values.Magazine,
            secretary: values.Secretary,
            // secretary: 0,
            startdate: values.Startdate,
            enddate: showenddate
                ? new Date().toISOString()
                : values.Enddate !== ''
                ? values.Enddate
                : new Date().toISOString(),
            username: username ?? '',
        }

        dispatch(handlePostFunctionalDetail(initialvalue))
        closeHandler()
    }

    return (
        <div>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {(formikProps: FormikProps<FormValues>) => {
                    useEffect(() => {
                        // setIsMainFunction(formikProps.values.Currentfunction)

                        setShowenddate(formikProps.values.Currentfunction)
                        // if (formikProps.values.Currentfunction) {
                        //     // formikProps.values.Mainfunction = false
                        //     // setShowenddate(false)
                        // }
                    }, [formikProps.values.Currentfunction])

                    return (
                        <div style={{ height: '350px' }}>
                            <Form>
                                <Hidden only={['xs']}>
                                    <div className={styles.grid_container}>
                                        <Grid container spacing={1} className={styles.grid_one}>
                                            <Grid item xs={12}>
                                                <span className={styles.function_details}> Function details</span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div>
                                                    <div className={styles.container_div}>
                                                        <label className={styles.label_tag}>Organisation</label>
                                                        <br />
                                                        <FormicDropdown
                                                            placeholder="Select Organisation..."
                                                            options={MultiSelectHoldingData ?? []}
                                                            onSelectHandler={() => {}}
                                                            name="Organisation"
                                                            isDesable={true}
                                                        />
                                                    </div>
                                                    <div className={styles.para_text}>
                                                        The organization of a function can not be changed. Create a new
                                                        function in work experience.
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormicCommonInputField
                                                    label="Function name"
                                                    placeholder="Enter function name"
                                                    name="Functionname"
                                                    emailValid={false}
                                                    isDisabled={false}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className={styles.container_div}>
                                                    <label className={styles.label_tag}>Function classification</label>
                                                    <br />
                                                    <FormicDropdown
                                                        placeholder="Select function classification"
                                                        options={FunctionClassificationData ?? []}
                                                        onSelectHandler={() => {}}
                                                        name="Functionclassification"
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <div className={styles.popUp_title}>Function level</div>
                                                <FormikCommonRadioGroup
                                                    options={FunctionLevelData ?? []}
                                                    name="FunctionLevel"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className={styles.container_div}>
                                                    <label className={styles.label_tag}>Secretary</label>
                                                    <br />
                                                    <FormicDropdown
                                                        placeholder="Select secretary"
                                                        options={secretaryDropdownData ?? []}
                                                        onSelectHandler={() => {}}
                                                        name="Secretary"
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={0} className={styles.grid_one}>
                                            <Grid item xs={12}>
                                                <div>
                                                    <div className={styles.preferences_text}>Current function</div>
                                                    <FormicSwitch placeholder="" name="Currentfunction" />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div>
                                                    <FormicCommonInputDate name="Startdate" label="Start date" />
                                                </div>
                                            </Grid>

                                            {!showenddate && (
                                                <Grid item xs={12}>
                                                    <div>
                                                        <FormicCommonInputDate name="Enddate" label="End date" />
                                                    </div>
                                                </Grid>
                                            )}  
  
                                            <Grid item xs={12}>
                                                {contactInfoData?.functioncount &&
                                                    contactInfoData?.functioncount > 1 && (
                                                        <div>
                                                            <div className={styles.preferences_text}>Main function</div>
                                                            <FormicSwitch placeholder="" name="Mainfunction" />
                                                            <div className={styles.mainFunctionText}>
                                                                There is one single current function and therefore will
                                                                be the main function.
                                                            </div>
                                                        </div>
                                                    )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div>
                                                    <div className={styles.preferences_text}>Preferences</div>

                                                    <FormicSwitch
                                                        placeholder="Invite to events"
                                                        name="InviteToEvents"
                                                    />
                                                    <FormicSwitch placeholder="Clipper" name="Clipper" />
                                                    <FormicSwitch placeholder="Magazine (print)" name="Magazine" />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Hidden>
                            </Form>

                            <Form>
                                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                    <div className={styles.tab_mobile_form}>
                                        <div className={styles.form_div_container}>
                                            <div>
                                                <span className={styles.function_details}> Function details</span>
                                            </div>
                                            <div style={{ marginBottom: '10px' }}>
                                                <div className={styles.container_div}>
                                                    <label className={styles.label_tag}>Organisation</label>
                                                    <br />
                                                    <FormicDropdown
                                                        placeholder="Select Organisation..."
                                                        options={MultiSelectHoldingData ?? []}
                                                        onSelectHandler={() => {}}
                                                        name="Organisation"
                                                        isDesable={true}
                                                    />
                                                </div>
                                                <div className={styles.para_text}>
                                                    The organization of a function can not be changed. Create a new
                                                    function in work experience.
                                                </div>
                                            </div>

                                            <FormicCommonInputField
                                                label="Function name"
                                                placeholder="Search function name"
                                                name="Functionname"
                                                emailValid={false}
                                                isDisabled={false}
                                            />

                                            <div className={styles.container_div}>
                                                <label className={styles.label_tag}>Function classification</label>
                                                <br />
                                                <FormicDropdown
                                                    placeholder="Select function classification"
                                                    options={FunctionClassificationData ?? []}
                                                    onSelectHandler={() => {}}
                                                    name="Functionclassification"
                                                />
                                            </div>

                                            <div className={styles.popUp_title}>Function level</div>
                                            <FormikCommonRadioGroup
                                                options={FunctionLevelData ?? []}
                                                name="FunctionLevel"
                                            />

                                            <div className={styles.container_div}>
                                                <label className={styles.label_tag}>Secretary</label>
                                                <br />
                                                <FormicDropdown
                                                    placeholder="Select secretary"
                                                    options={secretaryDropdownData ?? []}
                                                    onSelectHandler={() => {}}
                                                    name="Secretary"
                                                />
                                            </div>

                                            <div>
                                                <div className={styles.preferences_text}>Current function</div>
                                                <FormicSwitch placeholder="" name="Currentfunction" />
                                            </div>
                                            <div>
                                                <FormicCommonInputDate name="Startdate" label="Start date" />
                                            </div>
                                            <div>
                                                <div className={styles.preferences_text}>Main function</div>
                                                <FormicSwitch placeholder="" name="Mainfunction" />
                                                <div className={styles.mainFunctionText}>
                                                    There is one single current function and therefore will be the main
                                                    function.
                                                </div>
                                            </div>
                                            <div>
                                                <div className={styles.preferences_text}>Preferences</div>

                                                <FormicSwitch placeholder="Invite to events" name="InviteToEvents" />
                                                <FormicSwitch placeholder="Clipper" name="Clipper" />
                                                <FormicSwitch placeholder="Magazine (print)" name="Magazine" />
                                            </div>
                                        </div>
                                    </div>
                                </Hidden>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
}

export default FunctionDetails
