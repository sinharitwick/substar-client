import { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import axios from 'axios'

function SubscriptionDialog({ open, onClose, category, onSuccess, showCategoryInput }: any) {
    const [subscriptionDetails, setSubscriptionDetails] = useState({
        serviceName: '',
        cost: '',
        category: category || '',
        billingCycle: 'MONTHLY',
        status: 'ACTIVE',
        renewalDate: dayjs(),
    });
    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setSubscriptionDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleDateChange = (date: any) => {
        setSubscriptionDetails(prevState => ({
            ...prevState,
            renewalDate: date,
        }))
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_SUBSTAR_API_BASE_URL}/subscriptions`, {
                ...subscriptionDetails,
                cost: parseFloat(subscriptionDetails.cost),
                renewalDate: subscriptionDetails.renewalDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                }
            });
            setSubscriptionDetails({
                serviceName: '',
                cost: '',
                category: category || '',
                billingCycle: 'MONTHLY',
                status: 'ACTIVE',
                renewalDate: dayjs(),
            });
            onClose();
            onSuccess();
        } catch (error) {
            console.log('Failed to add subscription', error);
        }
    }
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Add Subscription</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="serviceName"
                        name="serviceName"
                        label="Name"
                        type="text"
                        variant="standard"
                        value={subscriptionDetails.serviceName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="cost"
                        name="cost"
                        label="Cost (₹)"
                        type="number"
                        variant="standard"
                        value={subscriptionDetails.cost}
                        onChange={handleInputChange}
                    />
                    { showCategoryInput && (
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="category"
                            name="category"
                            label="Category"
                            type="text"
                            variant="standard"
                            value={subscriptionDetails.category}
                            onChange={handleInputChange}
                        />
                    )}
                    <Select
                        name="billingCycle"
                        label="Billing Cycle"
                        value={subscriptionDetails.billingCycle}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={"MONTHLY"}>Monthly</MenuItem>
                        <MenuItem value={"YEARLY"}>Yearly</MenuItem>
                    </Select>
                    <Select
                        name="status"
                        label="Status"
                        value={subscriptionDetails.status}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={"ACTIVE"}>Active</MenuItem>
                        <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                        <MenuItem value={"CANCELLED"}>Cancelled</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Renewal Date" value={subscriptionDetails.renewalDate} onChange={handleDateChange} />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} variant='contained' color='error'>Cancel</Button>
                        <Button type='submit' variant='contained'>Add</Button>
                    </Box>
                </Box>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SubscriptionDialog