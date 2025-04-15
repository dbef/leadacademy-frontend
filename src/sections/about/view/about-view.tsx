'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, Stack, Container, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { varFade, AnimateText, MotionContainer } from 'src/components/animate';

import { OurTeam } from '../team';
import { Vision } from '../vision';
import { Relevance } from '../relevance';
import { WhatWeOffer } from '../what-we-offer';
import { Perspectives } from '../perspectives';
import { ProjectValues } from '../project-values';
import { ProjectMission } from '../project-mission';
import { ProjectPurpose } from '../project-purpose';

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
    <>
      <Stack spacing={4}>
        <Stack
          spacing={3}
          sx={{
            mb: 10,
            padding: '128px 256px',
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
                background: 'linear-gradient(90deg, #00A76F 0%, #00412B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
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
            backgroundColor: 'secondary.lighter',
            padding: '128px 256px',
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
          <ProjectMission />
        </Box>

        <Box
          id="values"
          sx={{
            paddingTop: isSelected('values') ? '150px' : '0px',
            padding: '128px 256px',
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
          id="purpose"
          sx={{
            paddingTop: isSelected('purpose') ? '150px' : '0px',
            backgroundColor: 'secondary.lighter',
            padding: '128px 256px',
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
          <ProjectPurpose />
        </Box>

        <Box
          id="offer"
          sx={{
            paddingTop: isSelected('offer') ? '150px' : '0px',
            padding: '128px 256px',
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
          <WhatWeOffer />
        </Box>

        <Box
          id="relevance"
          sx={{
            paddingTop: isSelected('relevance') ? '150px' : '0px',
            backgroundColor: 'secondary.lighter',
            padding: '128px 256px',
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
          <Relevance />
        </Box>

        <Box
          id="perspectives"
          sx={{
            paddingTop: isSelected('perspectives') ? '150px' : '0px',
            padding: '128px 256px',
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
          <Perspectives />
        </Box>

        <Box
          id="vision"
          sx={{
            paddingTop: isSelected('vision') ? '150px' : '0px',
            backgroundColor: 'secondary.lighter',
            padding: '128px 256px',
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
      </Stack>
      <Box id="team" sx={{ paddingTop: isSelected('team') ? '150px' : '0px' }}>
        <OurTeam />
      </Box>
    </>
  );
}
