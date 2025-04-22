import React from 'react';

import { Chip, Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import { recommendedItems } from './recommended';

export function RecommendedItems() {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      sx={{
        padding: '128px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '64px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '64px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '64px 24px ',
        },
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: '#FAF6FD',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontFeatureSettings: "'case' on" }}>
        {renderLanguage('რეკომენდირებული ნივთების სია', 'Recommended items list')}
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {recommendedItems.map((item) => (
          <Chip
            key={item.id}
            color="primary"
            label={renderLanguage(item.title_ka, item.title_en)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
