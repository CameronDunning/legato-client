import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    padding: "5%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

export default function RegisterForm(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const register = e => {
    e.preventDefault();
    if (firstName && lastName && email && password && passwordConfirmation) {
      axios(`/api/${props.userType}s`, {
        method: "post",
        withCredentials: true,
        data: {
          [props.userType]: {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        }
      });
    } else {
      setError("Empty field!");
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card elevation={4} className={classes.card}>
        <Typography variant="h4">Register as a {props.userType}</Typography>

        <form className={classes.form}>
          <TextField
            error={error === "Empty field!" && firstName === ""}
            helperText={
              error === "Empty field!" && firstName === ""
                ? "Empty field!"
                : " "
            }
            variant="outlined"
            label="First Name"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            error={error === "Empty field!" && lastName === ""}
            helperText={
              error === "Empty field!" && lastName === "" ? "Empty field!" : " "
            }
            variant="outlined"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            error={error === "Empty field!" && email === ""}
            helperText={
              error === "Empty field!" && email === "" ? "Empty field!" : " "
            }
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            error={error === "Empty field!" && password === ""}
            helperText={
              error === "Empty field!" && password === "" ? "Empty field!" : " "
            }
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            error={error === "Empty field!" && passwordConfirmation === ""}
            helperText={
              error === "Empty field!" && passwordConfirmation === ""
                ? "Empty field!"
                : " "
            }
            variant="outlined"
            label="Password Confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={e => register(e)}
          >
            Register
          </Button>
        </form>
      </Card>
    </Container>
  );
}
