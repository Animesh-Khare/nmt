import * as React from 'react'

import { useEffect } from 'react'

import Box from '@mui/material/Box'

import Stepper from '@mui/material/Stepper'

import Step from '@mui/material/Step'

import StepLabel from '@mui/material/StepLabel'

import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'


interface propType {
    activeStepHandler: (value: number) => void

    children: React.ReactNode

    steps: string[]

    isAddMembership?:boolean
}

interface ChildComponentRef {
    // Define the function(s) you want to call from the parent here
    childFunction: () => void
    handleBack: () => void
}



const Steps: React.ForwardRefRenderFunction<ChildComponentRef, propType> = ({ children, activeStepHandler, steps,isAddMembership }, ref) => {
    const [activeStep, setActiveStep] = React.useState(0)



    useEffect(() => {
        activeStepHandler(activeStep)
    }, [activeStep])

    const isStepOptional = (step: number): boolean => {
        return step === 1
    }

    const handleNext = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = (): void => {
        setActiveStep(0)
    }

    const childFunction = (): void => {
        handleNext()
    }

    React.useImperativeHandle(ref, () => ({
        childFunction,
        handleBack,
    }))

    const stepStyle = {

        padding: 2,
        "& .Mui-active": {
          "&.MuiStepIcon-root": {
            color: "#0057A2",
            fontSize: "2rem",
          },

        },
        "& .Mui-completed": {
          "&.MuiStepIcon-root": {
            color: "#B4D74B",
            fontSize: "2rem",
          },

        },
        "& .MuiStepIcon-root": {
            fontSize: "2rem",
            color: "#B8DEFF",
          },

      }
 
    return (
        <Box sx={{ width: '100%' }}>
           
            <Stepper activeStep={activeStep} sx={stepStyle}  alternativeLabel={!isAddMembership}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                        optional?: React.ReactNode
                    } = {}
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption"></Typography>
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} >{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
           
           

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <br />
                    {children}
                </React.Fragment>
            )}
        </Box>
    )
}

export default React.forwardRef<ChildComponentRef, propType>(Steps)
