import React from 'react';
import { FormikConfig, FormikValues } from 'formik';
                    //'pick' ko use karne se sir us k baad aane wale ko pakrega jese 'children'
export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string;  //ye label khud se crate kia hai
}

function FormikStep({ children }: FormikStepProps) {
    return (
        <>
            {
                children
            }
        </>
    )
}

export default FormikStep;