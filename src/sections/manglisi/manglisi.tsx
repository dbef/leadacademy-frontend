'use client';

import type { CampusDto } from 'src/types/campus';

import { Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import MapsTsinandali from './maps';
// import { Testimonials } from './testimonials';
import { LocationAndInfrastructure } from './location-and-infrastructure';
import { CarouselAnimation } from '../_examples/extra/carousel-view/carousel-animation';

export type CampusProps = {
  campuse: CampusDto;
};

export function ManglisiView({ campuse }: CampusProps) {
  const { renderLanguage } = useLanguage();

  const arrData = campuse.campus_media_assn.map((item) => ({
    id: '1',
    title_ka: '',
    title_en: '',
    description_ka: '',
    description_en: '',
    coverUrl: item.media?.media_url || '',
    type: item.media?.type || '',
  }));

  return (
    <Stack>
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
        <Typography variant="h3" sx={{ mb: 3, fontFeatureSettings: "'case' on", color: 'success.main' }}>
          {renderLanguage('მანგლისის კამპუსი', 'Manglisi Campus')}
        </Typography>
      </Stack>
      <CarouselAnimation data={arrData} />
      <LocationAndInfrastructure campus={campuse}/>
      {/* <ExperienceView /> */}
      {/* <Box sx={{ paddingTop: '128px' }}> */}
      <MapsTsinandali />
      {/* </Box> */}
      {/* <RecommendedItems /> */}
      {/* <Testimonials /> */}
    </Stack>
  );
}
