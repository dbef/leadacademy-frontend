import type { CampusDto } from 'src/types/campus';

import parser from 'html-react-parser';

import { Card, Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';


export type LocationAndInfrastructureProps = {
  campus: CampusDto;
};

export function LocationAndInfrastructure({ campus }: LocationAndInfrastructureProps) {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      spacing={2}
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
      <Card
        sx={{
          padding: '20px',
          backgroundColor: '#919EAB0D',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ mb: 3, fontFeatureSettings: "'case' on" }}>
            {renderLanguage(
              'მდებარეობა და კამპუსის ინფრასტრუქტურა',
              'Location and campus infrastructure'
            )}
          </Typography>
          <Typography>
            {parser(renderLanguage(campus.description_ka, campus.description_en))}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
}
