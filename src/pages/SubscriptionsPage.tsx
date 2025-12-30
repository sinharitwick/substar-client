import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Fab, Typography } from '@mui/material';
import { useParams } from 'react-router';
import Subscription from '../components/Subscription';
import SubscriptionDialog from '../components/SubscriptionDialog';

function SubscriptionsPage() {
    let params = useParams();
    const [subscriptions, setSubscriptions] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
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
            setSubscriptions(response.data);
        } catch (error) {
            console.log('Failed to fetch subscriptions', error);
        }
    }
    useEffect(() => {
        getSubscriptions();
    }, [params.category])
  return (
    <div>
        <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}> {params.category} Subscriptions</Typography>
        { subscriptions.map((sub: any) => (
            <Subscription key={sub.subscriptionId} sub={sub} />
        ))}
        <Fab onClick={() => setOpen(true)} size="small" color="primary" aria-label="add" sx={{ fontSize: 24 }}>
            +
        </Fab>
        <SubscriptionDialog open={open} onClose={handleClose} category={params.category} onSuccess={getSubscriptions} />
    </div>
  )
}

export default SubscriptionsPage