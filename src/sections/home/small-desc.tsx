'use client';

import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid2';
import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

import ImageGrid from './images-grid';

export function SmallDesc() {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  const keyPoints = [
    {
      id: 1,
      title_ka: `არაფორმალური განათლების პრინციპებსა და საშუალებებზე დაყრდნობით ლიდერების, მომავლის მოქალაქეების აღზრდა`,
      title_en: `არაფორმალური განათლების პრინციპებსა და საშუალებებზე დაყრდნობით ლიდერების, მომავლის მოქალაქეების აღზრდა`,
    },
    {
      id: 2,
      title_ka: `მონაწილეებისთვის ჰუმანისტური აღზრდის პრინციპებზე დაყრდნობით გლობალური მოქალაქეობის პრინციპების ზიარება, ლიდერობისა და თანამედროვე, ტექნოლოგიურად სწრაფად ცვალებად, მულტიკულტურულ სამყაროსთან ადაპტაციის უნარების ჩამოყალიბება`,
      title_en: `მონაწილეებისთვის ჰუმანისტური აღზრდის პრინციპებზე დაყრდნობით გლობალური მოქალაქეობის პრინციპების ზიარება, ლიდერობისა და თანამედროვე, ტექნოლოგიურად სწრაფად ცვალებად, მულტიკულტურულ სამყაროსთან ადაპტაციის უნარების ჩამოყალიბება`,
    },
    {
      id: 3,
      title_ka: `განათლებისა და დასაქმების საერთაშორისო, კონკურენტულ ბაზრებზე წარმატების მისაღწევად პრაქტიკული ცოდნისა და გამოცდილების მიცემა`,
      title_en: `განათლებისა და დასაქმების საერთაშორისო, კონკურენტულ ბაზრებზე წარმატების მისაღწევად პრაქტიკული ცოდნისა და გამოცდილების მიცემა`,
    },
    {
      id: 4,
      title_ka: `არაფორმალური განათლების საერთაშორისოდ აღიარებული მიღწევებისა და გამოცდილებების დანერგვა; ქართული საგანმანათლებლო სფეროს საერთაშორისო აკადემიურ სივრცეებში ინტეგრაციის ხელშეწყობა`,
      title_en: `არაფორმალური განათლების საერთაშორისოდ აღიარებული მიღწევებისა და გამოცდილებების დანერგვა; ქართული საგანმანათლებლო სფეროს საერთაშორისო აკადემიურ სივრცეებში ინტეგრაციის ხელშეწყობა`,
    },
  ];
  return (
    <Box
      sx={{
        padding: '28px 256px',
        '@media (max-width: 1400px)': {
          padding: '64px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '28px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '28px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Typography variant="h3" sx={{ fontFeatureSettings: "'case' on" }}>
        {renderLanguage(`ლიდერთა აკადემია`, `Lead Academy`)}
      </Typography>
      <Typography sx={{ marginTop: '20px', fontWeight: '600' }}>
        {renderLanguage(
          `პროექტის მიზანია შექნას ევროპული სკოლის მოსწავლეებისთვის ერთიანი სივრცე, რომელიც სკოლის
        მისიის და ფასეულობების გარშემო არაფორმალურ, ინტერაქტიულ გარემოში გააერთიანებს მოსწავლეებს და
        აზიარებს მათ ჰუმანისტური აღზრდის პრინციპებს, გლობალურ მოქალაქეობას და თანამედროვე
        მულტიკულტურულ სამყაროსთან ადაპტაციის უნარს.`,
          `პროექტის მიზანია შექნას ევროპული სკოლის მოსწავლეებისთვის ერთიანი სივრცე, რომელიც სკოლის
        მისიის და ფასეულობების გარშემო არაფორმალურ, ინტერაქტიულ გარემოში გააერთიანებს მოსწავლეებს და
        აზიარებს მათ ჰუმანისტური აღზრდის პრინციპებს, გლობალურ მოქალაქეობას და თანამედროვე
        მულტიკულტურულ სამყაროსთან ადაპტაციის უნარს.`
        )}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '30px' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
              '@media (max-width: 1000px)': {
                gap: '20px',
              },
            }}
          >
            {keyPoints.map((point) => (
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                }}
                key={point.id}
              >
                {' '}
                <Iconify icon="mdi:shield-check" color="#00C583" />{' '}
                <Typography key={point.id}>{point.title_ka}</Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={() => router.push('courses')}>
                {renderLanguage('აირჩიე კურსი', 'Select Course')}
              </Button>
              <Button color="primary" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
                {renderLanguage('ლიდ აკადემიის შესახებ', 'About Lead Academy')}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImageGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
