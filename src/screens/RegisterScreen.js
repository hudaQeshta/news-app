import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "../styles";
import { clearError, register } from "../store/auth.store";
import news from "../logo.svg";
import { EMAIL_REGEX, NAVIGATION_PATHNAMES } from "../constants";
const RegisterScreen = ({  }) => {

  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthed } = auth;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.email || formData.email === "" || !formData.email.match(EMAIL_REGEX)) {
      setMessage("Please enter a valid email, example: email@email.com");
    }
    if (formData.password.length < 8) {
      setMessage("Your password is less than 8 characters");
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
    } else if (
      formData.password === formData.confirmPassword &&
      formData.password.length > 8
    ) {
      dispatch(register({ email: formData.email, password: formData.password }));
    }
  };

  useEffect(() => {
		if (error || (message && message !== "")) {
			setTimeout(() => {
				dispatch(clearError())
        setMessage(null)
			}, 5000)
		}
	}, [error, message])

  return (
    <>
      { isAuthed && <Navigate to={NAVIGATION_PATHNAMES.HOMESCREEN} replace/> }
      { loading && (
        <Box>
          <CircularProgress
            color="secondary"
            left={-20}
            top={-20}
            className={classes.circularProgress}
          />
        </Box>
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "97.5vh" }}
      >
        <Grid item xs={11} sm={6} lg={4}>
          <Paper className={classes.paper}>
            { error && <Alert severity="error">{error}</Alert> }
            { message && <Alert severity="error">{message}</Alert> }
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={submitHandler}
            >
              <Typography className={classes.title} align="center" variant="h6">
                Sign up to find out some news
              </Typography>
              <Link className={classes.links} to="/">
                <Typography
                  className={classes.heading}
                  variant="h3"
                  align="center"
                >
                  What's New
                  <img
                    className={classes.image}
                    src={news}
                    alt="logo"
                    height="40"
                  />
                </Typography>
              </Link>
              <TextField
                name="email"
                className={classes.marginBig}
                variant="outlined"
                label="Email Adress"
                fullWidth
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <TextField
                name="password"
                variant="outlined"
                className={classes.marginBig}
                label="Password"
                fullWidth
                required
                type="password"
                helperText="Your password must be more than 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <TextField
                name="confirmPassword"
                variant="outlined"
                className={classes.marginBig}
                label="Confirm Password"
                fullWidth
                required
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Sign Up
              </Button>
              <p>
                Already joined?{" "}
                <Link className={classes.links} to={NAVIGATION_PATHNAMES.LOGINSCREEN}>
                  Sign In to your account.
                </Link>
              </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterScreen;
