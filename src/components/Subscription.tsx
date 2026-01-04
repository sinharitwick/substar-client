import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Subscription({ sub, onOpenEditDialog, onDelete }: any) {
  return (
    <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit', mb: 1 }}>
        <AccordionSummary>
          <Typography component="span" sx={{ fontFamily: 'monospace' }}>{sub.serviceName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Box>
                <Chip label={sub.status} variant="outlined" sx={(sub.status === 'ACTIVE' ? { color: 'success.main', borderColor: 'success.main' } : { color: 'error.main', borderColor: 'error.main' } )} />
            </Box>
            <Box>
                <Typography component="span" variant='h6' sx={{ fontFamily: 'monospace' }}>₹{sub.cost}/</Typography>
                <Typography component="span" variant='h6' sx={{ fontFamily: 'monospace' }}>{sub.billingCycle.charAt(0).toLowerCase()}</Typography>
            </Box>
            <Box>
              <Typography component="span" sx={{ fontFamily: 'monospace' }}>Renewal: {sub.renewalDate.slice(0, 10)}</Typography>
            </Box>
            <Box>
              <IconButton onClick={onOpenEditDialog} size='small' color='inherit'>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDelete} size='small' color='error'>
                <DeleteIcon />
              </IconButton>
            </Box>
        </AccordionDetails>
    </Accordion>
  )
}

export default Subscription