import React, { useState } from 'react';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import { Button, CircularProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FormikStepProps } from './FormikStep';
import MUIStepper from './MUIStepper';

function FormikForm({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children);          //saray 'children' ko array mein returns karega
    const [ step, setStep ] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    //for form complete
    const [ completed, setCompleted ] = useState(false);

    const theme = useTheme();
    const screen335 = useMediaQuery('(max-width: 335px)');

    return (
        <Formik
            {...props}                                               //props hai whole form (Formik) ka
            validationSchema={currentChild.props.validationSchema}   //jo child ayega us waqt sirf uski validation dekhenge
            onSubmit={async (values, helpers) => {
                if(step === childrenArray.length -1) {
                    await props.onSubmit(values, helpers);           //onSubmit puray form ka hai last waale step pe call karenge
                    setCompleted(true);
                }
                else {
                    setStep(x => x + 1);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">                            {/* autoComplete="off" for history off */}
                    <div className="box">
                        <MUIStepper step={step} childrenArray={childrenArray} completed={completed}/>
                    </div>
                    {
                        currentChild
                    }
                    {
                        step > 0 &&
                            <Button
                                variant="contained"
                                color={theme.palette.type === "light" ? "primary" : "secondary"}
                                size={screen335 ? "small" : "medium"}
                                onClick={() => setStep(x => (x - 1))}
                                disabled={isSubmitting}
                            >
                                BACK
                            </Button>
                    }
                    <Button
                        variant="contained"
                        color={theme.palette.type === "light" ? "primary" : "secondary"}
                        size={screen335 ? "small" : "medium"}
                        type="submit"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
                    >
                        {
                            isSubmitting ? "SUMITTING" :
                            step === childrenArray.length -1 ? "SUBMIT" : "NEXT"
                        }
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default FormikForm;