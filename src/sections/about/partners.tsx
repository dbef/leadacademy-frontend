import { m } from 'framer-motion';
import parser from 'html-react-parser';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import DBEFLogo from '../dbef/dbef-logo';

export function Partners() {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={4}
      sx={{ mb: 10 }}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <m.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFeatureSettings: "'case' on",
            background: 'linear-gradient(50deg, #0A66C2 0%, #05305C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {renderLanguage('პარტნიორები', 'Partners')}
        </Typography>
        <a
          href="https://dbef.ge"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <DBEFLogo fill="#4338CA" />
            <Typography
              sx={{
                fontFeatureSettings: "'case' on",
                textTransform: 'uppercase',
                fontSize: '13px',
                color: '#4338CA',
              }}
            >
              {parser(
                renderLanguage(
                  `დავით<br/>ბეჟუაშვილის<br/>განათლების<br/>ფონდი`,
                  `David<br/>Bezhuashvili<br/>Education<br/>Foundation`
                )
              )}
            </Typography>
          </Stack>
        </a>
      </m.div>
    </Stack>
  );
}
