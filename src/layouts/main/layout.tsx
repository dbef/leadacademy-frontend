'use client';

import type { Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { SpeedDial, IconButton, useColorScheme, SpeedDialAction } from '@mui/material';

import { allLangs } from 'src/locales';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { MainSection } from '../core/main-section';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { navData as mainNavData } from '../nav-config-main';
import { SignInButton } from '../components/sign-in-button';
import { LanguagePopover } from '../components/language-popover';

import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps } from '../core/main-section';
import type { LayoutSectionProps } from '../core/layout-section';
import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const navData = slotProps?.nav?.data ?? mainNavData;

  const settings = useSettingsContext();

  const { mode, setMode, systemMode } = useColorScheme();

  useEffect(() => {
    if (mode === 'system' && systemMode) {
      settings.setState({ colorScheme: 'light' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, systemMode]);

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
              color: 'white',
            })}
          />
          <NavMobile data={navData} open={open} onClose={onClose} />

          {/** @slot Logo */}
          <Logo />
        </>
      ),
      rightArea: (
        <>
          {/** @slot Nav desktop */}
          <NavDesktop
            data={navData}
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
            })}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            {/** @slot Settings button */}

            <LanguagePopover data={allLangs} />
            {/** @slot Sign in button */}
            <SignInButton />
            {/* <IconButton
              onClick={() => {
                setMode('light');
                settings.setState({ colorScheme: 'light' });
              }}
            >
              {mode === 'dark' ? (
                <Iconify icon="line-md:moon-to-sunny-outline-loop-transition" />
              ) : (
                <Iconify icon="line-md:sunny-outline-to-moon-loop-transition" />
              )}
            </IconButton> */}
            {/** @slot Purchase button */}
          </Box>
        </>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  const actions = [
    { icon: <TwitterIcon />, name: 'X', link: 'https://x.com/' },
    { icon: <LinkedinIcon />, name: 'LinkedIn', link: 'https://www.linkedin.com/' },
    {
      icon: <InstagramIcon />,
      name: 'Instagram',
      link: 'https://www.instagram.com/sabado.leadership.academy?igsh=MTdjMmIzY2g2eXZuMA%3D%3D&utm_source=qr',
    },
    {
      icon: <FacebookIcon />,
      name: 'Facebook',
      link: 'https://www.facebook.com/share/16Aibb1B4y/?mibextid=wwXIfr',
    },
  ];

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'fixed', // Fix to viewport
          bottom: 16, // Distance from bottom
          right: 16, // Distance from left
          zIndex: 1100, // Ensure it's on top of content
        }}
        icon={<Iconify icon="ic:baseline-contact-support" color="#fff" />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open(action.link, '_blank');
              }
            }}
          />
        ))}
      </SpeedDial>
    </LayoutSection>
  );
}
