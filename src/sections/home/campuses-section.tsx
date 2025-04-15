import type { CampusDto } from 'src/types/campus';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import apiClient from 'src/api/apiClient';
import { CONFIG } from 'src/global-config';
import { Language, useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';

export function LocationsSection() {
  const { renderLanguage, language } = useLanguage();

  const [tabs, setTabs] = useState([
    {
      title_ka: 'მანგლისი',
      title_en: 'Manglisi',
      value: 'manglisi',
    },
  ]);
  const [campuses, setCampuses] = useState<CampusDto[]>([]);
  const [selectedCampuse, setSelectedCampuse] = useState<CampusDto | undefined>();

  const [selectedTab, setSelectedTab] = useState('tsinandali');

  const router = useRouter();

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
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_2.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        marginTop: '70px',
        backgroundColor: '#F4F9CE',
        marginBottom: '70px',
      }}
    >
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
      <Box sx={{ marginTop: '20px' }}>
        {selectedCampuse ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              borderRadius: '12px',
              '&:hover .overlay': {
                opacity: 1,
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              router.push(
                language === Language.KA
                  ? `${selectedTab === 'manglisi' ? '/manglisi' : '/tsinandali'}`
                  : `${selectedTab === 'manglisi' ? '/en/manglisi' : '/en/tsinandali'}`
              );
            }}
          >
            <Image src={selectedCampuse.campus_media_assn[0]?.media?.media_url} ratio="16/9" />
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(244, 249, 206, 0.4)', // yellow transparent
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#7F9A16',
                  borderRadius: '50%',
                  width: '100px', // or any equal value
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '10px', // optional, for inner spacing
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 'bold', color: 'white', fontFeatureSettings: "'case' on" }}
                >
                  {renderLanguage('აღმოაჩინე კამპუსი', 'Discover Campus')}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
