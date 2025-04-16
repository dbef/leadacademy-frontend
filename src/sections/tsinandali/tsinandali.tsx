'use client';

import type { CampusDto } from 'src/types/campus';

import parser from 'html-react-parser';

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
          {parser(
            renderLanguage(
              `აკადემიური ბანაკი „საბადოს“ კამპუსს კახეთში „შატო მოსმიერი“ მასპინძლობს.
„შატო მოსმიერი“ კახეთში, წინანდალსა და თელავს შორის მდებარეობს, ღვინით,
კულტურული მრავალფეროვნებითა და ისტორიული მემკვიდრეობით განთქმულ
რეგიონში. ჭავჭავაძეების მამული, ერეკლეს სასახლე და კახეთის სხვა
კულტურული და ისტორიული ღირსშესანიშნაობები აქედან ერთი ხელის
გაწვდენაზეა.
ვენახებით გარშემორტყმული შატო ათასობით კვადრატულ მეტრზე გაშენებული
კომპლექსია, რომელიც კოტეჯის ტიპის ნაგებობებს აერთიანებს და ერთდროულად
62 სტუმრის მიღება შეუძლია.
კომპლექსი მოიცავს თავისი ღვინით და სამზარეულოთი განთქმულ რესტორანს,
მარანს, ადგილობრივ წარმოებას და აუზს. იქვე სთავაზობს თავის სტუმრებს
კულინარიულ მასტერკლასებს.
`,
              `The academic camp &quot;Sabado&quot; is hosted at the &quot;Shato Mosmieri&quot; campus in Kakheti.
&quot;Shato Mosmieri&quot; is located in the region of Kakheti, situated between the Tsinandali and
Telavi, an area renowned for its wine, cultural diversity, and historical heritage. The
Chavchavadze Estate, Tsinandali park, the Palace Museum of king Erekle II, and other
cultural and historical landmarks of Kakheti are all within close proximity.
Surrounded by vineyards, the chateau encompasses a complex spread over thousands of
square meters, consisting of cottage-style buildings, with the capacity to accommodate 62
guests simultaneously.
The complex features a restaurant celebrated for its wine and cuisine, a wine cellar, locally
produced goods, and a swimming pool. Additionally, it offers culinary masterclasses to its
visitors.
`
            )
          )}
        </Typography>
        <Typography>
          {parser(
            renderLanguage(
              `
• ისტორიული რეგიონი და კულტურული მრავალფეროვნება<br/>
    • კომფორტული სივრცე და ვრცელი კომპლექსი<br/>
    • აუზი, კავკასიონის ხედი და ვენახები<br/>
    • გემრიელი სამზარეულო, რესტორანი და უნიკალური ღვინის კულტურა
`,
              `
• Historical region and cultural diversity<br/>
    • Comfortable space and expansive complex<br/>
    • Swimming pool, view of the Caucasus Mountains, and vineyards<br/>
    • Delicious cuisine, restaurant, and unique wine culture
`
            )
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
