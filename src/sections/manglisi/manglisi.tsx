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
            marginTop: '50px',
          },
          '@media (max-width: 760px)': {
            padding: '24px !important',
          },
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, fontFeatureSettings: "'case' on" }}>
          {renderLanguage('მანგლისის კამპუსი', 'Manglisi Campus')}
        </Typography>
        <Typography>
          {parser(
            renderLanguage(
              `ლიდერობის აკადემია „საბადო-ს“ მანგლისის კამპუსი უნიკალურ აკადემიურ და
             დასასვენებელ სივრცეს წარმოადგენს.
                <br/>
                <br/>
             12 ათას კვადრატულ მეტრზე მოწყობილი სივრცე სპეციალურად „საბადოს“
             საჭიროებებისთვის შეიქმნა და უახლესი ტექნოლოგიური აღჭურვილობით,
             კომფორტით, ეკოლოგიურად სუფთა გარემოთი და უსაფრთხო გარემოთი
             გამოირჩევა.
             <br/>
             <br/>
             ფართო და მწვანე ეზოში 3000 კვადრატულ მეტრიან ძირითად ნაგებობას 50-ზე
             მეტი სტუმრის მიღება შეუძლია. კომპლექსს აქვს თავისი აკადემიური და სამუშაო
             სივრცეები, საკონფერენციო დარბაზი, ბიბლიოთეკა, ობსერვატორია, ლაუნჯები,
             სტადიონი, ჯიმი, სათამაშო, სამუშაო, დასასვენებელი და STEAM-ის სივრცეები.
             ცალკე ნაგებობაშია განლაგებული „საბადო-ს“ საკუთარი კინოთეატრი.
                <br/>
                <br/>
             კამპუსი მანგლისის ცენტრში მდებარეობს, ტყიან მასივში, ისტორიული და
             კულტურული თვალსაზრისით მნიშვნელოვან რეგიონში და სტუმრებს სთავაზობს
             „ჰაიქინგის“ და საფეხმავლო ტურების შესაძლებლობას. 
             <br/>
             <br/>
    • „საბადო-ს“ მანგლისის კამპუსი - უნიკალური აკადემიური და დასასვენებელი სივრცე<br/>
    • ფართო, მწვანე ეზო და ეკოლოგიურად სუფთა გარემო<br/>
    • აკადემიური სივრცე სრულყოფილი ტექნოლოგიური აღჭურვილობით<br/>
    • ბევრი სპორტი, სათამაშო და დასასვენებელი სივრცეები და საფეხმავლო ტურები
             `,
              `The Leadership Academy &quot;Sabado&quot; Manglisi Campus represents a unique academic and
             recreational space.
             Spanning 12,000 square meters, the space is specially designed for the needs of &quot;Sabado&quot;
             and is distinguished by its modern technological equipment, comfort, eco-friendly
             environment, and safety.
             The main building, set in a spacious and green yard, can accommodate over 50 guests in
             its 3,000 square meters. The complex features its own academic and working spaces, a
             conference hall, a library, an observatory, lounges, a stadium, a gym, play areas,
             workspaces, recreational areas, and STEAM spaces. &quot;Sabado&quot; also has its own cinema
             located in a separate building.
             The campus is located in the center of Manglisi, within a forested area, in a region of
             significant historical and cultural importance, and offers guests opportunities for hiking and
             walking tours.
             <br/>
              <br/>
            • "Sabado" Manglisi Campus - a unique academic and recreational space<br/>
    • Spacious, green yard and eco-friendly environment<br/>
    • Academic space equipped with advanced technology<br/>
    • Numerous sports, play, recreational spaces, and hiking tours`
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
