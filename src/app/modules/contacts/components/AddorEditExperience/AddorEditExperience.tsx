import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'

import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
   
import styles from './AddorEditExperience.module.css'
       
// shared component
import PopUp from '@shared/components/PopUp/PopUp'
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
import FormicSwitch from '@shared/components/Switch/FormicSwitch'

import Button from '@mui/material/Button'
// images
import addUser from '@assets/images/addUser.svg'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddFunction, handleEditFunction } from '@contacts/store/contactDetailStore/contactDetail.slice'
import {
    AddFunctionBodyParams,
    EditFunctionBodyParams,
    FunctionOverviewObj,
} from '@app-types/ContactDetailResponse.types'
import { RootState } from '@store/store'
import { useLocation } from 'react-router-dom'

import FormicCommonInputDate from '@shared/components/CommonInputDate/FormicCommonInputDate'
import FormikCommonRadioGroup from '@shared/components/CommonRadioGroup/FormikCommonRadioGroup'

import {
    handleGender,
    handleHoldings,
    handlefunctionClassification,
    handlefunctionLevel,
} from '@contacts/store/contactStore/contact.slice'

interface PropType {
    openPopUp: boolean
    handleClose: () => void
    experienceData: FunctionOverviewObj | null
    isDesktop: boolean
}

interface FormValues {
    idFunction: number
    Companyname: number
    Functionname: string
    Functionclassification: number
    FunctionLevel: number
    Currentfunction: boolean
    startdate: string
    enddate: string
    Mainfunction: boolean
}

const AddorEditExperience: React.FC<PropType> = ({ openPopUp, handleClose, experienceData, isDesktop }) => {
  
    const dispatch = useDispatch()
    const location = useLocation()
    const { idContact } = location.state  


    useEffect(() => {
        dispatch(handlefunctionClassification())
        dispatch(handlefunctionLevel())
        dispatch(handleHoldings())
        dispatch(handleGender())
    }, [])
  

    const functionClassification = useSelector((state: RootState) => state.contact.functionClassificationData)
    const functionLevel = useSelector((state: RootState) => state.contact.functionLevelData)
    // const userInfo = useSelector((state: RootState) => state.authentication.getUserInfoData)
    const holdingsData = useSelector((state: RootState) => state.contact.HoldingsData)

    const [headerLabel, setHeaderLabel] = useState('')
    const [footerLabel, setFooterLabel] = useState('')
    // const [value, setValue] = React.useState('female')
    const [editExperienceData, setEditExperienceData] = useState(experienceData)
    const [isMainFunction, setIsMainFunction] = useState(editExperienceData ? editExperienceData.currentFunction : true)
    const [disableCompanyName, setDisableCompanyName] = useState(false)
    // const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'))

    // useEffect(()=>{

    // },[setIsMainFunction])

 

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

   

    const formicClassificationDropdown = functionClassification?.map((item) => {
        return {
            label: item.name,
            value: item.idFunctionClassification,
        }
    })

    const initialValues = {
        idFunction: editExperienceData ? editExperienceData.idfunction : 0,
        Companyname: editExperienceData ? editExperienceData.idorgnization : 0,
        Functionname: editExperienceData ? editExperienceData.functionName : '',
        Functionclassification: editExperienceData ? editExperienceData.classification : 0,
        FunctionLevel: editExperienceData ? editExperienceData.idfunctionlevel : 0,
        Currentfunction: editExperienceData ? editExperienceData.currentFunction : true,
        startdate: editExperienceData ? moment(editExperienceData.startdate, 'MM/DD/YYYY').format('YYYY-MM-DD') : '',
        // enddate: editExperienceData?.enddate
        //     ? moment(editExperienceData.enddate, 'MM/DD/YYYY').format('YYYY-MM-DD')
        //     : '',
            enddate:editExperienceData?.enddate === "Current Function"
            ? ''
            : (editExperienceData?.enddate
                ? moment(editExperienceData.enddate, 'MM/DD/YYYY').format('YYYY-MM-DD')
                : (editExperienceData?.enddate === null
                    ? ''
                    : '')),
            
        Mainfunction: editExperienceData ? editExperienceData.mainFunction : false,
    }
   

    const validationSchema = Yup.object({
        Companyname: Yup.number()
            .required('Company is required')
            .test('notZero', 'Please select a company', (value) => value !== 0),
        Functionname: Yup.string().required('Function name field required'),
       

        enddate: 
        
        Yup.date().when('Currentfunction', (Currentfunction, schema) => {
            if (!isMainFunction) {
                return schema.test(
            'endDateAfterStartDate',
            'End date must be greater than or equal to start date',
            function (value) {
                const startDateValue = this.parent.startdate // Access the end date value

                if (value && startDateValue) {
                    return new Date(value) >= new Date(startDateValue)
                }
                return true // No validation needed if one of the dates is missing
            }
        )

    }
    return schema
}),



        
    })

    useEffect(() => {
        if (experienceData) {
            setHeaderLabel('Edit experience')
            setFooterLabel('SAVE')
            // setDisableEmail(true)
            setDisableCompanyName(true)
        } else {
            setHeaderLabel('Add experience')
            setFooterLabel('Save')
            // setDisableEmail(false)
            setDisableCompanyName(false)
        }
    }, [experienceData])

    useMemo(() => {
        setEditExperienceData(experienceData)
    }, [experienceData])

    const handleSubmit = (values: FormValues): void => {
        const username = localStorage.getItem('user name')

        if (!editExperienceData) {
            const initialAddFunction: AddFunctionBodyParams = {
                idfunction: 0,
                functionName: values.Functionname,
                isPrimary: 0,
                organization: values.Companyname,
                spotterId: 'string',
                idFunctionClassification: values.Functionclassification,
                idFunctionLevel: values.FunctionLevel,
                currentFunction: values.Currentfunction,
                mainFunction: values.Mainfunction,
                idPerson: idContact,
                events: true,
                clipper: true,
                magazine: true,
                secretary: 0,
                startdate: values.startdate ? values.startdate : new Date().toISOString(),
                enddate: isMainFunction
                    ? new Date().toISOString()
                    : values.enddate !== ''
                    ? values.enddate
                    : new Date().toISOString(),
                username: username ?? '',
            }

            dispatch(handleAddFunction(initialAddFunction))     
        } else {
            const initialEditFunction: EditFunctionBodyParams = {
                idfunction: values.idFunction,
                functionName: values.Functionname,
                isPrimary: 0,
                organization: values.Companyname,
                spotterId: 'string',
                idFunctionClassification: values.Functionclassification,
                idFunctionLevel: values.FunctionLevel,
                currentFunction: values.Currentfunction,
                mainFunction: values.Mainfunction,
                idPerson: idContact,
                events: true,
                clipper: true,
                magazine: true,
                secretary: 0,
                startdate: values.startdate ? values.startdate : new Date().toISOString(),
                enddate: isMainFunction
                    ? new Date().toISOString()
                    : values.enddate !== 'Invalid date' && values.enddate !== ''
                    ? values.enddate
                    : new Date().toISOString(),
                username: username ?? '',
            }

            dispatch(handleEditFunction(initialEditFunction))
        }

        handleClose()
    }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     // setValue((event.target as HTMLInputElement).value)
    // }

    return (
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
                useEffect(() => {
                    setIsMainFunction(formikProps.values.Currentfunction)
 
                   
                    if (!formikProps.values.Currentfunction) {
                        formikProps.values.Mainfunction = false
                       
                        // formikProps.values.Currentfunction=false
                    }
                    else {
                        formikProps.values.enddate=''
                        
                    }
                }, [formikProps.values.Currentfunction])  
  
                return (
                    <PopUp
                        open={openPopUp}
                        handleClose={() => {
                            formikProps.resetForm()
                            handleClose()
                        }}
                        headerLabel={headerLabel}
                        footerBtnLabel={footerLabel}
                        BtnIconRequired={true}
                        isDesktop={isDesktop}
                        submitHandler={() => {}}
                        isMember={false}
                    >
                        <Form>
                            <div className={styles.makeFlexBox}>
                                <div>
                                    <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Company name*</label>
                                        <br />
                                        <FormicDropdown
                                            placeholder="Select company..."
                                            options={MultiSelectHoldingData ?? []}
                                            onSelectHandler={() => {}}
                                            name="Companyname"
                                            isDesable={disableCompanyName}
                                        />
                                    </div>

                                    <FormicCommonInputField
                                        label="Function name*"
                                        placeholder="Enter function name"
                                        name="Functionname"
                                        emailValid={false}
                                        isDisabled={false}
                                    />

                                    <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Function classification</label>
                                        <br />
                                        <FormicDropdown
                                            placeholder="Select Function classification..."
                                            options={formicClassificationDropdown ?? []}
                                            onSelectHandler={() => {}}
                                            name="Functionclassification"
                                        />
                                    </div>
                                    <div className={styles.popUp_title}>Function level</div>
                                    <FormikCommonRadioGroup options={FunctionLevelData ?? []} name="FunctionLevel" />

                                    <div className={styles.container_div}>
                                        <div className={styles.preferences_text}>Current function</div>
                                        <FormicSwitch placeholder="" name="Currentfunction" />
                                    </div>

                                    <div className={styles.container_div}>
                                        <FormicCommonInputDate name="startdate" label="Start date" />
                                    </div>

                                    {!isMainFunction && (
                                        <div className={styles.container_div}>
                                            <FormicCommonInputDate name="enddate" label="End date" />
                                        </div>
                                    )}
                                    {!(
                                        editExperienceData?.countfunction === 0 ||
                                        editExperienceData?.countfunction === 1 
                                    ) && (formikProps.values.Currentfunction) && (
                                        <div className={styles.container_div}>
                                            <div className={styles.preferences_text}>Main function</div>
                                            <FormicSwitch placeholder="" name="Mainfunction" />
                                            {(formikProps.values.Currentfunction &&formikProps.values.Mainfunction)&& (
                                                <div className={styles.mainFunctionText}>
                                                There is one single current function and therefore will be the main
                                                function.
                                            </div>
                                            ) }
                                            
                                        </div>
                                    )}
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
                                        startIcon={!experienceData && <img src={addUser} alt=""></img>}
                                        className={styles.button_tag}
                                        // onClick={submitHandler}
                                        type="submit"
                                    >
                                        {footerLabel}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </PopUp>
                )
            }}
        </Formik>
    )
}

export default AddorEditExperience
