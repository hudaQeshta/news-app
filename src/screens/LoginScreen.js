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
import { clearError, login } from "../store/auth.store";
import news from "../logo.svg";
import { NAVIGATION_PATHNAMES } from "../constants";
const LoginScreen = ({ }) => {
  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthed } = auth;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
		if (error) {
			setTimeout(() => {
				dispatch(clearError())
			}, 5000)
		}
	}, [error])

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

            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={submitHandler}
            >
              <Typography className={classes.title} align="center" variant="h6">
                Log in to find out some news
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
                    height="50"
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                name="password"
                variant="outlined"
                className={classes.marginBig}
                label="Password"
                fullWidth
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
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
                Log in
              </Button>
              <p>
                New here?{" "}
                <Link className={classes.links} to={NAVIGATION_PATHNAMES.REGISTERSCREEN}>
                  Create an Account
                </Link>
              </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
