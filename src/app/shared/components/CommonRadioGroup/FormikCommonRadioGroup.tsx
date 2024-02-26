import React from 'react'

import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import { useField } from 'formik'
import ValidationError from '@shared/components/ValidationError/ValidationError'

interface optionType {
    label: string
    value: number
}
interface PropsType {
    options: optionType[]
    name: string
}

const FormikCommonRadioGroup: React.FC<PropsType> = ({ options, name }) => {
    const [field, meta] = useField(name)
    // console.log('dropdown value', field)

    return (
        <>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name={name}
                value={field.value}
                onChange={(e) => {
                    field.onChange(e)
                }}
            >
                {options?.map((item) => (
                    <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio size="small" />}
                        label={item.label}
                    />
                ))}
            </RadioGroup>
            {meta.touched && meta.error ? <ValidationError validationMessage={meta.error} /> : null}
        </>
    )
}

export default FormikCommonRadioGroup
