import React from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router'

function LoginPage() {
  return (
    <Grid container spacing={2} >
        <Grid>
            <img src='https://thehubbackend.com/media/25858-subscription%20management%20software%20(1).avif' alt='login visual' width={400} style={{ borderRadius: '1rem' }} />
        </Grid>
        <Grid display= 'flex' flexDirection='column' p={2} justifyContent='center' alignItems='flex-start'>
            <Typography fontWeight='bold' variant='h3' sx={{ fontFamily: 'monospace', mb: 4 }}>Substar</Typography>
            <TextField sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} margin='none' label='Email address' type='email' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <TextField sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'silver' } } }} margin='dense' label='Password' type='password' size='small' required slotProps={{ input: { style: { color: 'inherit' } }, inputLabel: { style: { color: 'inherit' } } }} />
            <Button fullWidth variant='contained' size='small' sx={{ mt: 1, backgroundColor: '#4a5df9' }}>
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