import { m } from 'framer-motion';

import { Box, Card, Stack, Typography, useColorScheme } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Image } from 'src/components/image';
import { varFade } from 'src/components/animate';
import { Carousel, useCarousel } from 'src/components/carousel';

import { teamData } from './data';

export function OurTeam() {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
  });

  const { renderLanguage } = useLanguage();

  const { mode } = useColorScheme();

  return (
    <Stack
      sx={{
        backgroundColor: mode === 'light' ? '#1C252E' : '#fff',
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
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFeatureSettings: "'case' on",
          color: mode === 'light' ? '#fff' : '#1C252E',
        }}
      >
        {renderLanguage('გუნდი', 'Team')}
      </Typography>
      <Carousel carousel={carousel} sx={{ px: 0.5 }}>
        {teamData.map((member) => (
          <Box
            key={member.id}
            component={m.div}
            variants={varFade('in')}
            sx={{ py: { xs: 8, md: 10 } }}
          >
            <TeamCard
              member={{
                id: member.id,
                name: renderLanguage(member.name_ka, member.name),
                position: renderLanguage(member.position_ka, member.position),
                avatarUrl: member.avatarUrl,
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Stack>
  );
}
type TeamCardProps = {
  member: {
    id: number;
    name: string;
    position: string;
    avatarUrl: string;
  };
};
export const TeamCard = ({ member }: TeamCardProps) => (
  <Card sx={{ padding: '10px', borderRadius: '0px', textAlign: 'center', paddingBottom: '15px' }}>
    <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5, fontFeatureSettings: "'case' on" }}>
      {member.name}
    </Typography>

    <Typography
      variant="body2"
      sx={{ mb: 2.5, color: 'text.secondary', fontFeatureSettings: "'case' on" }}
    >
      {member.position}
    </Typography>

    <Box sx={{ px: 1 }}>
      <Image alt={member.name} src={member.avatarUrl} ratio="1/1" />
    </Box>
  </Card>
);
