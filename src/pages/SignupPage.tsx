import { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';

function SignupPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        userName: '',
    });
    const handleCredentialsChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const signup = async(e: any) => {
        e.preventDefault();
        try {
            const { email, password, userName } = credentials;
            await axios.post(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/auth/signup`, { email, password, userName });
            navigate('/');
        } catch (error) {
            console.log('Signup failed', error);
        }
    }
  return (
    <Grid container sx={{ border: '0.5px solid silver' }}>
        <Grid display= 'flex' flexDirection='column' p={2} justifyContent='center'>
            <Typography fontWeight='bold' variant='h3' sx={{ fontFamily: 'monospace', mb: 1 }}>Substar</Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
                Sign up to manage all your subscriptions
            </Typography>
            <TextField name='email' value={credentials.email} onChange={handleCredentialsChange} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} fullWidth margin='dense' label='Email address' type='email' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <TextField name='password' value={credentials.password} onChange={handleCredentialsChange} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} fullWidth margin='dense' label='Password' type='password' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <TextField name='userName'  value={credentials.userName} onChange={handleCredentialsChange} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} fullWidth margin='dense' label='username' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <Button onClick={signup} fullWidth variant='contained' size='small' sx={{ mt: 1, backgroundColor: '#4a5df9' }}>
                <Typography textTransform='initial' variant='button'>Sign Up</Typography>
            </Button>
            <Typography variant='caption' sx={{ mt: 2 }}>
                    By signing up, you agree to our Terms and Privacy Policy.
            </Typography>
            <Typography variant='body2' sx={{ mt: 2 }}>
                Have an account?{' '}
                <Link to={'/'}>
                    <Typography variant='body2' component='span' color='primary' sx={{ cursor: 'pointer' }}>
                        Log In
                    </Typography>
                </Link>
            </Typography>
        </Grid>
    </Grid>
  )
}

export default SignupPage