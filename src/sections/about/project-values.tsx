import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

export function ProjectValues() {
  const { renderLanguage } = useLanguage();

  const data = [
    {
      id: 1,
      ka: `გულწრფელობა და პასუხისმგებლობა`,
      en: `Integrity and Responsibility`,
    },
    {
      id: 2,
      ka: `ემპათია და ემოციური ინტელექტი`,
      en: `Empathy and Emotional Intelligence`,
    },
    {
      id: 3,
      ka: `კოლაბორაცია და გუნდური ლიდერობა`,
      en: `Collaboration and Shared Leadership`,
    },
    {
      id: 4,
      ka: `ინოვაცია და პროგრესზე ორიენტირებული აზროვნება`,
      en: `Innovation and Growth Mindset`,
    },
    {
      id: 5,
      ka: `მრავალფეროვნება და გლობალური მოქალაქეობა`,
      en: `Diversity and Global Citizenship`,
    },
  ];

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
          {renderLanguage('ფასეულობები', 'Values')}
        </Typography>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="column" spacing={3}>
          <Typography>
            {renderLanguage(
              'ჩვენი საქმიანობა, თითოეული აკადემიური თუ არაფორმალური აქტივობა, ჩვენს პრინციპებსა და ფასეულობებს ეფუძნება. ჩვენ ვზრუნავთ ფასეულობებზე, რომლებიც ჩვენი საზოგადოების საფუძველს ქმნის და განვითარების გზას გვიჩვენებს',
              'Our commitment to values-driven education is integrated into every academic and extracurricular experience. We actively promote core values that shape our community and guide our actions: '
            )}
          </Typography>
          {data.map((item) => (
            <Stack spacing={2} direction="row" key={item.id}>
              {' '}
              <Iconify icon="mynaui:check-diamond" color="#00C583" />
              <Typography>{renderLanguage(item.ka, item.en)}</Typography>
            </Stack>
          ))}
        </Stack>
      </m.div>
    </Stack>
  );
}
