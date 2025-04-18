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
          padding: '64px 24px',
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
                `აკადემიური ბანაკი „საბადოს“ კამპუსს კახეთში „შატო მოსმიერი“ მასპინძლობს.<br/></br> 
       „შატო მოსმიერი“ კახეთში, წინანდალსა და თელავს შორის მდებარეობს, ღვინით,
       კულტურული მრავალფეროვნებითა და ისტორიული მემკვიდრეობით განთქმულ
       რეგიონში. ჭავჭავაძეების მამული, ერეკლეს სასახლე და კახეთის სხვა
       კულტურული და ისტორიული ღირსშესანიშნაობები აქედან ერთი ხელის
       გაწვდენაზეა.
       <br/></br> 
       ვენახებით გარშემორტყმული შატო ათასობით კვადრატულ მეტრზე გაშენებული
       კომპლექსია, რომელიც კოტეჯის ტიპის ნაგებობებს აერთიანებს და ერთდროულად
       62 სტუმრის მიღება შეუძლია.
       <br/></br> 
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
          <Stack spacing={1}>
            {infrastructure.map((item) => (
              <Stack direction="row" spacing={2} key={item.id}>
                <Iconify color="#3D1746" icon="icon-park-outline:dot" />
                <Typography>{renderLanguage(item.title_ka, item.title_en)}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
