import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

export function ProjectPurpose() {
  const { renderLanguage } = useLanguage();

  const data = [
    {
      id: 1,
      ka: `არაფორმალური განათლების პრინციპებსა და საშუალებებზე
დაყრდნობით ლიდერების, მომავლის პასუხისმგებლიანი და
კომპეტენტური მოქალაქეების აღზრდა`,
      en: `
Educating leaders, responsible and competent citizens of the future, based on the principles and means of non-formal education`,
    },
    {
      id: 2,
      ka: `თანამედროვე, ტექნოლოგიურად სწრაფად ცვალებად,
მულტიკულტურულ გარემოში ჰუმანისტური აღზრდის პრინციპების
გამოყენებით ადაპტაციისა და ლიდერობისთვის აუცილებელი
უნარების ჩამოყალიბება`,
      en: `

Developing the necessary skills for adaptation and leadership in a modern, technologically rapidly changing, multicultural environment by applying the principles of humanistic education`,
    },
    {
      id: 3,
      ka: `მონაწილეთათვის საქართველოს კულტურული,
ისტორიული, ეთნოგრაფიული და ფოლკლორული მემკვიდრეობის
გაცნობა`,
      en: `To introduce participants to Georgia's cultural, historical, ethnographic and folklore heritage`,
    },
    {
      id: 4,
      ka: `განათლებისა და დასაქმების საერთაშორისო, კონკურენტულ
ბაზრებზე წარმატების მისაღწევად პრაქტიკული ცოდნისა და
უნარების მიცემა`,
      en: `Providing practical knowledge and skills to succeed in international, competitive education and employment markets`,
    },
    {
      id: 5,
      ka: `არაფორმალური განათლების საერთაშორისოდ აღიარებული
მიღწევებისა და გამოცდილებების დანერგვა`,
      en: `Introducing internationally recognized achievements and experiences in non-formal education`,
    },
    {
      id: 6,
      ka: `ქართული საგანმანათლებლო სფეროს საერთაშორისო აკადემიურ
სივრცეებში ინტეგრაციის ხელშეწყობა`,
      en: `Promoting the integration of the Georgian educational sector into international academic spaces`,
    },
    {
      id: 7,
      ka: `აკადემიის ქართული საგანმანათლებლო სივრცისთვის
ინტელექტუალური მიზიდულობის ცენტრად ჩამოყალიბება`,
      en: `Establishing the Academy as a center of intellectual attraction for the Georgian educational space`,
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
          {renderLanguage('პროექტის მიზნები', 'Our Purposes')}
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
              <Iconify icon="fluent:shield-task-48-filled" color="#00C583" />
              <Typography>{renderLanguage(item.ka, item.en)}</Typography>
            </Stack>
          ))}
        </Stack>
      </m.div>
    </Stack>
  );
}
