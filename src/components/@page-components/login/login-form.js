import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Alert, Button, Grid, Typography } from '@mui/material';
import DMTTextInput from '@/components/@shared-components/forms/text-input';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { sanitizeString } from '@/utils/helper-functions';
import DMTPasswordInput from '@/components/@shared-components/forms/password-input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NextLink from 'next/link';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router';
import { authApi } from '@/services/auth-apis';
import { useAuth } from '@/hooks/use-auth';

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [serverError, setServerError] = useState(null);

    const handleOnSubmit = async (values) => {
        try {
            const formData = {
                email: values.email,
                password: values.password,
            };
            const res = await authApi.login(formData);
            if (res.data.token) {
                await login(res.data);
                await router.push('/dashboard');
            }
        } catch (e) {
            if (e.response) {
                switch (e.response.status) {
                    case 400:
                        setServerError('Bad request. Please check your input.');
                        break;
                    case 401:
                        setServerError('Unauthorized. Incorrect email or password.');
                        break;
                    case 500:
                        setServerError('Internal server error. Please try again later.');
                        break;
                    default:
                        setServerError('An unknown error occurred. Please try again.');
                        break;
                }
            } else {
                setServerError('An error occurred. Please check your network connection.');
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            submit: null,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid Email Provided!')
                .required('Email is required!'),
            password: Yup.string().required('Password is required!'),
        }),
        onSubmit: handleOnSubmit,
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, sanitizeString(value));
    };

    const handleToggle = (e) => {
        formik.setFieldValue('rememberMe', e.target.checked);
    };

    return  (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // minHeight: '100vh',
                // width: '100%',

                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 100)',
                    borderRadius: 2,
                    boxShadow: 5,
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                }}
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={'h5'} align={'center'} gutterBottom>
                            {'Welcome Back'}
                        </Typography>
                        <Typography variant={'body2'} align={'center'} gutterBottom>
                            {'Sign in to your account'}
                        </Typography>
                        <Collapse in={Boolean(serverError)}>
                            {Boolean(serverError) && (
                                <Alert severity={'error'} variant={'standard'}>
                                    {serverError}
                                </Alert>
                            )}
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTTextInput
                            label={'Login ID'}
                            fullWidth={true}
                            autoFocus={true}
                            value={formik.values.email}
                            name="email"
                            type={'email'}
                            placeholder={'Enter your login ID...'}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPasswordInput
                            label={'Password'}
                            fullWidth
                            value={formik.values.password}
                            name="password"
                            placeholder={'Enter your password...'}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControlLabel
                            label="Remember Me"
                            control={
                                <Checkbox
                                    checked={formik.values.rememberMe}
                                    onChange={handleToggle}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            fullWidth={true}
                        >
                            {'Login'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <NextLink href={'/auth/forgot-password'}>
                            <Button variant={'text'} color={'primary'} fullWidth={true}>
                                {'Forgot Password'}
                            </Button>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LoginForm;
