import React, { useState } from 'react'
import Select from 'react-select'

import {UserRoleResponse, OptionType } from '@app-types/UserResponse.types'

interface optionType {
    label: string
    value: number
}

interface PropsType{
    onSelectHandler: (item:number[])=> void
    options: UserRoleResponse[] | null
    defaultValues : OptionType[] | null
    placeholder: string 
}

const MultiSelect: React.FC<PropsType> = ({onSelectHandler,options,defaultValues, placeholder}) => {
    const optionList = [{ value: 0, label: '' }]
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)

    const multiOption= options?.map(item=>{
        return {
            value: item.id,
            label: item.name
        }
    })

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
            color: '#A4C2DB',

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
            const selectedData=data.map((item:optionType)=>item.value);
            onSelectHandler(selectedData)
        }
    }

    return (
        <div>
            <Select
                options={multiOption ?? optionList}
                isMulti
                // placeholder="Select Workspace authorization..."
                placeholder={placeholder}
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                closeMenuOnSelect={false}
                  styles={customStyles}
            />
        </div>
    )
}

export default MultiSelect
