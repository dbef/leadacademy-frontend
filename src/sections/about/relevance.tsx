import { m } from 'framer-motion';
import parser from 'html-react-parser';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

export function Relevance() {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={4}
      sx={{ mb: 10 }}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <m.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFeatureSettings: "'case' on",
            background: 'linear-gradient(50deg, #0A66C2 0%, #05305C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {renderLanguage('აქტუალობა', 'Relevance')}
        </Typography>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="row" spacing={2}>
          <Typography>
            {parser(
              renderLanguage(
                `არაფორმალური განათლების სივრცეებისადმი ინტერესი მუდამ მზარდია.
თანამედროვე, გლობალურ, ტექნოლოგიურ სამყაროში ცოდნის და განათლების
სტანდარტები სწრაფად ცვალებადია. არაფორმალური განათლება უფრო იოლად
ერგება ახალ მოთხოვნებს და ხელს უწყობს ტრანსფერირებადი უნარების
ჩამოყალიბებას.
<br />
<br />
სწორედ არაფორმალურ სივრცეში ყალიბდება ძირითადი სოციალური უნარები,
ადამიანის ხედვები, ღირებულებები, ქცევითი მოდელები და მსოფლმხედველობა.
<br />
<br />
აკადემიის ტიპის არაფორმალური განათლების ცენტრი ხელს უწყობს ლიდერობის,
გლობალური მოქალაქეობის, მულტიკულტურალიზმის და სოციალური
პასუხისმგებლობის უნარების ჩამოყალიბებას.
<br />
<br />
ამ ტიპის სივრცე აერთიანებს განათლებას აქტიურ დასვენებასთან, პრაქტიკულ
გამოცდილებებსა და სოციალურ აქტივობებთან.`,
                `To create a space around democratic and humanistic values in an informal, interactive environment that will promote the development of leadership skills and the formation of full-fledged citizens of the future, a global world.`
              )
            )}
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );
}
