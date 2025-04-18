import parser from 'html-react-parser';

import { Card, Stack, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

import { infrastructure } from './infrastructure';

export function LocationAndInfrastructure() {
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
             walking tours.`
              )
            )}
          </Typography>
          <Stack spacing={1}>
            {infrastructure.map((item) => (
              <Stack direction="row" spacing={2} key={item.id}>
                <Iconify color="#0A66C2" icon="icon-park-outline:dot" />
                <Typography>{renderLanguage(item.title_ka, item.title_en)}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
