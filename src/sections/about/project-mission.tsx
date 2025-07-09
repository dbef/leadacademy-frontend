import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

export function ProjectMission() {
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
          {renderLanguage('პროექტის მისია', 'Project Mission')}
        </Typography>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="row" spacing={2}>
          <Typography>
            {renderLanguage(
              'ჩვენ ხელს ვუწყობთ და ვავითარებთ არაფორმალურ განათლებას, რათა აღვზარდოთ აქტიური, პასუხისმგებლიანი, ეთიკური ლიდერები და მოქალაქეები. „საბადო“ ეხმარება პროგრამის მონაწილეებს, აღმოაჩინონ დაფარული პოტენციალი და განივითარონ ის ფასეულობები, უნარები და აზროვნების სისტემა, რომლებიც აუცილებელია  შედეგზე ორიენტირებული არსობრივი ცვლილებებისთვის.',
              `We pioneer a transformative education model that cultivates active, responsible, and ethical leaders and citizens. Sabado empowers learners to unlock their hidden potential through core values, growth mindsets, and essential skills needed to lead meaningful change.`
            )}
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );
}
