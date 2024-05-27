import React from 'react';
import {FormControl,FormLabel,Input,Textarea,InputGroup,InputRightElement,Switch, Select} from '@chakra-ui/react';

export const FormInput = ({
  label, value,onChange,isTextArea = false, mb, rightElement, ...props
}) => (
  <FormControl>
    <FormLabel mb={mb}>{label}</FormLabel>
    {isTextArea ? (
      <Textarea value={value} onChange={onChange} {...props} />
    ) : (
      <InputGroup>
        <Input value={value} onChange={onChange} {...props} />
        {rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
    )}
  </FormControl>
);


export const FormSwitch = ({ label, isChecked, onChange, ...props }) => (
  <FormControl display="flex" alignItems="center" justifyContent="start">
    <FormLabel mb="0">{label}</FormLabel>
    <Switch isChecked={isChecked} onChange={onChange} {...props} />
  </FormControl>
);

export const FormSelect = ({ label, value, onChange, options, ...props }) => (

    <FormControl >
      <FormLabel style={{ whiteSpace: 'nowrap' }}>{label}</FormLabel> 
      <Select value={value} onChange={onChange} {...props}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Select>
    </FormControl>
  );

