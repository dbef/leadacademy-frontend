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

export function CourseThankYou({ course, ...other }: Props) {
  const { renderLanguage, language } = useLanguage();

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
            `მადლობა, რომ დაინტერესდით კურსით!`,
            `Thank you for your interest in the course!`
          )}
        </Typography>

        <OrderCompleteIllustration />

        <Typography>
          <br />
          <br />
          <Link>{renderLanguage(course.title_ka, course.title_en)}</Link>
          <br />
          <br />
          {renderLanguage(
            'თქვენი განაცხადი განხილვის პროცესშია და პასუხს ელექტრონული ფოსტით მიიღებთ 48 საათის განმავლობაში.',
            `Your application is under review, and you will receive a response via email within 48 hours.`
          )}
          <br />{' '}
          {renderLanguage(
            ' გთხოვთ გაითვალისწინოთ, რომ საბოლოო რეგისტრაციისთვის აუცილებელია დასტურის მიღების შემდეგ თანხის გადახდა.',
            `Please note that final registration requires payment after receiving confirmation.`
          )}
          <br />
        </Typography>

        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />
        <Alert severity="info" sx={{ borderRadius: 0 }}>
          {renderLanguage(
            `თუ რეგისტრაციიდან 48 საათის განმავლობაში პასუხი არ მიგიღიათ, გთხოვთ, შეამოწმოთ თქვენი სპამ ფოლდერი, ან დაგვიკავშირდეთ ელექტრონულ ფოსტაზე contact@sabado.edu.ge`,
            `If you don’t receive a response within 48 hours of registration, please check your spam folder or contact us via email contact@sabado.edu.ge. 
`
          )}
        </Alert>

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
            href={language === Language.KA ? '/courses/register' : '/en/courses/register'}
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
