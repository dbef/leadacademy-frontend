import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { useLanguage } from 'src/contexts/language-context';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  const { renderLanguage } = useLanguage();
  return (
    <Button component={RouterLink} href='courses/register'variant="contained" sx={sx} {...other}>
      {renderLanguage('სააპლიკაციო ფორმა', 'Application Form')}
    </Button>
  );
}
