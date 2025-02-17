import {FormikHandlers, FormikProps, FormikState, FormikValues} from 'formik'
import React from 'react'
import styled from 'styled-components'

interface Props {
    formik: FormikProps<FormikValues>
    name: string
    onChange?: FormikHandlers['handleChange']
    label?: string
    type?: string
}

const StyledInput = styled.input`
  border-width: 1px;
`

function InputWithError({label, formik: { values, errors, touched, handleChange }, name, onChange = handleChange, ...rest} : Props) {
    const formikTouched: any = touched;
    const formikErrors: any = errors;

    return (
        <div>
            <label htmlFor={name}>
                {label}
            </label>
            <StyledInput type="text" value={values[name]} onChange={onChange} name={name} {...rest} />
            <p>{formikTouched[name] && formikErrors[name]}</p>
        </div>
    )
}

export default InputWithError




