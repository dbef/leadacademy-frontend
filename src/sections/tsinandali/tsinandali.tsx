'use client';

import type { CampusDto } from 'src/types/campus';

import { Box, Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import MapsTsinandali from './maps';
// import { Testimonials } from './testimonials';
import { ExperienceView } from './experience-view';
import { RecommendedItems } from './recommended-things';
import { LocationAndInfrastructure } from './location-and-infrastructure';
import { CarouselAnimation } from '../_examples/extra/carousel-view/carousel-animation';

export type CampusProps = {
  campuse: CampusDto;
};

export function TsinandaliView({ campuse }: CampusProps) {
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
            marginTop: '50px',
          },
          '@media (max-width: 760px)': {
            padding: '24px !important',
          },
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, fontFeatureSettings: "'case' on" }}>
          {renderLanguage(
            'წინანდლის კამპუსი “შატო მოსმიერი”',
            'Tsinandali Camp, “Chateau Mosmieri” '
          )}
        </Typography>
        <Typography>
          {renderLanguage(
            'კამპუსის გარშემო არაერთი მნიშვნელოვანი კულტურული და ისტორიული ძეგლი მდებარეობს, რას სტუდენტებს საშუალებას აძლევს, რომ დაგეგმონ გასვლითი, შემეცნებითი ტურები და ექსკურსიები. აქვე მდებარეობს არაერთი ლოკალური წარმოება და ადგილობრივი ბიზნესი, რაც ჩვენს სტუდენტებს საშუალებას აძლევს მეწარმეობის და ბიზნესის განვითარების კუთხით პრაქტიკული ცოდნა მიიღონ.',
            'The campus is surrounded by many important cultural and historical monuments, which allows students to plan field trips and excursions. There are also several local productions and local businesses here, which allows our students to gain practical knowledge in the field of entrepreneurship and business development.'
          )}
        </Typography>
      </Stack>
      <CarouselAnimation data={arrData} />
      <LocationAndInfrastructure />
      <ExperienceView />
      <Box sx={{ paddingTop: '128px' }}>
        <MapsTsinandali />
      </Box>
      <RecommendedItems />
      {/* <Testimonials /> */}
    </Stack>
  );
}
