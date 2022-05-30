import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  spinner: {
    margin: "auto",
  },
  title: {
    margin: "0.5rem 0",
  },
  heading: {
    //color: "#477998",
    color: "#A7BDDB",
    margin: "1rem 0",
  },
  image: {
    marginLeft: "1.5rem",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  links: {
    textDecoration: "none",
    color: "#303F9F",
    "&:hover": {
      color: "#F50057",
    },
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop: 10,
    marginInline: 8
  },
  marginBig: {
    margin: "30px 0",
  },
  circularProgress: {
    marginLeft: "50%",
    marginTop: "10%",
  },
  goBackBtn: {
    borderRadius: "0.3rem",
    padding: "8px 18px",
    margin: "1rem 0",
    backgroundColor: "#9CD4F0",
    "& a": {
      fontSize: "0.95rem",
      textDecoration: "none",
      color: "#3A6185",
    },
    "&:hover": {
      backgroundColor: "#3A6185",
      "& a": {
        color: "#FFFFFF",
      }
    },
  },
  centeredContent: {
    textAlign: "center",
    margin: "1rem auto !important",
  },
}));
