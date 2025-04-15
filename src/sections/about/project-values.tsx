import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

export function ProjectValues() {
  const { renderLanguage } = useLanguage();

  const data = [
    {
      id: 1,
      ka: `აკადემიის მუშაობა ეფუძნება იმ ძირითად ფასეულობებს, რომლებიც ლიდერების,
მომავლის მოქალაქეების ჩამოყალიბებისთვის აუცილებელია და აკადემიის
საქმიანობის, მისი თითოეული აქტივობის აუცილებელ საფუძველს წარმოადგენს.`,
      en: `The work of the Academy is based on the core values that are essential for the formation of leaders, future citizens, and constitute the essential foundation of the Academy's work and each of its activities.`,
    },
    {
      id: 2,
      ka: `კრიტიკული აზროვნება, ანალიტიკურობა და კრეატიულობა - თანამედროვე,
ინფორმატიულ სამყაროში ინფორმაციის კრიტიკულად, ანალიტიკურად
დამუშავება და შემდეგ ანალიზისა და საკუთარი კრეატიულობის წყალობით
სწრაფი გადაწყვეტილების მიღება, საკუთარი ცოდნის, შეხედულების,
ინტერპრეტაციის ჩამოყალიბება აუცილებელ უნარებს წარმოადგენს.`,
      en: `
Critical thinking, analytical skills and creativity - in the modern,
informational world, to process information critically and analytically and then, thanks to analysis and one's own creativity, to make quick decisions, to`,
    },
    {
      id: 3,
      ka: `კულტურული მრავალფეროვნება და საკუთარი კულტურული უნიკალურობის
განცდა - გლობალურ სამყაროში თანამედროვე ადამიანს სრულად სჭირდება
სამყაროს მრავალფეროვნების განცდა; მისი გამომწვევი მიზეზებისა და
მახასიათებლების შეცნობა და ამ სამყაროში საკუთარი კულტურული იდენტობით
სრულფასოვანი ინტეგრაცია.`,
      en: `
Cultural diversity and a sense of one's own cultural uniqueness - in a global world, modern people fully need to feel the diversity of the world; to understand its causes and characteristics, and to fully integrate into this world with one's own identity.`,
    },
    {
      id: 4,
      ka: `კომუნიკაცია, ემპათია და ემოციური ინტელექტი - კომუნიკაციის უნარი,
  ურთიერთობების აგება, სოციალური უნარების ჩამოყალიბება და სხვა ადამიანების
  ემოციური სამყაროს სრულფასოვანი აღქმა შეუცვლელი უნარია. ემოციური
  ინტელექტი თანამედროვე მოქალაქის და ლიდერის აუცილებელი თვისებაა.`,
      en: `
  Communication, empathy and emotional intelligence - the ability to communicate, build relationships, develop social skills and fully perceive the emotional world of other people is an indispensable skill. Emotional intelligence is an essential quality of a modern citizen and leader.`,
    },
    {
      id: 5,
      ka: `შთაგონება, პასუხისმგებლობა და გადაწყვეტილების მიღების უნარი - ლიდერს
სჭირდება ინიციატივა, ხედვა, შინაგანი ძალა და ენერგია. მას ხედვებზე, იდეებსა და
ფასეულობებზე დაფუძნებული ინსპირაცია უნდა ამოძრავებდეს. ამავე დროს
ლიდერს და მოქალაქეს მუდამ სჭირდება საკუთარი პასუხისმგებლობის განცდა და
გადაწყვეტილების მიღების ცოდნა, ძალა და უნარი.`,
      en: `

Inspiration, responsibility and decision-making ability - a leader needs initiative, vision, inner strength and energy. He must be driven by inspiration based on visions, ideas and values. At the same time, a leader and a citizen always needs to take responsibility for their actions.`,
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
          {renderLanguage('ჩვენი ფასეულობებია', 'Our Values')}
        </Typography>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="column" spacing={3}>
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
