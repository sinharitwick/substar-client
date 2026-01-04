import { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
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
        <DialogTitle sx={{ fontFamily: 'monospace' }}>Add Subscription</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="serviceName"
                        name="serviceName"
                        label="Name"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={subscriptionDetails.serviceName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="cost"
                        name="cost"
                        label="Cost (₹)"
                        type="number"
                        variant="outlined"
                        size="small"
                        value={subscriptionDetails.cost}
                        onChange={handleInputChange}
                    />
                    { showCategoryInput && (
                        <TextField
                            required
                            fullWidth
                            id="category"
                            name="category"
                            label="Category"
                            type="text"
                            variant="standard"
                            value={subscriptionDetails.category}
                            onChange={handleInputChange}
                        />
                    )}
                    <FormControl fullWidth>
                        <InputLabel id="billingCycle-select-label">Billing Cycle</InputLabel>
                        <Select
                            labelId="billingCycle-select-label"
                            name="billingCycle"
                            label="Billing Cycle"
                            size="small"
                            value={subscriptionDetails.billingCycle}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={"MONTHLY"}>Monthly</MenuItem>
                            <MenuItem value={"YEARLY"}>Yearly</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            name="status"
                            label="Status"
                            size="small"
                            value={subscriptionDetails.status}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={"ACTIVE"}>Active</MenuItem>
                            <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                            <MenuItem value={"CANCELLED"}>Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Renewal Date" value={subscriptionDetails.renewalDate} onChange={handleDateChange} slotProps={{ textField: { size: 'small' } }} />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} variant='contained' color='error' sx={{ fontFamily: 'monospace' }}>Cancel</Button>
                        <Button type='submit' variant='contained' sx={{ fontFamily: 'monospace' }}>Add</Button>
                    </Box>
                </Box>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SubscriptionDialog