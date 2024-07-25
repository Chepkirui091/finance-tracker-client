import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginForm from "@/components/@page-components/login/login-form";
import styles from "@/styles/Home.module.css";

const Login = () => {
    return (
        <div className={styles.container}>
            <Grid container spacing={4} alignItems={'center'}>
                <Grid item xs={12}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        p: { md: 6, sm: 2, xs: 2 }
                    }}>
                        <LoginForm />
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
                            <Typography>
                                {"Are you a new customer?"}
                            </Typography>
                            <Button variant={'outlined'} color={'primary'}>
                                {"Enroll Now"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
