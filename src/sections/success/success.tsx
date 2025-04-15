import type { CourseDto } from 'src/types/course-type';
import type { DialogProps } from '@mui/material/Dialog';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { OrderCompleteIllustration } from 'src/assets/illustrations';
import { Language, useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  course: CourseDto;
};

export function SuccessPage({ course, ...other }: Props) {
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
        <Typography variant="h4">Thank you for your interest in the course!</Typography>

        <OrderCompleteIllustration />

        <Typography>
          <br />
          <br />
          <Link>{course.title_en}</Link>
          <br />
          <br />
          You have siccessfully registered for the course
          <br />{' '}
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
            href="/"
            size="large"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Return to main page
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
