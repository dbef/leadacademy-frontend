'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Slide, Stack, Button, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Language, useLanguage } from 'src/contexts/language-context';

export function SummerProgramsPopup() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { renderLanguage, language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoToSummer = () => {
    router.push(language === Language.ENG ? '/en/summer-programs' : '/summer-programs');
  };

  return (
    <Slide in={open} direction="up" mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 0, md: 24 },
          right: { xs: 0, md: 24 },
          zIndex: 1300,
          width: { xs: '100%', sm: 460 },
          maxWidth: 460,
          borderRadius: 0,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FFF59D 0%, #FFFDE7 100%)',
          boxShadow: '0 16px 40px rgba(40, 92, 69, 0.22)',
          border: '1px solid rgba(127, 154, 22, 0.35)',
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: '#285C45',
            '&:hover': { backgroundColor: 'rgba(40, 92, 69, 0.08)' },
          }}
        >
          <Iconify icon="eva:close-fill" width={22} />
        </IconButton>

        <Stack direction="row" spacing={2.5} alignItems="flex-start" sx={{ p: 3, pr: 5 }}>
          <Typography sx={{ fontSize: 56, lineHeight: 1, flexShrink: 0 }}>&#9728;</Typography>

          <Stack spacing={1.5} sx={{ minWidth: 0 }}>
            <Typography
              variant="h5"
              sx={{
                fontFeatureSettings: "'case' on",
                color: '#285C45',
                lineHeight: 1.25,
              }}
            >
              {renderLanguage('გაატარე ზაფხული საბადოში', 'Spend summer in Sabado')}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: '#285C45', fontFeatureSettings: "'case' on" }}
            >
              {renderLanguage(
                'სპორტი, დასვენება და გართობა მანგლისის უნიკალურ კამპუსში',
                'Sports, recreation and entertainment at the unique Manglisi campus'
              )}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleGoToSummer}
              endIcon={<Iconify icon="eva:arrow-forward-fill" width={18} />}
              sx={{
                backgroundColor: '#7F9A16',
                alignSelf: 'flex-start',
                mt: 1,
                px: 3,
                '&:hover': { backgroundColor: '#6B8312' },
              }}
            >
              {renderLanguage('ნახე პროგრამები', 'See Programs')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Slide>
  );
}
