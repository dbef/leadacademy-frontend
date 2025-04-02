import React from 'react';

import { Card, Stack, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { experience } from './experience';

export function ExperienceView() {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '0px 256px',
        '@media (max-width: 1400px)': {
          padding: '0px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '0px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '0px 24px',
          marginTop: '50px',
        },
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
      }}
    >
      <Card
        sx={{
          padding: '20px',
        }}
      >
        {experience.map((item) => (
          <Accordion key={item.id}>
            <AccordionSummary
              sx={{
                fontFeatureSettings: "'case' on",
              }}
            >
              {renderLanguage(item.title_ka, item.title_en)}
            </AccordionSummary>
            <AccordionDetails>
              {renderLanguage(item.description_ka, item.description_en)}
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </Stack>
  );
}
