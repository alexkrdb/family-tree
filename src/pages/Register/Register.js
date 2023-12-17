import React, { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { Grid, Paper, Typography, TextField, Button, Link, Container } from '@mui/material';
import "../../index.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    dBirth: null,
    location: "",
    bio: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    dBirth: "",
    location: "",
  });

  const navigate = useNavigate();

  async function createUser(user) {
    const { email, password, fName, lName, dBirth, location, bio } = formData;

    const userDoc = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      createdAt: serverTimestamp(),
      chats: []
    };

    if (fName || lName || dBirth || location || bio) {
      userDoc.bio = {
        fName,
        lName,
        dBirth: dBirth ? new Date(dBirth) : null,
        location,
        bio
      };
    }

    await setDoc(doc(db, "users", user.uid), userDoc);
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value) ? "" : "Proszę wprowadzić poprawny adres email";
      case "password":
        return validatePassword(value) ? "" : "Hasło musi mieć co najmniej 6 znaków, w tym co najmniej jedną literę i jedną cyfrę";
      default:
        return "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    setErrors({
      ...errors,
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        createUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: fieldError,
    });
  };

  return (
    <Container className="loginRegister" component="main" maxWidth="xs">
      <Paper className="content" elevation={24}>
        <Typography variant="h4" gutterBottom>
          Rejestracja
        </Typography>
        <form onSubmit={onSubmit} style={{ width: "100%" }} className="form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Adres email"
                name="email"
                variant="outlined"
                fullWidth
                required
                onChange={handleInput}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Hasło"
                name="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleInput}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Imię"
                name="fName"
                variant="outlined"
                required
                fullWidth
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Nazwisko"
                name="lName"
                variant="outlined"
                fullWidth
                required
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                name="dBirth"
                variant="outlined"
                fullWidth
                required
                onChange={handleInput}
                error={!!errors.dBirth}
                helperText={errors.dBirth}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Miejscowość"
                name="location"
                variant="outlined"
                fullWidth
                onChange={handleInput}
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                type="text"
                label="Biografia"
                name="bio"
                variant="outlined"
                maxRows={5}
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Zarejestruj się
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link component={RouterLink} to="/login" variant="body2">
                Masz konto? Zaloguj się
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container >
  );
}
