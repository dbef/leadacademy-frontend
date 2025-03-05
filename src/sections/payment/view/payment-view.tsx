'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PaymentSummary } from '../payment-summary';
import { PaymentNewCardForm } from '../payment-new-card-form';

// ----------------------------------------------------------------------

export function PaymentView() {
  return (
    <Container sx={{ pt: { xs: 3, md: 5 }, pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        {`Let's finish powering you up!`}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
        Professional plan is right for you.
      </Typography>

      <Grid container rowSpacing={{ xs: 5, md: 0 }} columnSpacing={{ xs: 0, md: 5 }}>
        <Grid size={{ xs: 6, md: 8 }}>
          <Box
            sx={[
              (theme) => ({
                gap: 5,
                display: 'grid',
                borderRadius: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
              }),
            ]}
          >
            <PaymentNewCardForm />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </Container>
  );
}
