import type { CampusDto } from 'src/types/campus';

import parser from 'html-react-parser';
import { useState, useEffect, useCallback } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';

export function LocationsSection() {
  const { renderLanguage } = useLanguage();

  const [tabs, setTabs] = useState([
    {
      title_ka: 'მანგლისი',
      title_en: 'Manglisi',
      value: 'manglisi',
    },
  ]);
  const [campuses, setCampuses] = useState<CampusDto[]>([]);
  const [selectedCampuse, setSelectedCampuse] = useState<CampusDto | undefined>();

  const [selectedTab, setSelectedTab] = useState('Tsinandali');

  const fetchCampuses = useCallback(async () => {
    const response = await apiClient('/api/v1/campus', 'get');

    const mappedCampuses = response.map((campus) => ({
      title_ka: campus.campus_name_ka,
      title_en: campus.campus_name_en,
      value: campus.campus_name_en,
    }));

    setCampuses(response);
    setTabs(mappedCampuses);
    setSelectedCampuse(response[0]);
  }, []);

  useEffect(() => {
    if (tabs.length === 3) return;
    fetchCampuses();
  }, []);

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
      <Typography
        variant="h3"
        sx={{ fontFeatureSettings: "'case' on", marginBottom: '30px', marginTop: '50px' }}
      >
        {renderLanguage('ლოკაციები', 'Locations')}
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={(_event, newValue) => {
          setSelectedTab(newValue);
          setSelectedCampuse(campuses.find((item) => item.campus_name_en === newValue));
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={renderLanguage(tab.title_ka, tab.title_en)}
          />
        ))}
      </Tabs>
      <Box>
        {selectedCampuse ? (
          <Box>
            <Typography>
              {parser(
                renderLanguage(selectedCampuse.description_ka, selectedCampuse.description_en)
              )}
            </Typography>
            <Image src={selectedCampuse.campus_media_assn[0].media?.media_url} ratio="16/9" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
