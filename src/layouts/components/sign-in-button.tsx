import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { Language, useLanguage } from 'src/contexts/language-context';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  const { renderLanguage, language } = useLanguage();
  return (
    <Button
      component={RouterLink}
      href={language === Language.KA ? '/courses/register' : '/en/courses/register'}
      variant="contained"
      sx={{ ...sx, backgroundColor: '#A4C121', color: 'black' }}
      {...other}
    >
      {renderLanguage('რეგისტრაცია', 'Register')}
    </Button>
  );
}
