'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useLanguage } from 'src/contexts/language-context';
import { MaintenanceIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export function MaintenanceView() {
  const { renderLanguage } = useLanguage();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 2, fontFeatureSettings: "'case' on" }}>
        {renderLanguage('ვებგვერდი დამუშავების პროცესშია', 'Website under construction')}
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        {renderLanguage(
          'ძალიან მალე შეძლებთ ვებგვერდით სარგებლობას',
          'You can visit the website later'
        )}
      </Typography>

      <MaintenanceIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Go to home
      </Button>
    </Box>
  );
}
