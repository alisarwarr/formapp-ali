import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

interface StepperProps {
    step          : number;
    childrenArray : any[];
    completed     : boolean;
}

function MUIStepper({ step, childrenArray, completed }: StepperProps) {
    return (
        <Stepper alternativeLabel activeStep={step}>
            {
                childrenArray.map((x, index) => (
                    <Step key={index} completed={(step > index) || completed}>
                        <StepLabel> {x.props.label} </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    )
}

export default MUIStepper;