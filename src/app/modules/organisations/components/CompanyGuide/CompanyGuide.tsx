import React, { useRef, useMemo, useState } from 'react'
import styles from './CompanyGuide.module.css'
import { Hidden } from '@mui/material'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import FormicCommonInputField from '@shared/components/CommonInputField/FormicCommonInputField'
import Button from '@mui/material/Button'
import imjk from '@assets/images/CompanyGuideTab/Globe.svg'
import checkbutton from '@assets/images/CompanyGuideTab/checkButton.svg'
const CompanyGuide: React.FC = () => {
    const buttonsFromBackend = [
        { label: 'Button 1', icon: 'imjk', statebtnn:false },
        { label: 'Button 2', icon: 'checkbutton',statebtnn:true }]
    const [ButtonState, changebtnState] = useState(  buttonsFromBackend.map(button => button.statebtnn))
    const formikRef = useRef<FormikProps<any>>(null)
    // const initialValues = {}
    const validationSchema = Yup.object().shape({
        selectedButtons: Yup.array()
          .min(1, 'Please select at least one button')
          .required('At least one button must be selected'),
      });
    // const handleSubmit = (values: any): void => {
    //     console.log('Organisation Company guide submit btn is clicked ====>', values)
    // }
    useMemo(() => {
        if (formikRef.current) {
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
    }, [])
    // const changeButtonState = (): void => {
    //     changebtnState(!ButtonState)
    // }
    const toggleButtonState = (index:any):void => {
        const newButtonStates = [...ButtonState];
        newButtonStates[index] = !newButtonStates[index];
        changebtnState(newButtonStates);
          
      };

    return (
        <div className={styles.parent_div}>
            <Formik
                innerRef={formikRef}
                initialValues={ {selectedButtons: []}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // Update the selected buttons field when submitting the form
                    values.selectedButtons = buttonsFromBackend.map((button, index) => ({
                      label: button.label,
                      isSelected: ButtonState[index]
                    }));
            
             
                    // Perform further actions, such as sending data to backend
                  }}
                enableReinitialize
            >
                <Form>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <Hidden only={['xs']}>
                            <div style={{ width: '25%' }}>
                                <div>
                                    <span className={styles.Title}> General Information</span>
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Name"
                                        placeholder=""
                                        name="Name"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Twitter"
                                        placeholder=""
                                        name="Twitter"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Facebook"
                                        placeholder=""
                                        name="Facebook"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <FormicCommonInputField
                                        label="Linkedin"
                                        placeholder=""
                                        name="Linkedin"
                                        emailValid={false}
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div style={{ width: '25%' }}>
                                <div>
                                    <span className={styles.Title}> Market segments</span>
                                </div>
                                {buttonsFromBackend.map((item,index)=>(
                                    <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={()=>{toggleButtonState(index)}}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderColor: ButtonState[index] ? '#EE7000' : '#0057A2',
                                        color: ButtonState[index] ? '#EE7000' : '#0057A2',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={imjk}
                                            alt="Start Icon"
                                            width="20px"
                                            style={{
                                                filter: ButtonState[index]
                                                    ? 'invert(46%) sepia(95%) saturate(5683%) hue-rotate(10deg) brightness(97%) contrast(107%)'
                                                    : 'none',
                                            }}
                                        />
                                        <span style={{ marginLeft: '8px' }}>{item.label}</span>
                                    </div>
                                    {ButtonState[index] && <img src={checkbutton} alt="End Icon" width="20px" />}
                                </Button>
                                ))}
                                
                            </div>
                            {/* <button type="submit">Submit</button> */}
                        </Hidden>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
export default CompanyGuide
