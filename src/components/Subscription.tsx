import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'

function Subscription({ sub }: any) {
  return (
    <Accordion sx={{ backgroundColor: '#000000', color: '#ffffff', mb: 1 }}>
        <AccordionSummary>
          <Typography component="span">{sub.serviceName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Box>
                <Chip label={sub.status} variant="outlined" sx={(sub.status === 'ACTIVE' ? { color: 'success.main', borderColor: 'success.main' } : { color: 'error.main', borderColor: 'error.main' } )} />
            </Box>
            <Box>
                <Typography component="span" variant='h6'>₹{sub.cost}/</Typography>
                <Typography component="span" variant='h6'>{sub.billingCycle.charAt(0).toLowerCase()}</Typography>
            </Box>
            Renewal: {sub.renewalDate.slice(0, 10)}
        </AccordionDetails>
    </Accordion>
  )
}

export default Subscription