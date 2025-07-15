'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, Stack, Container, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

import { varFade, AnimateText, MotionContainer } from 'src/components/animate';

import { OurTeam } from '../team';
import { Vision } from '../vision';
import { Founders } from '../founders';
import { Partners } from '../partners';
import { ProjectValues } from '../project-values';
import { ProjectMission } from '../project-mission';

// ----------------------------------------------------------------------

export function AboutView() {
  const { renderLanguage } = useLanguage();

  const searchParams = useSearchParams();
  const selectedId = searchParams.get('key');
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const id = searchParams.get('key');
    if (id) {
      const timeout = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start' });
        }
      }, 200); // wait 200ms

      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const isSelected = (id: string) => selectedId === id;

  return (
    <Stack
      spacing={4}
      sx={{
        backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundColor: '#FAF6FD',
        backgroundPosition: 'center top',
      }}
    >
      <Stack
        spacing={3}
        sx={{
          mb: 10,
          padding: '64px 256px',
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
            padding: '2px 4px 2px 4px',
            backgroundColor: 'secondary.lighter',
            width: 'fit-content',
            border: '1px solid #E0DDFF',
            borderRadius: '2px',
            color: 'secondary.darker',
          }}
        >
          <Typography fontWeight={700} fontSize="12px" sx={{ fontFeatureSettings: "'case' on" }}>
            {renderLanguage('საბადო', 'Sabado')}
          </Typography>
        </Box>
        <Container
          component={MotionContainer}
          sx={{ padding: '0px !important', maxWidth: '100% !important' }}
        >
          <AnimateText
            component="h2"
            variant="h2"
            textContent={[
              renderLanguage(
                'საუკეთესო ადგილი სწავლისა და გართობისთვის',
                'The best place for learning and fun'
              ),
            ]}
            variants={varFade('inRight', { distance: 24 })}
            sx={{
              fontFeatureSettings: "'case' on",
              color: '#607516',
            }}
          />

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography
              variant="h4"
              sx={{
                fontFeatureSettings: "'case' on",
                fontWeight: 400,
              }}
            >
              {renderLanguage(
                'შეუერთდით ჩვენს არაფორმალური განათლების ჰაბს და აღმოაჩინეთ ახალი შესაძლებლობები!',
                'Join our informal hub and discover new opportunities!'
              )}
            </Typography>
          </m.div>
        </Container>
      </Stack>
      <Box
        id="mission"
        sx={{
          paddingTop: isSelected('mission') ? '150px' : '0px',
          padding: '64px 256px',
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
            backgroundAttachment: 'scroll', // <--- key fix
            backgroundSize: 'cover', // <--- or '100% auto'
            backgroundPosition: 'top center',
          },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${CONFIG.assetsDir}/assets/background/mission-background.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundColor: '#FAF6FD',
          backgroundPosition: 'center top',
        }}
      >
        <ProjectMission />
      </Box>

      <Box
        id="vision"
        sx={{
          paddingTop: isSelected('vision') ? '150px' : '0px',
          padding: '64px 256px',
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
        <Vision />
      </Box>
      <Box
        id="values"
        sx={{
          paddingTop: isSelected('values') ? '150px' : '0px',
          padding: '64px 256px',
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
        <ProjectValues />
      </Box>
      <Box
        id="founders"
        sx={{
          paddingTop: isSelected('values') ? '150px' : '0px',
          backgroundColor: '#4D5D17',
          padding: '64px 256px',
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
        <Founders />
      </Box>
      <Box
        id="partners"
        sx={{
          paddingTop: isSelected('values') ? '150px' : '0px',
          padding: '64px 256px',
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
        <Partners />
      </Box>

      <Box id="team" sx={{ paddingTop: isSelected('team') ? '150px' : '0px' }}>
        <OurTeam />
      </Box>
    </Stack>
  );
}
