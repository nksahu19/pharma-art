import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {getVar, setVar} from '../../common/services/globalService'
import {useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(220, 0, 78)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userJson, setUserJson] = useState({ email: "", password: "" });
  const [submitFlag, setSubmitFlag] = useState(false);
  const emailRegx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const goToUrl = (url) => {
    navigate(url, { replace: true });
  }

  const handleLogin = () => {
    setSubmitFlag(true);
    if (userJson.email && emailRegx.test(userJson.email) && userJson.password) {
      goToUrl('/orders')
      setVar("authUser", {...userJson})
    }
  }

  const handleChange = (e) => {
    let k = e.target.name;
    let v = e.target.value;
    const updatedJson = { ...userJson };
    updatedJson[k] = v;
    setUserJson({ ...updatedJson });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userJson.email}
            error={(submitFlag && !userJson.email) || (submitFlag && !emailRegx.test(userJson.email))}
            onChange={handleChange}
            helperText={(submitFlag && !userJson.email) ? "Required" : (submitFlag && !emailRegx.test(userJson.email)) ? "Invalid Mail" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={userJson.password}
            error={submitFlag && !userJson.password}
            onChange={handleChange}
            helperText={(submitFlag && !userJson.password) ? "Required" : ""}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={(e) => goToUrl('/register')}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default SignIn