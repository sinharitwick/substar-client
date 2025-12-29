import React, { useEffect, useState } from 'react'
import { Chip, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';

function CategoriesPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
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
      getUserCategories();
    }, []);
  return (
    <div>
        <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}>Categories</Typography>
        { categories.map((category: string) => (
          <Chip key={category} label={category} variant="outlined" clickable sx={{ color: '#ffffff', ml: 1 }} onClick={() => navigate(`/subscriptions/${encodeURIComponent(category)}`)} />
        ))}
    </div>
  )
}

export default CategoriesPage