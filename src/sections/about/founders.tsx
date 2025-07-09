import { m } from 'framer-motion';
import parser from 'html-react-parser';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import DBEFLogo from '../dbef/dbef-logo';

export function Founders() {
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
            background: 'linear-gradient(50deg, #FCFCFC 0%, #7C7C7C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {renderLanguage('დამფუძნებლები', 'Founders')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <DBEFLogo />
          <Typography sx={{fontFeatureSettings: "'case' on", textTransform: 'uppercase', fontSize: '13px', color: '#fff'}}>
            {parser(
              renderLanguage(
                `დავით<br/>ბეჟუაშვილის<br/>განათლების<br/>ფონდი`,
                `David<br/>Bezhuashvili<br/>Education<br/>Foundation`
              )
            )}
          </Typography>
        </Stack>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="row" spacing={2}>
          <Typography sx={{color: '#fff'}}>
            {renderLanguage(
              '„დავით ბეჟუაშვილის განათლების ფონდი“ საგანმანათლებლო საქველმოქმედო, არასამეწარმეო (არაკომერციული) ორგანიზაციაა, რომელიც 2015 წელს დაარსდა დავით და გელა ბეჟუაშვილების მიერ. ფონდის დამფუძნებლები თვლიან, რომ განათლება განვითარებული, თანამედროვე, დემოკრატიული ქვეყნის მთავარი ღირებულებაა, ამიტომაც აქ ჩადებული ინვესტიციები ამ ღირებულებების დამკვიდრებისათვის გაღებული ის წვლილია, რომელიც მთლიანად ქვეყნის განვითარებაში იდება.',
              `The 'David Bezhuashvili Education Foundation' is a non-profit charitable organization dedicated to education, established in 2015 in Tbilisi, Georgia. It was founded by Dr. David Bezhuashvili and Ambassador Gela Bezhuashvili, who share a profound belief in the fundamental importance of education as a cornerstone of a developed, modernized, and democratic society. They recognize that investments in education yield immeasurable benefits for both society and the state.`
            )}
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );
}
