import { useState } from 'react';
import { m } from 'framer-motion';

import { Box, Card, Modal, Stack, Typography, useColorScheme } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useLanguage } from 'src/contexts/language-context';

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

  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamCardProps['member'] | null>(
    null
  );

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
            sx={{ py: { xs: 8, md: 10 }, cursor: 'pointer', width: '100%' }}
            onClick={() => {
              setSelectedTeamMember(member);
            }}
          >
            <TeamCard
              member={{
                id: member.id,
                name: renderLanguage(member.name_ka, member.name),
                position: renderLanguage(member.position_ka, member.position),
                avatarUrl: member.avatarUrl,
                description_ka: member.description_ka,
                description_en: member.description_en,
              }}
            />
          </Box>
        ))}
      </Carousel>
      {selectedTeamMember && (
        <TeamInfoModal
          open={Boolean(selectedTeamMember)}
          onClose={() => setSelectedTeamMember(null)}
          member={selectedTeamMember!}
        />
      )}
    </Stack>
  );
}
type TeamCardProps = {
  member: {
    id: number;
    name: string;
    position: string;
    avatarUrl: string;
    description_ka: string;
    description_en: string;
  };
};
export const TeamCard = ({ member }: TeamCardProps) => (
  <Card
    sx={{
      padding: '10px',
      borderRadius: '0px',
      textAlign: 'center',
      paddingBottom: '15px',
      width: '100%',
    }}
  >
    <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5, fontFeatureSettings: "'case' on" }}>
      {member.name}
    </Typography>

    <Typography
      variant="body2"
      sx={{ mb: 2.5, color: 'text.secondary', fontFeatureSettings: "'case' on" }}
    >
      {member.position}
    </Typography>
    {/* 
    <Box sx={{ px: 1 }}>
      <Image alt={member.name} src={member.avatarUrl} ratio="1/1" />
    </Box> */}
  </Card>
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundColor: '#FAF6FD',
  backgroundPosition: 'center top',
  maxHeight: '70vh',
  overflowY: 'auto',
};

export const TeamInfoModal = ({
  open,
  onClose,
  member,
}: {
  open: boolean;
  onClose: () => void;
  member: TeamCardProps['member'];
}) => {
  const { renderLanguage } = useLanguage();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {renderLanguage(member.name, member.name)}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {renderLanguage(member.description_ka, member.description_en)}
        </Typography>
      </Box>
    </Modal>
  );
};
