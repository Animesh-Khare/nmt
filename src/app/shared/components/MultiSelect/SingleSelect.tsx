import React, { useState } from 'react'
import Select from 'react-select'
import ValidationError from '@shared/components/ValidationError/ValidationError'

// import { OptionType } from '@app-types/UserResponse.types'

interface optionType {
    label: string
    value: number
}

interface option {
    label: string
    value: number
}

interface PropsType {
    onSelectHandler: (item: { label: string; value: number }) => void
    options: option[] | null
    defaultValues: optionType | null
    // isMulti: boolean
    isValid: boolean
}

const SingleSelect: React.FC<PropsType> = ({ onSelectHandler, options, defaultValues, isValid }) => {
    const optionList = [{ value: 0, label: '' }]
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const multiOption= options?.map(item=>{
    //     return {
    //         value: item.id,
    //         label: item.name
    //     }
    // })

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            border: state.isFocused ? 'none' : '1px solid #9a9fa5',
            boxShadow: state.isFocused ? '0px 0px 0px 2px #dbf2fb, inset 0px 0px 0px 1px #77cbed' : 'none',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'whitesmoke',
        }),

        multiValue: (styles: any) => {
            return {
                ...styles,
                backgroundColor: '#EE7000',
                color: 'whitesmoke',
            }
        },

        multiValueLabel: (styles: any) => ({
            ...styles,
            color: 'whitesmoke',
        }),
    }

    function handleSelect(data: any): void {
        if (data.value !== 0) {
            setSelectedOptions(data)
            // const selectedData=data.map((item:optionType)=>item.value);
            onSelectHandler(data)
            setIsMenuOpen(false) // Close the menu
        }
    }

    return (
        <div>
            <Select
                options={options ?? optionList}
                // isMulti = {isMulti}
                placeholder="Select country .."
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                closeMenuOnSelect={false}
                styles={customStyles}
                menuIsOpen={isMenuOpen}
                onMenuOpen={() => {
                    setIsMenuOpen(true)
                }} // Open the menu
                onMenuClose={() => {
                    setIsMenuOpen(false)
                }} // Close the menu
            />
            {!isValid ? <ValidationError validationMessage={'Required'} /> : null}
        </div>
    )
}

export default SingleSelect
