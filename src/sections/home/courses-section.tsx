import type { CourseDto } from 'src/types/course-type';

import { m } from 'framer-motion';

import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { CourseItemMain } from '../courses/course-item-card';

type HomeProps = {
  products: CourseDto[];
};

export default function CoursesSection({ products }: HomeProps) {
  const renderList = () =>
    products.map((course) => <CourseItemMain key={course.course_id} item={course} />);

  const { renderLanguage } = useLanguage();

  return (
    <Box
      component={m.div}
      variants={varFade('inUp', { distance: 100 })}
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <Typography variant="h4" sx={{ fontFeatureSettings: "'case' on" }}>
          {renderLanguage('პროგრამები', 'Programs')}
        </Typography>
        <Button color="secondary" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          {renderLanguage('იხილე ყველა პროგრამა', 'View all programs')}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          '@media (max-width: 900px)': {
            flexDirection: 'column',
          },
        }}
      >
        {renderList()}
      </Box>
    </Box>
  );
}
