import React from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import { Field, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { object, string, mixed, number, boolean } from 'yup';
import useWebAnimations, { backInLeft } from '@wellyshen/use-web-animations';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import FormikForm from './FormikForm';
import FormikStep from './FormikStep';

const process = (time: number) => new Promise(acc => setTimeout(acc, time));

const useStyles = makeStyles({
    card: {
       width: "23.5rem",
       height: "34rem",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       marginTop: "1.15rem"
    }
})

function Main() {
    const classes = useStyles();
    const theme = useTheme();
    
    const cardAnimation = useWebAnimations({ ...backInLeft });

    return (
        <Card className={classnames(classes.card, "card")} ref={cardAnimation.ref}>
            <CardContent>
                <FormikForm
                    initialValues={{
                        firstName    : "",
                        lastName     : "",
                        email        : "",
                        millionarie  : false,
                        money        : 0,
                        address      : "",
                        description  : "",
                        agreeTnC     : false,
                    }}
                    onSubmit={async (values) => {
                        await process(3000);
                        console.log("values", values);
                    }}
                >
                    <FormikStep
                        validationSchema={
                            object({
                                firstName : string()
                                .max(30, 'Must be atmost 30 character')
                                .min(2, 'Must have atleast 2 characters')
                                .required('Must be filled'),
                                lastName  : string()
                                .max(30, 'Must be atmost 30 character')
                                .min(2, 'Must have atleast 2 characters')
                                .required('Must be filled'),
                                email     : string()
                                .email('Must be a valid email')
                                .max(30, 'Must be atmost 30 character')
                                .min(5, 'Must be atleast 5 characters')
                                .required('Must be filled'),
                            })
                        }    
                        label="Personal Data"
                    >
                        <Box paddingBottom={1}>
                            <Field fullWidth name='firstName' component={TextField} label="First Name"/>
                        </Box>

                        <Box paddingBottom={1}>
                            <Field fullWidth name='lastName' component={TextField} label="Last Name"/>
                        </Box>
                        
                        <Box paddingBottom={1}>
                            <Field fullWidth name='email' component={TextField} label="Email"/>
                        </Box>

                        <Box paddingBottom={1}>
                            <Field name='millionarie' type="checkbox" component={CheckboxWithLabel} Label={{label: "I'm a Millionarie"}}
                                   color={theme.palette.type === "light" ? "primary" : "secondary"}
                            />
                        </Box>
                    </FormikStep>


                    <FormikStep
                        validationSchema={
                            object({
                                money: mixed().when("millionarie", {
                                    is: true,
                                    then: number().required('Must be filled').min(1_000_000, `You say you're a millionarie so put atleast 1 million`),
                                    otherwise: number().min(1, 'Atleast some amount').required('Must be filled')
                                }),
                                address : string()
                                .max(50, 'Must be atmost 50 character')
                                .min(10, 'Must be atleast 10 characters')
                                .required('Must be filled'),
                            })
                        }
                        label="Bank Account"
                    >
                        <Box paddingBottom={2}>
                            <Field fullWidth name='money' type="number" component={TextField} label="Money"/>
                        </Box>

                        <Box paddingBottom={2}>
                            <Field fullWidth name='address' component={TextField} label="Address"/>
                        </Box>
                    </FormikStep>


                    <FormikStep
                        validationSchema={
                            object({
                                description: string()
                                .min(10, 'Must be greater than 10 character')
                                .max(25, 'Must be shorter than 25 character')
                                .required('Must be filled'),
                                agreeTnC: boolean()
                                .oneOf([true], 'Must be agree to terms & conditions')
                            })
                        }
                        label="More Info"
                    >
                        <Box paddingBottom={2}>
                            <Field fullWidth name='description' component={TextField} label="Description"/>
                        </Box>

                        <Box paddingBottom={2}>
                            <Field name='agreeTnC' type="checkbox" component={CheckboxWithLabel} Label={{label: "I agree to terms & conditions"}}
                                   color={theme.palette.type === "light" ? "primary" : "secondary"}
                            />
                            <ErrorMessage name='agreeTnC' component="p" className={classnames("agreeTnC", "TnCred")}/>
                        </Box>
                    </FormikStep>
                </FormikForm>
            </CardContent>
        </Card>
    )
}

export default Main;