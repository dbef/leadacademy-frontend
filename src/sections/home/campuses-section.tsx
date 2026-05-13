import type { CampusDto } from 'src/types/campus';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { Box, Tab, Tabs, Stack, Typography } from '@mui/material';

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

  const [selectedTab, setSelectedTab] = useState('manglisi');

  const router = useRouter();

  const fetchCampuses = useCallback(async () => {
    const response = await apiClient('/api/v1/campus', 'get');
    
    const mappedCampuses = response.map((campus) => ({
      title_ka: campus.campus_name_ka,
      title_en: campus.campus_name_en,
      value: campus.campus_name_short || '',
    }));

    setCampuses(response);
    setTabs(mappedCampuses);
    setSelectedCampuse(response.find((item) => item.campus_name_short === 'manglisi'));
  }, []);

  useEffect(() => {
    if (tabs.length === 3) return;
    fetchCampuses();
  }, []);

  return (
    <Box
      sx={{
        padding: '160px 256px',
        '@media (max-width: 1400px)': {
          padding: '120px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '120px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '100px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px !important',
        },
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_2.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: '#F4F9CE',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -100,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(127,154,22,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Stack spacing={1.5} sx={{ mb: 4, position: 'relative' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#7F9A16',
            }}
          />
          <Typography
            variant="overline"
            sx={{
              color: '#7F9A16',
              fontWeight: 700,
              letterSpacing: 1.5,
              fontFeatureSettings: "'case' on",
            }}
          >
            {renderLanguage('კამპუსები', 'Campuses')}
          </Typography>
        </Stack>
        <Typography
          variant="h2"
          sx={{
            color: '#285C45',
            fontFeatureSettings: "'case' on",
            fontSize: { xs: 28, sm: 36, md: 44 },
            lineHeight: 1.15,
          }}
        >
          {renderLanguage(
            'საუკეთესო ადგილები სწავლისა და გართობისთვის',
            'The best places for learning and fun'
          )}
        </Typography>
      </Stack>

      <Tabs
        value={selectedTab}
        onChange={(_event, newValue) => {
          setSelectedTab(newValue);
          setSelectedCampuse(campuses.find((item) => item.campus_name_short === newValue));
        }}
      >
        {tabs
          .filter((item) => item.title_en === 'Manglisi Campus')
          .map((tab) => (
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

      {/* Wave divider transitioning to news (cream) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          lineHeight: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 100 }}
        >
          <path
            d="M0,40 C240,100 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z"
            fill="#FFF8E7"
          />
        </svg>
      </Box>
    </Box>
  );
}
