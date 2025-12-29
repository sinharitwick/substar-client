import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import Subscription from '../components/Subscription';

function SubscriptionsPage() {
    let params = useParams();
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        const getSubscriptions = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/subscriptions`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                    params: {
                        category: params.category,
                    }
                });
                setSubscription(response.data);
            } catch (error) {
                console.log('Failed to fetch subscriptions', error);
            }
        }
        getSubscriptions();
    }, [])
  return (
    <div>
        <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}> {params.category} Subscriptions</Typography>
        { subscription.map((sub: any) => (
            <Subscription sub={sub} />
        ))}
    </div>
  )
}

export default SubscriptionsPage