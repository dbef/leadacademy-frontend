'use client';

import { Box, Stack, Typography } from '@mui/material';

import { Language, useLanguage } from 'src/contexts/language-context';

import { termsAndConditions } from '../courses/data';

export function TermsAndConditionsView() {
  const { renderLanguage, language } = useLanguage();

  return (
    <Box
      sx={{
        padding: '28px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '28px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '28px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" align="left" sx={{ fontFeatureSettings: "'case' on" }}>
          {renderLanguage('წესები და პირობები', 'Terms and Conditions')}
        </Typography>
        {termsAndConditions.map((item, _index) => (
          <Stack spacing={1} key={item.id}>
            <Typography variant="subtitle2" key={item.id} sx={{ fontFeatureSettings: "'case' on" }}>
              {_index + 1}. {renderLanguage(item.title_ka, item.title_en)}
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc' }}>
              {(language === Language.KA ? item.points_ka : item.points_en).map((point, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  <Typography variant="body2" component="span">
                    {point}
                  </Typography>
                </li>
              ))}
            </ul>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
