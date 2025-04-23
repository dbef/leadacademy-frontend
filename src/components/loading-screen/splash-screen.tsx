'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import { Fragment } from 'react';

import Portal from '@mui/material/Portal';
import { styled } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';

import { AnimateLogoZoom } from 'src/components/animate';

// ----------------------------------------------------------------------

export type SplashScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  sx?: SxProps<Theme>;
  slotProps?: {
    wrapper?: React.ComponentProps<typeof LoadingWrapper>;
  };
};

export function SplashScreen({ portal = true, slotProps, sx, ...other }: SplashScreenProps) {
  const PortalWrapper = portal ? Portal : Fragment;

  return (
    <PortalWrapper>
      <LoadingWrapper
        {...slotProps?.wrapper}
        sx={{
          backgroundColor: 'red',
        }}
      >
        <LoadingContent sx={sx} {...other}>
          <AnimateLogoZoom />
    
        </LoadingContent>

      </LoadingWrapper>
    </PortalWrapper>
  );
}

// ----------------------------------------------------------------------

const LoadingWrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const LoadingContent = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  flexGrow: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${CONFIG.assetsDir}/assets/background/Vector_1.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundColor: '#FAF6FD',
  backgroundPosition: 'center top',
}));
