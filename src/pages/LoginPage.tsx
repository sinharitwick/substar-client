import { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const handleCredentialsChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const login = async(e: any) => {
        e.preventDefault();
        try {
            const { email, password } = credentials;
            const response = await axios.post(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/auth/login`, {email, password});
            const data = response.data;
            if(data?.token) {
                localStorage.setItem('auth-token', data.token);
                navigate('/categories');   
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    }
  return (
    <Grid container spacing={2} >
        <Grid>
            <img src='https://thehubbackend.com/media/25858-subscription%20management%20software%20(1).avif' alt='login visual' width={400} style={{ borderRadius: '1rem' }} />
        </Grid>
        <Grid display= 'flex' flexDirection='column' p={2} justifyContent='center' alignItems='flex-start'>
            <Typography fontWeight='bold' variant='h3' sx={{ fontFamily: 'monospace', mb: 4 }}>Substar</Typography>
            <TextField autoFocus name='email' value={credentials.email} onChange={handleCredentialsChange} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} margin='none' label='Email address' type='email' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <TextField name='password' value={credentials.password} onChange={handleCredentialsChange}  sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} margin='dense' label='Password' type='password' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <Button onClick={login} fullWidth variant='contained' size='small' sx={{ mt: 1, backgroundColor: '#4a5df9' }}>
                <Typography textTransform='initial' variant='button'>Log in</Typography>
            </Button>
            <Typography variant='body2' sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link to={'/signup'}>
                    <Typography variant='body2' component='span' color='primary' sx={{ cursor: 'pointer' }}>
                        Sign Up
                    </Typography>
                </Link>
            </Typography>
        </Grid>
    </Grid>
  )
}

export default LoginPage