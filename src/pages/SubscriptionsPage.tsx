import { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { Fab, Typography } from '@mui/material';
import { useParams } from 'react-router';
import Subscription from '../components/Subscription';
import SubscriptionDialog from '../components/SubscriptionDialog';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

function SubscriptionsPage() {
    let params = useParams();
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const handleAddOpen = () => {
        setMode('create');
        setOpen(true);
    }
    const handleEditOpen = (sub :any) => {
        setSelectedSubscription(sub);
        setMode('update');
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
    }, [params.category]);
    const handleDeleteSubscription = async (subscriptionId: string) => {
    try {
            await axios.delete(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/subscriptions/${subscriptionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`
            }
            });
            setSubscriptions((prev: any) => prev.filter((s: { subscriptionId: string; }) => s.subscriptionId !== subscriptionId));
            toast.success("Subscription deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete subscription");
        }
    }
    const monthlyExpenses = useMemo(() => {
        return subscriptions.reduce((total: number, sub: any) => {
            if(sub.status === 'ACTIVE') {
                if(sub.billingCycle === 'MONTHLY') return total + sub.cost;
                return total + Math.round(sub.cost / 12);
            }
            return total;
        }, 0);
    }, [subscriptions]);
  return (
    <>
        <Navbar />
        <Typography fontWeight='bold' sx={{ fontFamily: 'monospace', mb: 2 }}>You're spending ₹{monthlyExpenses}/month on {params.category} subscriptions </Typography>
        <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 2 }}>Your {params.category} Subscriptions</Typography>
        { subscriptions.map((sub: any) => (
            <Subscription key={sub.subscriptionId} sub={sub} onOpenEditDialog={() => handleEditOpen(sub)} onDelete={() => handleDeleteSubscription(sub.subscriptionId)} />
        ))}
        <Fab onClick={handleAddOpen} size="small" aria-label="add" sx={{ mt: 2, fontSize: 24 }}>
            +
        </Fab>
        <SubscriptionDialog subscription={selectedSubscription} mode={mode} open={open} onClose={handleClose} category={params.category} onSuccess={getSubscriptions} showCategoryInput={false} />
    </>
  )
}

export default SubscriptionsPage