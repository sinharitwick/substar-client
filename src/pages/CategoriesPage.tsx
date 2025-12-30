import { useEffect, useState } from 'react'
import { Box, Chip, Fab, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import SubscriptionDialog from '../components/SubscriptionDialog';

function CategoriesPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const getUserCategories = async() => {
      try {
            const response = await axios.get(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/subscriptions/categories`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                }
              }
            );
            setCategories(response.data);
        } catch (error) {
            console.log('Failed to fetch user categories', error);
        }
    }
    useEffect(() => {
      getUserCategories();
    }, []);
  return (
    <div>
        { categories.length > 0 && (
          <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}>Your Categories</Typography>
        )}
        { categories.map((category: string) => (
          <Chip key={category} label={category} variant="outlined" clickable sx={{ color: '#ffffff', ml: 1 }} onClick={() => navigate(`/subscriptions/${encodeURIComponent(category)}`)} />
        ))}
        { categories.length === 0 && (
          <Box>
            <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}>New to Substar? Get started by adding a subscription entry</Typography>
            <Fab onClick={() => setOpen(true)} size="small" color="primary" aria-label="add" sx={{ fontSize: 24 }}>
              +
            </Fab>
          </Box>
        )}
        <SubscriptionDialog open={open} onClose={handleClose} onSuccess={getUserCategories} showCategoryInput={true} />
    </div>
  )
}

export default CategoriesPage