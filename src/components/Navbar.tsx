import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/');
    }
  return (
    <AppBar position='fixed' color='transparent' elevation={0} sx={{ textAlign: 'left' }}>
        <Toolbar>
            <Typography fontWeight='bold' variant='h6' component='div' sx={{ fontFamily: 'monospace', flexGrow: 1}}>
                Substar
            </Typography>
            <IconButton onClick={handleLogout} color='inherit'>
                <LogoutIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar