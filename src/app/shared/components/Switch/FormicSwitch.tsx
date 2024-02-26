import React from 'react'
import Switch from '@mui/material/Switch'
import { useField } from 'formik';

const switchTextStyles = {
    color: 'var(--dark-900, #11151b)',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  };

  interface PropType{
    placeholder: string
    name: string
    onToggle?: (value: boolean) => void; // Add this prop for the callback
  }


const FormicSwitch: React.FC<PropType> = ({placeholder,name,onToggle}) => {
    // const label = { inputProps: { 'aria-label': 'Switch demo' } }
    const [field] = useField(name);

    const handleSwitchToggle = ():void => {
      const newValue = !field.value;
      field.onChange({ target: { value: newValue, name: field.name } }); // Manually update the field value
      if (onToggle) {
        onToggle(newValue); // Call the callback to update the parent's state
      }
    };
  

   

    return (
        <div>
            <Switch {...field} checked={field.value} onChange={handleSwitchToggle} />
            <span style={switchTextStyles}>{placeholder}</span>
        </div>
    )
}

export default FormicSwitch
