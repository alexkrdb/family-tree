import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Link, Container } from '@mui/material';
import "../../index.scss";

export default function Login({defLocation="/"}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User authenticated with:", user.uid);
            navigate(defLocation);
        } catch (error) {
            setError('Nieudane logowanie. Sprawdź poprawność adresu email i hasła.');
            console.error(error.code, error.message);
        }
    };

    return (
        <Container className="loginRegister" component="main" maxWidth="xs">
            <Paper className="content" elevation={24} >
                <Typography variant="h4" gutterBottom>
                    Logowanie
                </Typography>
                <form onSubmit={onSubmit} style={{ width: '100%' }} className="form">
                    {error && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        label="Hasło"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Zaloguj się
                    </Button>
                    <Link component={RouterLink} to="/register" variant="body2">
                        Nie masz konta? Zarejestruj się
                    </Link>
                </form>
            </Paper>
        </Container>
    );
}
