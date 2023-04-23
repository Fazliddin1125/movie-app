import React from 'react'
import { TextFieldProps } from './text-filed.props'
import { } from 'formik'
import { FieldHookConfig, useField, ErrorMessage } from 'formik'

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
    const [filed, meta, helpers] = useField(props)

    return (
        <>
            <label className={`inline-block w-full ${meta.touched && meta.error && 'border-red-500 border-2'}`}>
                <input {...props} {...filed} className="input" />

            </label >
            <span className=' text-red-500'><ErrorMessage name={filed.name} /></span>
        </>
    )
}

export default TextField