import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

import Icon from "./icon";
import Input from "./Input";

// import useStyles from "./styles";

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setShowPassword(false);
        setIsSignup(prevIsSignup => !prevIsSignup);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", data: { result, token } });
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (err) => {
        console.log(err);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="149726347375-3tevdbu0vo55vno72vhmsch2jnqvkfva.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have a account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;