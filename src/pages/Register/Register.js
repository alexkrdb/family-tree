import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    dBirth: null,
    country: "",
    location: "",
    bio: ""
  });

  const navigate = useNavigate();

  async function createUser(user) {
    const { email, password, fName, lName, dBirth, country, location, bio } = formData;

    const userDoc = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      createdAt: serverTimestamp(),
      chats: []
    };

    if (fName || lName || dBirth || country || location || bio) {
      userDoc.bio = {
        fName,
        lName,
        dBirth: dBirth ? new Date(dBirth) : null,
        country,
        location,
        bio
      };
    }

    await setDoc(doc(db, "users", user.uid), userDoc);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='form content'>

      <Paper elevation="24" sx={{ padding: "3rem" }}>
        <Typography variant="h4">Rejestracja</Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}><input type='text' name="email" placeholder='Email' required onChange={handleInput} /></Grid>
            <Grid item xs={12}><input type='password' name="password" placeholder='Password' required onChange={handleInput} /></Grid>
            <Grid item xs={6}><input type='text' name="fName" placeholder='First Name' onChange={handleInput} /></Grid>
            <Grid item xs={6}><input type='text' name="lName" placeholder='Surname' onChange={handleInput} /></Grid>
            <Grid item xs={12}><input type='date' name="dBirth" placeholder='date of birth' onChange={handleInput} /></Grid>
            <Grid item xs={6}> <input type='text' name="country" placeholder='Country' onChange={handleInput} /></Grid>
            <Grid item xs={6}><input type='text' name="location" placeholder='Location' onChange={handleInput} /></Grid>
            <Grid item xs={12}><input fullWidth multiline rows={4} type='text' name="bio" placeholder='Bio' onChange={handleInput} /></Grid>
            <Grid item xs={12}><button type="submit">Submit</button></Grid>
            <Grid item xs={12}><Link to="/login">Masz konto? Zarejestruj się</Link></Grid>
          </Grid>
          
          
        </form>
      </Paper>
    </div>
  );
}
