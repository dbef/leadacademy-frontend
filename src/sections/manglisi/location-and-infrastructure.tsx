import { Card, Stack, Typography } from '@mui/material';

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
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
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
            {renderLanguage(
              'წინანდლის კამპუსი მდებარეობს ისტორიულ და კულტურულად მნიშვნელოვან რეგიონში, რომელიც გამოირჩევა თავისი უნიკალური ბუნებით და მდიდარი კულტურული მემკვიდრეობით. კამპუსი გთავაზობთ თანამედროვე ინფრასტრუქტურას, რომელიც მოიცავს სასწავლო შენობებს, ლაბორატორიებს, ბიბლიოთეკას და დასასვენებელ ზონებს. სტუდენტებს აქვთ შესაძლებლობა ისარგებლონ თანამედროვე ტექნოლოგიებით და რესურსებით, რაც ხელს უწყობს მათი აკადემიური და პროფესიული განვითარების პროცესს.',
              'The Tsinandali campus is located in a historically and culturally significant region characterized by its unique nature and rich cultural heritage. The campus offers modern infrastructure, including educational buildings, laboratories, a library, and recreational areas. Students have access to modern technologies and resources that facilitate their academic and professional development.'
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
