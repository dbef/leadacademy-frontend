'use client';

import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { useLanguage } from 'src/contexts/language-context';

import { useMockedUser } from 'src/auth/hooks';

import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const { renderLanguage } = useLanguage();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppWelcome
            title={renderLanguage('მოგესალმებით', 'Welcome')}
            description={renderLanguage('Sabado ადმინ პანელი', 'Sabado Admin Panel')}
            img={<SeoIllustration hideBackground />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppFeatured list={[]} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title={renderLanguage('სულ დადასტურებული აპლიკანტები', 'Total Approved Applicants')}
            percent={2.6}
            total={18765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title={renderLanguage('მომლოდინე აპლიკანტები', 'Total Pending Applicants')}
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AppWidgetSummary
            title={renderLanguage('გაუქმებული აპლიკანტები', 'Rejected Applicants')}
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppCurrentDownload
            title={renderLanguage('კურსზე დარეგისტრირებული აპლიკანტები', 'Registered Applicants')}
            subheader={renderLanguage(
              'რეგისტრირებული აპლიკანტები კურსის მიხედვით',
              'Registered Applicants by Course'
            )}
            chart={{
              series: [
                { label: renderLanguage('ზაფხულის ბანაკი', 'Summer Camp'), value: 12244 },
                { label: renderLanguage('შემოდგომის ბანაკი', 'Autumn Camp'), value: 53345 },
                { label: renderLanguage('გაზაფხულის ბანაკი', 'Spring Camp'), value: 44313 },
                { label: renderLanguage('ზამთრის ბანაკი', 'Winter Camp'), value: 78343 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AppAreaInstalled
            title={renderLanguage('რეგისტრაციები თვეების მიხედვით', 'Registrations by month')}
            // subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    {
                      name: 'დადასტურებული',
                      data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                    },
                    { name: 'გაუქმებული', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'დადასტურებული', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'გაუქმებული', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'დადასტურებული', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'გაუქმებული', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
