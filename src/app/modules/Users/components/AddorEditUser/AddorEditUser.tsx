import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

// shared component
import PopUp from '@shared/components/PopUp/PopUp'
import FormicDropdown from '@shared/components/Dropdown/FormicDropdown'
// import MultiSelect from '@shared/components/MultiSelect/MultiSelect'
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import { NimbleAutoComplete } from 'nimble-design-system'

import { handleAddUser, handleEditUser } from '@users/store/user.slice'
import { UserPostParams, userdisplay, OptionType, UserEditParams } from '@app-types/UserResponse.types'
import { RootState } from '@store/store'

// css
import styles from './AddorEditUser.module.css'

import Button from '@mui/material/Button'
import addUser from '@assets/images/addUser.svg'

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface PropType {
    openPopUp: boolean
    handleClose: () => void
    userData: userdisplay | null
    isDesktop: boolean
}

interface FormValues {
    name: string
    email: string
    authLevel: number
    // userRole: number[]
}

const AuthOptions = [
    {
        label: 'Admin',
        value: 1,
    },
    {
        label: 'User',
        value: 2,
    },
]

const AddorEditUser: React.FC<PropType> = ({ openPopUp, handleClose, userData, isDesktop }) => {
    const dispatch = useDispatch()
    const [userRole, setUserRole] = useState<number[]>([])
    const [editUserData, setEditUserData] = useState(userData)
    const [headerLabel, setHeaderLabel] = useState('')
    const [footerLabel, setFooterLabel] = useState('')
    const [disableEmail, setDisableEmail] = useState(false)

    useEffect(() => {
        if (userData) {
            setHeaderLabel('Edit user')
            setFooterLabel('SAVE')
            setDisableEmail(true)
        } else {
            setHeaderLabel('Create user')
            setFooterLabel('Create User')
            setDisableEmail(false)
        }
    }, [userData])

    const defaultUserRole =
        userData?.userrole.map((item) => {
            return { label: item.userrolename, value: item.roleid }
        }) ?? null

    const [defaultRole, setDefaultRole] = useState<OptionType[] | null>(defaultUserRole)

    //  console.log('default roles',defaultUserRole);

    useMemo(() => {
        setEditUserData(userData)
        const defaultUserRole =
            userData?.userrole.map((item) => {
                return { label: item.userrolename, value: item.roleid }
            }) ?? null

        setDefaultRole(defaultUserRole)
    }, [userData])

    const userRoleData = useSelector((state: RootState) => state.user.userRoleData)

    const userRoleDropdown = userRoleData?.map((item) => {
        return {
            label: item.name,
            value: item.id,
        }
    })

    // const multiSelectHandler = (item: number[]): void => {
    //     console.log('---->', item)
    //     setUserRole(item)
    // }  

    const nimbleMultiSelectHandler = (selectedArray: any): void => {
        const postdata = selectedArray.map((item: any) => {
            return item.value
        })

        setUserRole(postdata)
    }

    const initialValues = {
        name: editUserData ? editUserData.fullName : '',
        email: editUserData ? editUserData.email : '',
        authLevel:
            editUserData && editUserData.authorization === 'Admin'
                ? 1
                : editUserData && editUserData.authorization === 'User'
                ? 2
                : 0,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name field is required*'),
        email: Yup.string().matches(emailRegEx, 'Email is not valid*').required('Email field is required*'),
        authLevel: Yup.number()
            .required('Holding is required')
            .test('notZero', 'Auth level is required', (value) => value !== 0),
    })

    const handleSubmit = (values: FormValues): void => {
        const addUserParam: UserPostParams = {
            fullName: values.name,
            email: values.email,
            roleId: values.authLevel,
            message: '',
            roles: userRole,
        }

        if (!editUserData) dispatch(handleAddUser(addUserParam))
        else {
            const EditUserParam: UserEditParams = {
                idUser: editUserData.idUser,
                fullName: values.name,
                email: values.email,
                roleId: values.authLevel,
                message: '',
                roles: userRole,
            }
            dispatch(handleEditUser(EditUserParam))
        }

        handleClose()
    }

    // const resetData=()=>{
    //      resetForm(initialValues)
    // }

    return (
        <div>
            <Formik
                initialValues={{ ...initialValues }}
                validationSchema={validationSchema}
                // onSubmit={handleSubmit}
                //
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values)
                    resetForm({ values: { ...initialValues } })
                }}
                enableReinitialize
            >
                {(formikProps: FormikProps<FormValues>) => (
                    <PopUp
                        open={openPopUp}
                        //
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
                                    <FormicCommonInputField
                                        label="Name*"
                                        placeholder="Full name of the user..."
                                        name="name"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                    {/* {formikProps.resetForm} */}
                                    <FormicCommonInputField
                                        label="Email*"
                                        placeholder="Email of the user..."
                                        name="email"
                                        emailValid={true}
                                        isDisabled={disableEmail}
                                    />

                                    <div className={styles.container_div}>
                                        <label className={styles.label_tag}>Authorization level*</label>
                                        <br />
                                        <FormicDropdown
                                            placeholder="Select the authorization level..."
                                            options={AuthOptions}
                                            onSelectHandler={() => {}}
                                            name="authLevel"
                                        />
                                    </div>
                                    <div className={styles.container_div}>
                                        {/* <label className={styles.label_tag}>User role</label>
                                        <br />
                                        <MultiSelect
                                            onSelectHandler={multiSelectHandler}
                                            options={userRoleData}
                                            defaultValues={defaultRole}
                                            placeholder="Select Workspace authorization..."
                                        /> */}

                                        <NimbleAutoComplete
                                            activeBoxShadow="0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset"
                                            borderColor="#9A9FA5"
                                            chipColor="#EE7000"
                                            defaultValue={defaultRole ?? []}
                                            data={userRoleDropdown ?? []}
                                            hoverBoxShadow="0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #9A9FA5 inset"
                                            label="User role"
                                            labelSize={16}
                                            labelWeight="600"
                                            fontFamily="Raleway"
                                            multiple
                                            onBlur={function noRefCheck() {}}
                                            onChange={nimbleMultiSelectHandler}
                                            placeholder="Select Workspace authorization..."
                                            width="100%"
                                        />
                                    </div>
                                </div>
                                {/* <div className={styles.footer_div}>
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
                                        startIcon={!userData && <img src={addUser} alt=""></img>}
                                        className={styles.button_tag}
                                        // onClick={submitHandler}
                                        type="submit"
                                    >
                                        {footerLabel}
                                    </Button>
                                </div> */}
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
                                        startIcon={!userData && <img src={addUser} alt=""></img>}
                                        className={styles.button_tag}
                                        // onClick={submitHandler}
                                        type="submit"
                                    >
                                        {footerLabel}
                                    </Button>
                                </div>
                        </Form>
                    </PopUp>
                )}
            </Formik>
        </div>
    )
}

export default AddorEditUser
