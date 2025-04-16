'use client';

import type { CourseDto } from 'src/types/course-type';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import ServerErrorIllustration from 'src/assets/illustrations/server-error-illustration';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  course: CourseDto;
};

export function FailedPage({ course }: Props) {
  return (
    <Dialog
      fullWidth
      fullScreen
      open
      PaperProps={{
        sx: {
          width: { md: `calc(100% - 48px)` },
          height: { md: `calc(100% - 48px)` },
        },
      }}
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
        <Typography variant="h4">Sorry something went wrong while processing payment</Typography>

        <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />

        <Typography>
          <br />
          <br />
          <Link>{course.title_en}</Link>
          <br />
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
