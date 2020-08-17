import React, {useState, useEffect} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel,  Checkbox, Link, Grid, Box, Typography, Container}  from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const navigate=useNavigate();

  const [userJson, setUserJson] = useState({firstName : "", lastName : "", email : "", password : ""});
  const [submitFlag, setSubmitFlag]=useState(false);
  const emailRegx=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const goToUrl = (url) => {
      navigate(url, { replace: true });
  }

  const handleChange = (e) =>
  {
    let k=e.target.name;
    let v=e.target.value;
    const updatedJson = {...userJson};
    updatedJson[k]=v;
    setUserJson({...updatedJson});
  }

  const handleRegister = () => {
    debugger;
    setSubmitFlag(true);
    if(userJson.firstName && userJson.lastName && userJson.email && emailRegx.test(userJson.email) && userJson.password)
    {
      goToUrl('/signin')
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                value={userJson.firstName}
                variant="outlined"
                fullWidth
                label="First Name"
                autoFocus
                error={submitFlag && !userJson.firstName}
                onChange={handleChange}
                helperText={(submitFlag && !userJson.firstName) ? "Required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="lastName"
                value={userJson.lastName}
                error={submitFlag && !userJson.lastName}
                onChange={handleChange}
                helperText={(submitFlag && !userJson.lastName) ? "Required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                value={userJson.email}
                error={(submitFlag && !userJson.email) || (submitFlag && !emailRegx.test(userJson.email))}
                onChange={handleChange}
                helperText={(submitFlag && !userJson.email) ? "Required" : (submitFlag && !emailRegx.test(userJson.email)) ? "Invalid Mail" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userJson.password}
                error={submitFlag && !userJson.password}
                onChange={handleChange}
                helperText={(submitFlag && !userJson.password) ? "Required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={(e)=> goToUrl('/signin')}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default SignUp