import type { CourseDto } from 'src/types/course-type';
import type { DialogProps } from '@mui/material/Dialog';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useLanguage } from 'src/contexts/language-context';
import { OrderCompleteIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  course: CourseDto;
};

export function CourseThankYou({ course, ...other }: Props) {
  const { renderLanguage } = useLanguage();

  return (
    <Dialog
      fullWidth
      fullScreen
      PaperProps={{
        sx: {
          width: { md: `calc(100% - 48px)` },
          height: { md: `calc(100% - 48px)` },
        },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 5,
          gap: 5,
          m: 'auto',
          maxWidth: 480,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 0 },
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">
          {renderLanguage(
            `მადლობთ რომ დარეგისტრირდით კურსზე`,
            `Thank you for registering on course`
          )}
        </Typography>

        <OrderCompleteIllustration />

        <Typography>
          {renderLanguage(
            `მადლობთ რომ დარეგისტრირდით კურსზე: ${course.title_ka}`,
            `Thank you for registering on course: ${course.title_en}`
          )}
          <br />
          <br />
          <Link>{renderLanguage(course.title_ka, course.title_en)}</Link>
          <br />
          <br />
          {renderLanguage(
            '24 საათის განმავლობაში განიხილება თქვენი განაცხადი და პასუხი მოგივათ მეილზე!',
            `within 24hr we will review application and you will receive answer on your email`
          )}
          <br />{' '}
          {renderLanguage('მადლობთ რომ აირჩიეთ LeadAcademy', `Thank you for choosing LeadAcademy`)}
          <br />
          {renderLanguage('All the best', `All the best`)}
        </Typography>

        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            component={RouterLink}
            href="/courses"
            size="large"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            კურსებზე დაბრუნება
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
