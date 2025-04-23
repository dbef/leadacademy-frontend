'use client';

import type { BoxProps } from '@mui/material/Box';
import type { components } from 'interfaces/interface';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Tab, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { Language, useLanguage } from 'src/contexts/language-context';

import { CustomTabs } from 'src/components/custom-tabs';

import { CourseItemMain } from './course-item-card';
import { ProductItemSkeleton } from '../product/product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  products: components['schemas']['CourseDto'][];
  season: string;
  location: string;
};

export type SeasonType = {
  month_ka: string;
  month_en: string;
  value: string;
};

export function CourseListMain({ products, location, season, loading, sx, ...other }: Props) {
  const renderLoading = () => <ProductItemSkeleton />;

  const months = [
    {
      month_ka: 'იანვარი',
      month_en: 'January',
      value: 'january',
    },
    {
      month_ka: 'თებერვალი',
      month_en: 'February',
      value: 'february',
    },
    {
      month_ka: 'მარტი',
      month_en: 'March',
      value: 'march',
    },
    {
      month_ka: 'აპრილი',
      month_en: 'April',
      value: 'april',
    },
    {
      month_ka: 'მაისი',
      month_en: 'May',
      value: 'may',
    },
    {
      month_ka: 'ივნისი',
      month_en: 'June',
      value: 'june',
    },
    {
      month_ka: 'ივლისი',
      month_en: 'July',
      value: 'july',
    },
    {
      month_ka: 'აგვისტო',
      month_en: 'August',
      value: 'august',
    },
    {
      month_ka: 'სექტემბერი',
      month_en: 'September',
      value: 'september',
    },
    {
      month_ka: 'ოქტომბერი',
      month_en: 'October',
      value: 'october',
    },
    {
      month_ka: 'ნოემბერი',
      month_en: 'November',
      value: 'november',
    },
    {
      month_ka: 'დეკემბერი',
      month_en: 'December',
      value: 'december',
    },
  ];

  const seasons = season
    ? season.split(',').map((item) => {
        const foundedSeason = months.find((month) => month.value === item);

        if (foundedSeason) {
          return {
            month_ka: foundedSeason.month_ka,
            month_en: foundedSeason.month_en,
            value: foundedSeason.value,
          };
        }

        return {
          month_ka: 'იანვარი',
          month_en: 'January',
          value: 'january',
        };
      })
    : [];

  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSeasons, setSelectedSeasons] = useState<SeasonType[]>(
    seasons.length > 0 ? seasons : []
  );

  useEffect(() => {
    if (location) {
      setSelectedTab(location);

      if (location === 'all' && selectedSeasons.length > 0) {
        router.push(
          language === Language.ENG
            ? `/en/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
            : `/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
        );

        return;
      }

      if (location === 'all') {
        router.push(language === Language.ENG ? '/en/courses' : '/courses');
        return;
      }
    }
  }, [location]);

  const router = useRouter();

  const tabs = [
    { title_ka: 'წინანდალი', title_en: 'Tsinandali', value: 'tsinandali' },
    { title_ka: 'მანგლისი', title_en: 'Manglisi', value: 'manglisi' },
    { title_ka: 'ყველა', title_en: 'All', value: 'all' },
  ];

  const renderList = () =>
    products.map((course) => (
      <Grid size={{ xs: 12, md: 4 }} key={course.course_id}>
        <CourseItemMain key={course.course_id} item={course} />
      </Grid>
    ));

  const { renderLanguage, language } = useLanguage();

  return (
    <Box
        {...other}
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
          backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundAttachment: 'fixed',
          backgroundColor: '#FAF6FD',
          backgroundPosition: 'center top',
        }}
      >
        <Typography variant="h3" sx={{ fontFeatureSettings: "'case' on", marginBottom: '50px' }}>
          {renderLanguage('პროგრამები', 'Programs')}
        </Typography>
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          spacing={2}
          justifyContent="space-between"
          width="100%"
        >
          <CustomTabs
            value={selectedTab}
            sx={{
              width: {
                md: 'fit-content',
                xs: '100%',
                backgroundColor: '#F5EDFA',
              },
              borderRadius: 1,
              marginBottom: 5,
            }}
            onChange={(_event, newValue) => {
              setSelectedTab(newValue);
              if (newValue === 'all') {
                router.push(language === Language.ENG ? `/en/courses` : `/courses`);

                return;
              }

              if (selectedSeasons.length > 0) {
                router.push(
                  language === Language.ENG
                    ? `/en/courses?key=${newValue}&season=${selectedSeasons.map((item) => item.value).join(',')}`
                    : `/courses?key=${newValue}&season=${selectedSeasons.map((item) => item.value).join(',')}`
                );

                return;
              }

              router.push(
                language === Language.ENG
                  ? `/en/courses?key=${newValue}`
                  : `/courses?key=${newValue}`
              );
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                sx={{ color: '#7C3C8F' }}
                label={renderLanguage(tab.title_ka, tab.title_en)}
              />
            ))}
          </CustomTabs>
          <Stack
            spacing={2}
            direction={{ md: 'row', xs: 'column' }}
            width={{ xs: '100%', md: '450px' }}
          >
            <Autocomplete
              fullWidth
              multiple
              limitTags={3}
              options={months}
              defaultValue={seasons}
              onChange={(event, value) => {
                setSelectedSeasons(value);
              }}
              getOptionLabel={(option) => renderLanguage(option.month_ka, option.month_en)}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => (
                <TextField {...params} label={renderLanguage('თვე', 'Month')} />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {renderLanguage(option.month_ka, option.month_en)}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.value}
                    label={renderLanguage(option.month_ka, option.month_en)}
                    size="small"
                    sx={{
                      color: '#285C45',
                      backgroundColor: '#BDDDC9',
                    }}
                    variant="soft"
                  />
                ))
              }
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                backgroundColor: '#7F9A16',
              }}
              onClick={() => {
                if (selectedSeasons.length < 1) {
                  if (location) {
                    if (location === 'all') {
                      router.push(language === Language.ENG ? `/en/courses` : `/courses`);
                      return;
                    }

                    router.push(
                      language === Language.ENG
                        ? `/en/courses?key=${location}`
                        : `/courses?key=${location}`
                    );
                  } else {
                    router.push(language === Language.ENG ? `/en/courses` : `/courses`);
                  }
                }

                if (selectedSeasons.length > 0 && location) {
                  if (location === 'all') {
                    router.push(
                      language === Language.ENG
                        ? `/en/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
                        : `/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
                    );

                    return;
                  }

                  router.push(
                    language === Language.ENG
                      ? `/en/courses?key=${location}&season=${selectedSeasons.map((item) => item.value).join(',')}`
                      : `/courses?key=${location}&season=${selectedSeasons.map((item) => item.value).join(',')}`
                  );

                  return;
                }

                if (selectedSeasons.length > 0) {
                  router.push(
                    language === Language.ENG
                      ? `/en/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
                      : `/courses?season=${selectedSeasons.map((item) => item.value).join(',')}`
                  );

                  return;
                }
              }}
            >
              {renderLanguage('ძებნა', 'Search')}
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ marginTop: '50px' }}>
          {loading ? renderLoading() : renderList()}
          {products.length < 1 && (
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ fontFeatureSettings: "'case' on" }}>
                {renderLanguage(
                  `ვერ მოიძებნა კურსები აღნისნულ კამპუსზე ან პერიოდში `,
                  'No courses found for this campus or period'
                )}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
  );
}
